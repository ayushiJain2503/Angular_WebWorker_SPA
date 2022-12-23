import { plainToClass } from 'class-transformer';
import { TableDataClass } from '../classes';
import { tableData } from '../interfaces';

/**
 * function which takes norma object and convert it to class data
 * @param data
 * @returns
 */
export const objectToClass = (data: tableData) => {
  return plainToClass(TableDataClass, data);
};
