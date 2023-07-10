export enum ProjectStatus {
  Active,
  Finished,
}

export class Project {
  constructor(
    //shorthand syntax, adds these vars to the constructor without having to declare them with 'this' in {}
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
