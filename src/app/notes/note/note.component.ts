import { Note } from './../model/note';
 import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() notecomponent: Note;
  @Output() noteUpdated: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() noteDeleted: EventEmitter<Note> = new EventEmitter<Note>();




  constructor() { }

  ngOnInit() {
  }

  /**
   * deleteNote(notecomponent)
   * reaching parent methods and picking delete method from parent
   */
  public deleteNote() {
    this.noteDeleted.emit(this.notecomponent);
  }

  /**
   * updateNote(notecomponent)
   * reach for the parent component
   */
  public updateNote(){
    this.noteUpdated.emit(this.notecomponent);
  }
}
