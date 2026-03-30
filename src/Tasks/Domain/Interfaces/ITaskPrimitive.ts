export interface ITaskPrimitive {
  id?: number;
  title: string;
  description: string;
  creation_date: Date;
  expiration_date: Date | null;
  state: string;
  user_id: number;
}
