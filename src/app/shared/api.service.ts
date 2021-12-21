import { Notebook } from './../notes/model/notebook';
import { Note } from './../notes/model/note';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedbackViewModel } from '../feedback/feedback.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = window["cfgApiBaseUrl"]+"/api";
  private ALL_NOTEBOOK_URL = `${this.BASE_URL}\\book`;
  private ALL_NOTEBOOK_SAVE = `${this.BASE_URL}\\book`;
  private SEND_FEEDBACK_URL = `${this.BASE_URL}\\feedback`;
  private UPDATE_NOTEBOOK_URL = `${this.BASE_URL}\\book\\`;
  private ALL_NOTES_URL = `${this.BASE_URL}\\note`;
  private SAVE_NOTES_URL = `${this.BASE_URL}\\note\\bybookId\\save\\`;
  private ALL_NOTES_URL_DELETE = `${this.BASE_URL}\\note\\`;
  private ALL_NOTES_URL_SINGLE = `${this.BASE_URL}\\note\\`;
  //new ones
  private GET_ALL_NOTES_BY_ID = `${this.BASE_URL}\\note\\bybookId\\`;
  constructor(private http: HttpClient) {

  }
  getAllNotebooks(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.ALL_NOTEBOOK_URL);
  }
  //feedback not yet implemented
  postFeedback(feedback: FeedbackViewModel): Observable<any> {
    return null;


  }
  postNoteBook(notebook: Notebook) {

    return this.http.post<Notebook>(this.ALL_NOTEBOOK_SAVE, notebook);
  }
  updateNotebook(notebook: Notebook) {
    return this.http.put<Notebook>(this.UPDATE_NOTEBOOK_URL + notebook.id, notebook);
  }
  deleteNotebook(notebook: Notebook): Observable<any> {
    return this.http.delete(this.UPDATE_NOTEBOOK_URL + notebook.id);
  }
  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.ALL_NOTES_URL);
  }
  getNotebyId(id: number): Observable<Note> {
    return this.http.get<Note>(this.ALL_NOTES_URL_SINGLE + id);
  }
  updateNote(note: Note) {
    return this.http.put(this.ALL_NOTES_URL_SINGLE + note.id, note);
  }
  createNote(note: Note, notebook: number): Observable<Note> {
    return this.http.post<Note>(this.SAVE_NOTES_URL+notebook, note);
  }
  deleteNote(note: Note) {
    return this.http.delete(this.ALL_NOTES_URL_DELETE + note.id);
  }
  //new Ones
  //get notes by Id
  getNotesbyId(id: number): Observable<Note[]> {
    return this.http.get<Note[]>(this.GET_ALL_NOTES_BY_ID + id);
  }
}
