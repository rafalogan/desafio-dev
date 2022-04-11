import { ITransaction, ITranslateType } from "./iProcess";

const TypesNames: ITranslateType[] = [
  {type: 1, description:  'Débito',nature:  "Entrada", signal: "+"},
  {type: 2, description: 'Boleto'  , nature : 'Saída', signal: '-'},
  {type: 3, description: 'Financiamento'  , nature : 'Saída', signal: '-'},
  {type: 4, description: 'Crédito'  , nature : 'Entrada', signal: '+'},
  {type: 5, description: 'Recebimento Empréstimo'  , nature : 'Entrada', signal: '+'},
  {type: 6, description: 'Vendas'  , nature : 'Entrada', signal: '+'},
  {type: 7, description: 'Recebimento TED' , nature : ' Entrada', signal: '+'},
  {type: 8, description: 'Recebimento DOC'  , nature : 'Entrada', signal: '+'},
  {type: 9, description: 'Aluguel'  , nature : 'Saída', signal: '-'},

]

export class Trasnsaction implements ITransaction{
  id: number;
  type: number;
  date: Date;
  value: number;
  cpf: string;
  card: string;
  owner: string;
  store: string;

  typeName: string;

  constructor(params: ITransaction) {
    this.id = params.id;
    this.type = params.type;
    this.date = params.date;
    this.value = this.resultValue(params.value);
    this.cpf = this.filterCPF(params.cpf);
    this.card = params.card;
    this.owner = params.owner;
    this.store = params.store;

    this.typeName = this.getTypeName(params.type);
  }

  filterCPF(cpf: string): string {
    const block1 = cpf.slice(0, 3);
    const block2 = cpf.slice(3, 6);
    const block3 = cpf.slice(6, 9);
    const block4 = cpf.slice(9, cpf.length);

    return `${block1}.${block2}.${block3}-${block4}`;
  }

  resultValue(value: number): number {
    return value / 100.00;
  }

  getTypeName(type: number): string {
    return TypesNames.find(t => t.type === type)?.description || '';
  }
}
