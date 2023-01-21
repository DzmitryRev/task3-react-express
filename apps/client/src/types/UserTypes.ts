export interface IUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'blocked';
  registrationDate: Date;
  lastVisitDate: Date;
}
