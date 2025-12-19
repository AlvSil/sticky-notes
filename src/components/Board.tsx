import { Fragment, useState, useCallback } from 'react';
import { NoteType }from './Note.tsx';
import Note from './Note.tsx';

const Board: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [newNoteText, setNewNoteText] = useState<string>('default note text');
  const [newNotePosX, setNewNotePosX] = useState<number>(1);
  const [newNotePosY, setNewNotePosY] = useState<number>(1);
  const [newNoteHeight, setNewNoteHeight] = useState<number>(100);
  const [newNoteWidth, setNewNoteWidth] = useState<number>(100);
  
  const NOTE_MIN_WIDTH = 100;
  const NOTE_MIN_HEIGHT = 100;
  const NOTE_MAX_WIDTH = 300;
  const NOTE_MAX_HEIGHT = 300;
  const NOTE_MIN_X_POSITION = 10;
  const NOTE_MIN_Y_POSITION = 10;
  const NOTE_MAX_X_POSITION = 1000;
  const NOTE_MAX_Y_POSITION = 1000;
  const updateNote = useCallback((id: string, data: Partial<NoteType>) => {
    setNotes(notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          ...data,
        };
      }
      return note;
    }));
  }, [notes]);

  const addNote = useCallback((() => {
    if (!newNoteText) return;
    setNotes([
      ...notes,
      {
        id: crypto.randomUUID(),
        x: newNotePosX,
        y: newNotePosY,
        width: newNoteWidth,
        height: newNoteHeight,
        text: newNoteText,
      },
    ]);
  }), [newNoteText, notes, newNotePosX, newNotePosY, newNoteWidth, newNoteHeight]);
 
  const updateNewNoteText = useCallback((e) => {
    setNewNoteText(e.target.value);
  }, []);

  const updateNewNotePosX = useCallback((e) => {
    setNewNotePosX(Number(e.target.value));
  }, []);
  const updateNewNotePosY = useCallback((e) => {
    setNewNotePosY(Number(e.target.value));
  }, []);
  const updateNewNoteHeight = useCallback((e) => {
    setNewNoteHeight(Number(e.target.value));
  }, []);
  const updateNewNoteWidth = useCallback((e) => {
    setNewNoteWidth(Number(e.target.value));
  }, []);

  const noteList = notes.map((note: NoteType) => {
    return (
      <Note note={note} onUpdate={updateNote}/>
    )
  });

  const onDragOverTrash = (e) => {
    e.preventDefault();
    // capture id of note being dragged and use it to remove dragged note from notes list by using its id
    // removeDraggedNote();
  };

  return (
    <Fragment>
      <div
        className="board-header"
      >
        <input type='text' value={newNoteText} onChange={updateNewNoteText}/>
        <input
          type='number'
          defaultValue={NOTE_MIN_X_POSITION}
          value={newNotePosX}
          onChange={updateNewNotePosX}
          min={NOTE_MIN_X_POSITION}
          max={NOTE_MAX_X_POSITION}
        />
        <input
          type='number'
          value={newNotePosY}
          onChange={updateNewNotePosY}
          min={NOTE_MIN_Y_POSITION}
          max={NOTE_MAX_Y_POSITION}
        />
        <input
          type='number'
          value={newNoteHeight}
          onChange={updateNewNoteHeight}
          min={NOTE_MIN_HEIGHT}
          max={NOTE_MAX_HEIGHT}
        />
        <input
          type='number'
          value={newNoteWidth}
          onChange={updateNewNoteWidth}
          min={NOTE_MIN_WIDTH}
          max={NOTE_MAX_WIDTH}
        />
        <button onClick={addNote}>Create note</button>
      </div>
      <div
        className="board-container"
      >
        <div className="notelist-container">
          {noteList}
        </div>
        <div
          id="trash-area"
          className="trash-area d-flex"
          onDragEnter={onDragOverTrash}
        >
          <div className="text">
            <span>Drag and drop here to delete</span>
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Board;