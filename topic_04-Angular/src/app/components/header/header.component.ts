import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  // header.component.html is also a class, and a child of HeaderComponent
  public headerBrandTitle: string = 'Todo Tracker';

  constructor() { }

  ngOnInit(): void {
  }
}
