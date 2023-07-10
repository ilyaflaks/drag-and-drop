import { Project, ProjectStatus } from "../models/project";
// Project State Management

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = []; //protected means it can be accessed only from the inheriting classes. Similar to private
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  //<Project> provides a concrete value for the <T> placeholder of State. In this case it's type Project
  private projects: Project[] = [];
  private static instance: ProjectState;
  private constructor() {
    super();
  }

  static getInstance() {
    //static class can only be instantiated once
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    // const newProject = {
    //   id: Math.random().toString(),
    //   title: title,
    //   description: description,
    //   people: numOfPeople,
    // };
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      //if the status is the same, we avoid unnecessary rerenders
      //for case when the user drops a project in the same box it came from
      project.status = newStatus;
      this.updateListeners();
    }
  }
  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance(); //instantiated Project State
