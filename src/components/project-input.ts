import { Component } from "./base-component";
import { Validatable, validate } from "../util/validation";
import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
// ProjectInput class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  //HTMLDivElement is the host, HTMLFormElement is element, <T> and <U>
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
  }

  private gatherUserInput(): [string, string, number] | void {
    //this method returns a tuple, in which 1st and 2nd els are strings and 3rd element is a number
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      //if at least one of the validations is false, we make it here
      alert("Invalid input, please try again");
      //this is the case when the function returns void and not a tuple
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  configure() {
    //bind the method to the event listener. replaced with autobind method decorator
    this.element.addEventListener("submit", this.submitHandler.bind(this)); //the word inside bind() will be the value of this inside the submitHandler when its called
  }

  renderContent() {}

  private clearInput() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    // console.log(this.titleInputElement.value);
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      //console.log(title, ", ", desc, ", ", people);
      this.clearInput();
    }
  }
}
