export interface ITaskPrimitive {
  id?: number;
  title: string;
  description: string;
  creation_date: string;
  expiration_date: string | null;
  state: string;
  user_id: number;
}
