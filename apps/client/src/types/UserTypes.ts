export type StatusType = 'active' | 'blocked';
export interface IUser {
  id: string;
  name: string;
  email: string;
  status: StatusType;
  registrationDate: Date;
  lastVisitDate: Date;
}
