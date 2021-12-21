import { Note } from './../notes/model/note';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteTextFilter'
})
export class NoteTextFilterPipe implements PipeTransform {

  transform(notes: Note[], text: string): Note[] {
    if (text == null || text === "") {
      return notes;
    } else {
      return notes.filter(
        n => n.type.includes(text) || n.text.includes(text)
      );
    }
  }

}
