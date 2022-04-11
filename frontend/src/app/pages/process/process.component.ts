import { Component, OnInit } from '@angular/core';
import { ProcessService } from "../../services/process.service";
import { IPagination, ITransactions } from "./iProcess";
import { Trasnsaction } from "./trasnsaction.entity";

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  title = 'Process';
  file?: File;

  isdisabled?: string;
  transactions?: Trasnsaction[];
  pagination?: IPagination;
  stories?: string[];
  balance?: number;
  selectedStore: string  = 'todas';


  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
    this.isdisabled = !this.file ? 'disabled' : '';

    this.getStories();
    this.refreshScreen();
  }

  onchange(event: any) {
    console.log('envent', event.target.files[0]);
    this.file = event.target.files[0];
    this.isdisabled = !this.file ? 'disabled' : '';
  }

  onUpload() {
    if (this.file) {
      this.processService.uploadFile(this.file)
        .subscribe({
          next: (data) => {
            console.log('data', data);
          },
          error: (err) => {
            console.log('err', err);
          }
        });
    }
  }

  onChangeStore(event: any) {
    this.selectedStore = (event.target.value) ? event.target.value : 'todas' ;


    return (this.selectedStore !==  'todas') ? this.getBystore(this.selectedStore) : this.refreshScreen();
  }

  refreshScreen(page?: number) {
    return this.processService.getProcessData(page)
      .subscribe({
        next: (data) => {
          this.transactions = data.data.map(item => new Trasnsaction(item));
          this.pagination = this.createPagination(data.pagination);
          this.balance = undefined;
          return this.transactions;
        },
        error: (err) => console.log('err', err)
      });
  }

  createPagination(data: IPagination) {
   const toalPages = Math.ceil(data.count / data.limit);
   const pages: number[] = [];

    for (let i = 0; i < toalPages; i++) {
     pages.push(i + 1);
   }

    return this.pagination = {
      count: data.count,
      limit: data.limit,
      pages: pages,
      page: data.page
    };
  }

  onPrevious() {
    if (this.pagination && this.pagination.page > 1) {
      this.pagination.page--;
      this.refreshScreen(this.pagination?.page);
    }
  }

  onNext() {
    if (this.pagination && this.pagination.pages &&  this.pagination.page < this.pagination.pages.length) {
      this.pagination.page++;
      this.refreshScreen(this.pagination?.page);
    }
  }

  getStories() {
    return this.processService.getStoriesNames()
      .subscribe({
        next: (data) => this.stories = data,
        error: (err) => console.log('err', err)
      });
  }

  getBystore(store: string) {
    return this.processService.getProcessDataByStore(store)
      .subscribe({
        next: (data) => {
          this.transactions = data.data.map(item => new Trasnsaction(item));
          this.balance = (data.balance) / 100.00;
          return this.transactions;
        },
        error: (err) => console.log('err', err)
      });
  }
}
