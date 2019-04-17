import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.css']
})
export class ShowMessageComponent implements OnInit {
  @Input('title') title: string;
  @Input('message') message: string;
  @Input('color') color: string;

  constructor() { }

  ngOnInit() {
  }

}
