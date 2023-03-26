export interface IUploadFile {
    _id: string;
    name: string;
    age: string;
  }
  
export interface IStorage {
  name: string;
  age: number;
  value: number;
  invoice: number;
  date: Date;
}

export interface IMapping {
  [key: string]: {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'date';
  };
}

export interface ITask {
  id: string;
  status: 'pending' | 'processing' | 'done';
  data:any
  errorsList: {
    row: number;
    col: number;
    message: string;
  }[];
}

export class IStorageImplement implements IStorage {
  name: string;
  age: number;
  value: number;
  invoice: number;
  date: Date;

  constructor(name: string, age: number, value: number, invoice:number, date:Date) {
    this.name = name;
    this.age = age;
    this.value = value;
    this.invoice = invoice;
    this.date = date;
  }
}