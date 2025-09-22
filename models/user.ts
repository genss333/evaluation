export interface User {
  token: string;
  user: UserClass;
}

export interface UserClass {
  id: number;
  name: string;
  email: string;
  role: string;
  company: null;
  personcode: string;
  position: string;
  department: string;
  urlimage: string;
  start_date: Date;
  confirm_date: Date;
  years_of_work: number;
}
