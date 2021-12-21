import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
 model: FeedbackViewModel = {
   name:'AbdulMalik',
   email: 'abdulmaliknurudeen4@gmail.com',
   feedback: 'Your app is so cool'
 }
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

    sendFeedback(): void{
      //write logic for sending feedback to the backend
      //backend for email feedback not done yet
    alert(this.model.name);
  }

}

export interface FeedbackViewModel{
  name: string;
  email: string;
  feedback: string;
}