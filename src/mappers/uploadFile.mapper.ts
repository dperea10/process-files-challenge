import { getInfoTrx } from './../repositories/uploadFile.repository';
// import multer from 'multer';
import {logger} from '../utils/logger';
import ExcelJS from 'exceljs';
import {ITask, IMapping} from '../interfaces/uploadFiles'
import { v4 as uuidv4 } from 'uuid';
import { ValuesTypeEnum } from './enums';


const processFile = async (fileBuffer:any) =>{

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(fileBuffer);
  
  const worksheet = workbook.worksheets[0];
  const mapping:IMapping = { name: { name: 'name', type: 'string' }, age: { name: 'age', type: 'number' },  value: { name: 'value', type: 'number' },  invoice: { name: 'invoice', type: 'number' }, date: { name: 'date', type: 'date' } }; 
  const headers:any = worksheet.getRow(1).values;

  const tasks: ITask[] = [];

  const task: ITask = {
    id: uuidv4(),
    status: 'pending',
    errorsList: [],
    data:[]
  };

  process.nextTick(() => {
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const obj: any = {};

      for (let j = 1; j <= worksheet.columnCount; j++) {
        let cell = row.getCell(j);

        const headerValue = headers[j];
        const header = headerValue && headerValue.toString().trim().toLowerCase();
        let cellType = formatCellValues(cell.type, cell.value)

        const expectedType = mapping[header].type;
        const regexValue = regexValues(expectedType, cell.value)

        if (cellType !== expectedType || !regexValue) {
          task.errorsList.push({
            row: i,
            col: j,
            message: `Expected type '${expectedType}' but found '${cell.value}'`,
          });

          continue
        }

        if (header in mapping && cellType === mapping[header].type) {

          let value = null;
          if (cell.value !== undefined && cell.value !== false && cell.value !== true && cell.value !=="") {
            value = cell.value
          }
          obj[mapping[header].name] = value;
        }
      }

      if (Object.keys(obj).length > 0) {
        task.data.push(obj);
      }
    }

    task.status = 'done';
  })
  tasks.push(task);
  return tasks
}

const formatCellValues = (cellType:any, cellValue:any) =>{
  if (cellType === undefined || (typeof cellType === 'number')) {
    if ((cellType === 3) || (typeof cellValue === 'string') && (cellValue) ){
      cellType = 'string';
    } else if ((cellType === 2) || (typeof cellValue === 'number') ){
      cellType = 'number';
    } else if (cellValue instanceof Date) {
      cellType = 'date';
    } else if (cellValue === null || cellValue === '') {
      cellType = 'null';
    } else {
      cellType = 'unknown';
    }
  }
  return cellType
}

const regexValues = (expectedType:any, value:any): boolean =>{

  if (!value)return false

  if (expectedType === ValuesTypeEnum.String){
    const stringRegex = /^[a-zA-Z\s]+$/;
    if (stringRegex.test(value)) return true
  }

  if (expectedType === ValuesTypeEnum.Number){
    const numericRegex = /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/;
    if( numericRegex.test(value)) return true
  }

  if (expectedType === ValuesTypeEnum.Date){
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const year = value.getFullYear();
    const month = ("0" + (value.getMonth() + 1)).slice(-2);
    const day = ("0" + value.getDate()).slice(-2);
    const dateFormat = `${year}-${month}-${day}`;
   if (dateRegex.test(dateFormat)) return true
  }
  if (expectedType === ValuesTypeEnum.Boolean){
    const regexBoolean = /^(true|false)$/;    
    if (regexBoolean.test(value)) return true
  }

  return false
}

export const getInfo = (func:any) => async (...args:any) => {
  try {
    const result = await func(...args);
    if (!result) return null;
    return result;
  } catch (err:any) {
    logger.error(err.message || 'Error in list of store mapper');
    throw new Error(err.message || 'Internal Error');
  }
};

export default {processFile, getInfo}