export interface ITransactions {
  data: ITransaction[];
  pagination: IPagination;
}

export interface ITransaction {
  id: number;
  type: number;
  date: Date;
  value: number;
  cpf: string;
  card: string;
  owner: string;
  store: string;
}


export interface IPagination {
  count:number;
  limit:number;
  page: number;
  pages?: number[];
}


export interface ITransactionStore {
  data: ITransaction[];
  total: number;
  balance: number;
}

export interface ITranslateType {
  type: number;
  description: string;
  nature: string;
  signal: string;
}
