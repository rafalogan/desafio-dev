import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  title = 'Process';

  constructor() { }

  ngOnInit(): void {
  }

  onchange(event: any) {
    console.log(event);
  }
}
