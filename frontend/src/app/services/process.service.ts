import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { ITransactions, ITransactionStore } from "../pages/process/iProcess";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  baseURL = environment.baseUrlApi

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any>  {
    const formData = new FormData();
    formData.append('file', file, file.name);

    console.log(formData);
    return this.http.post(this.baseURL + '/upload', formData);
  }

  getProcessData(page?: number): Observable<ITransactions> {
    return this.http.get<ITransactions>(`${this.baseURL}/transactions${page ? '?page=' + page : ''}`);
  }

  getProcessDataByStore(store: string): Observable<ITransactionStore> {
    return this.http.get<ITransactionStore>(`${this.baseURL}/transactions/${store}`);
  }

  getStoriesNames(): Observable<string[]> {
    return this.http.get<string[]>(this.baseURL + '/stories');
  }

}
