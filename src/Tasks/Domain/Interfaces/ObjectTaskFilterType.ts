import {
  FilterDateIntervalObject,
  FilterNumberObject,
  FilterStringObject,
  FilterDateObject
} from '@/src/Shared/Domain/Interfaces/IQueryGeneral';

export type ObjectTaskFilterType = {
  filterById?: FilterNumberObject;
  filterByTitle?: FilterStringObject;
  filterByDescription?: FilterStringObject;
  filterByState?: FilterStringObject;
  filterByUserId?: FilterNumberObject;
  filterByCreationDate?: FilterDateObject;
  filterByExpirationDate?: FilterDateObject;
  filterByCreationDateInterval?: FilterDateIntervalObject;
  filterByExpirationDateInterval?: FilterDateIntervalObject;
};
