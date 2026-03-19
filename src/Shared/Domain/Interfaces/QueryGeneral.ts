export type OperadorComparacion = '=' | '!=' | '<' | '<=' | '>' | '>=';

export interface Filtro<T> {
  campo: keyof T;
  operador: OperadorComparacion;
  valor: string | number;
}

export interface IQueryGeneral<T> {
  page: number;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: keyof T;
  filters: Filtro<T>[];
}
