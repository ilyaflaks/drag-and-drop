import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
//const finishedPrjList = new ProjectList("finished"); //throws an unused error
