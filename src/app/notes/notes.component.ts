import { ApiService } from './../shared/api.service';
import { Notebook } from './model/notebook';
import { Note } from './../notes/model/note';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];
  notes: Note[] = [];
  selectedNoteBook: Notebook;
  private NoteIdsObtained: Array<number> = [];
  searchText: string;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNoteBooks();
    this.getAllNotes();

  }
  public getAllNoteBooks() {
    this.apiService.getAllNotebooks().subscribe(

      res => {
        this.notebooks = res;
      },
      err => {
        alert("Error from noteComponent")
      }
    );
  }

  public createNoteBook() {
    let newNoteBook: Notebook = {
      id: null,
      bookName: 'New noteBook',
      NoteIds: []
    }
    this.apiService.postNoteBook(newNoteBook).subscribe(
      res => {

      },
      err => {
        this.notebooks.push(newNoteBook);

      }
    );
  }
  public updateNotebook(note: Notebook) {
    this.apiService.updateNotebook(note).subscribe(
      res => {

      }, err => {
        //location.reload();
      }
    );
  }

  public deleteNoteBook(note: Notebook) {
    let bookid: number = note.id;
    if (confirm("Delete ?, this will also delete all the notes belonging to this notebook ")) {
      this.apiService.deleteNotebook(note).subscribe(
        res => {
          location.reload();
        }, err => {
          let index = this.notebooks.indexOf(note);
          this.notebooks.splice(index, 1);
          //deleting all the notes that belong to that particular book in the backend
          //with a single url request
          
         
        }
      );
      this.invalidateSelection();
    } else { }
  }
  public selectNoteBook(notebook: Notebook) {
    this.selectedNoteBook = notebook;
    console.log(notebook.id);
    //grab all notes for this note only
    //using the getById apiservice to get all notes by their book id
    let idofnotes = notebook.id;

    this.getNotesByNoteIds(idofnotes);


  }
  //invalidate Selection
  public invalidateSelection() {
    this.selectedNoteBook = null;
    this.getAllNotes();
    //console.log(this.selectedNoteBook.NoteIds);
  }
  //notesssssss
  public getAllNotes() {
    this.apiService.getAllNotes().subscribe(
      res => {
        this.notes = res;
      }, err => {
        alert("An Error Occured");
      }
    );
  }
  public deleteNote(notecomponent: Note) {
    this.apiService.deleteNote(notecomponent).subscribe(
      res => {
        let index = this.notes.indexOf(notecomponent);
        this.notes.splice(index, 1);
        //removing the reference of the note from the notebook
        //implementation
        //TODO:
      }, err => {
        let index = this.notes.indexOf(notecomponent);
        this.notes.splice(index, 1);
      }
    );
  }
  public createNote() {
    let newNote: Note = {
      id: null,
      text: "Write Something here",
      type: "ANY",
      last_modified: null
    }
    let noteid:number= this.selectedNoteBook.id;
    ///console.log(this.selectedNoteBook.id);
  this.apiService.createNote(newNote, noteid).subscribe(
     res => {
        this.notes.push(newNote);
        //updating the notebook and adding the id of the new created
        //altering the notebook and adding the id of the note to the notebook refrence list
        //Implementation
        //TODO:
        //Getting note properties from response object so we could extract the id 
        let note:Note = res;
        console.log(note.id);
      }, err => {
       alert("there was an error");
       this.notes.push(newNote);
      }
    );
  }
  /**
   * updateNote
   */
  public updateNote(note: Note) {
    this.apiService.updateNote(note).subscribe(
      res => { }, err => {
        //location.reload();
      }
    );
  }

  /**
   * getNotesByNoteIds
   */
  public getNotesByNoteIds(id: number) {
    this.apiService.getNotesbyId(id).subscribe(
      res => {
        this.notes = res;
      }, err => {
        //alert(err.toString);
      }
    );
  }
}
