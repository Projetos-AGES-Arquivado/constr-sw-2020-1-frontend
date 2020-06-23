export interface User {
  _id: string;
  name: string;
  nickname: string;
  email: string;
}

export interface Resources{
  _id: string;
  resourceName: string;
}

export interface Subjects {
  _id: string;
  name: string;
}

export interface Reserves {
  _id: string;
  idUser: string;
  idSubject: string;
  timeOpen: Date;
  timeClose: Date;
}

