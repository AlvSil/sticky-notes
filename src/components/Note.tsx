import { useCallback } from "react";
import { useEffect } from "react";

export type NoteType = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
};

type NoteProps = {
  note: NoteType;
  onUpdate: (id: string, data: Partial<NoteType>) => void;
};


const Note: React.FC<NoteProps> = ({ note, onUpdate }) => {
  const target = document.getElementsByClassName('note-container')[0];

  const onDragEnd = useCallback((e) => {
    onUpdate(note.id, {
      x: e.clientX,
      y: e.clientY,
    });
  }, [note, onUpdate]);

  useEffect(() => {
    if (!target) return;
    target.addEventListener("dragend", onDragEnd);
    return () => {
      target.removeEventListener("dragend", onDragEnd);
    };
  }, [onDragEnd, target]);

  return (
    <div
      id={note.id}
      draggable="true"
      className="note-container"
      style={{
        left: note.x,
        top: note.y,
        width: note.width,
        height: note.height,
      }}
    >
      <textarea
        className="note-text"
        value={note.text}
        onChange={(e) => onUpdate(note.id, { text: e.target.value })}
        style={{
          width: note.width - 23,
          height: note.height - 23,
        }}
        draggable="false"
      />
    </div>
  );
};

export default Note;