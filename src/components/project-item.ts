import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project";
import { Component } from "./base-component";
import { autobind } from "../decorators/autobind";
//ProjectItem class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  //interface can not only be used as an obj type but also as a contract on a class
  private project: Project;
  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }
  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id); //dataTransfer property is special for drag events
    event.dataTransfer!.effectAllowed = "move";
  } //does not add any eventListeners. config() does
  dragEndHandler(_: DragEvent) {
    console.log("DragEnd");
  }
  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    //this.persons triggers a getter. Not executed like a function ()
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
