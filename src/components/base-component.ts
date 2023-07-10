//Component Base Class. Abstract class. Should not be instantiated, only inherited from
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // Document: importNode() method
    // The Document object's importNode() method creates a copy of a Node or DocumentFragment from another document, to be inserted into the current document later.
    // The imported node is not yet included in the document tree. To include it, you need to call an insertion method such as appendChild() or insertBefore() with a node that is currently in the document tree.
    // Unlike document.adoptNode(), the original node is not removed from its original document. The imported node is a clone of the original.

    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }
  abstract configure(): void; //the exact implementation is missing but this is forcing the inheriting classes to have these methods
  abstract renderContent(): void;
}
