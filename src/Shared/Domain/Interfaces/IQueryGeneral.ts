export type Operator = '=' | '!=' | '<' | '<=' | '>' | '>=';

export interface IFiltro<T> {
  campo: keyof T;
  operador: Operator;
  valor: string | number;
}

export interface IQueryGeneral<T> {
  page: number;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: keyof T;
  filters: IFiltro<T>[];
}
