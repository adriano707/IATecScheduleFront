import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  data = this.fb.group({
    name: null,
    type: null,
    EventDate: null,
    local: null,
    participants: null,
    status: null,
    
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
