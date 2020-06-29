export interface User {
  _id: string;
  name: string;
  nickname: string;
  email: string;
}

export interface Resources{
  _id: string;
  resourceName: string;
  resourceType?: { type: string };
}

export interface Courses {
  name: string;
}

export interface SubjectsReturn{
  name: string;
  label: string;
}


export interface Subjects {
  _id: string;
  name: string;
  timeSchedule: Date;
  course: string;
}

export interface Reserves {
  _id: string;
  idUser: string;
  idSubject: string;
  idResources: string[];
  timeOpen: string;
  timeClose: string;
}

