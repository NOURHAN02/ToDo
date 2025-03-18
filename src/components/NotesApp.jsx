"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function NotesApp({ type }) {
  const [noteList, setNoteList] = useState([]);
  const [noteEdit, setNoteEdit] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("NoteLists")) || [];

    const filteredNotes =
      type === "All Tasks"
        ? storedNotes
        : storedNotes.filter((note) => note.type === type);

    const sortedNotes = filteredNotes.sort(
      (a, b) =>
        new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
    );

    setNoteList(sortedNotes);
  }, [type]);

  const saveNoteListInLocalStorage = (notes) => {
    const allNotes = JSON.parse(localStorage.getItem("NoteLists")) || [];
    const otherNotes = allNotes.filter(
      (note) => !notes.some((n) => n.id === note.id)
    );
    localStorage.setItem(
      "NoteLists",
      JSON.stringify([...otherNotes, ...notes])
    );
  };
/*
  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() === "" || description.trim() === "") return;

    const now = new Date();
    const newNote = {
      id: noteEdit ? noteEdit.id : crypto.randomUUID(),
      title,
      description,
      complete: noteEdit ? noteEdit.complete : false,
      type: noteEdit ? noteEdit.type : type,
      day: now.toLocaleString("en-US", { weekday: "long" }),
      date: now.toLocaleDateString("en-US"),
      time: now.toLocaleTimeString("en-US"),
    };

    let updatedNotes = noteEdit
      ? noteList.map((note) => (note.id === newNote.id ? newNote : note))
      : [...noteList, newNote];

    updatedNotes.sort(
      (a, b) =>
        new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
    );

    setNoteList(updatedNotes);
    saveNoteListInLocalStorage(updatedNotes);
    setTitle("");
    setDescription("");
    setShowForm(false);
    setNoteEdit(null);
  };
*/
const handleSubmit = (event) => {
  event.preventDefault();
  if (title.trim() === "" || description.trim() === "") return;

  const now = noteEdit
    ? new Date(`${noteEdit.date} ${noteEdit.time}`)
    : new Date();

  const newNote = {
    id: noteEdit ? noteEdit.id : crypto.randomUUID(),
    title,
    description,
    complete: noteEdit ? noteEdit.complete : false,
    type: noteEdit ? noteEdit.type : type,
    day: now.toLocaleString("en-US", { weekday: "long" }),
    date: noteEdit ? noteEdit.date : now.toLocaleDateString("en-US"),
    time: noteEdit ? noteEdit.time : now.toLocaleTimeString("en-US"),
  };

  let updatedNotes = noteEdit
    ? noteList.map((note) => (note.id === newNote.id ? newNote : note))
    : [...noteList, newNote];

  updatedNotes.sort(
    (a, b) =>
      new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
  );

  setNoteList(updatedNotes);
  saveNoteListInLocalStorage(updatedNotes);
  setTitle("");
  setDescription("");
  setShowForm(false);
  setNoteEdit(null);
};

  const deleteNote = (id) => {
    const storedNotes = JSON.parse(localStorage.getItem("NoteLists")) || [];
    const updatedNotes = storedNotes.filter((note) => note.id !== id);

    const filteredNotes =
      type === "All Tasks"
        ? updatedNotes
        : updatedNotes.filter((note) => note.type === type);

    setNoteList(filteredNotes);
    localStorage.setItem("NoteLists", JSON.stringify(updatedNotes));
  };

  const editNote = (id) => {
    const storedNotes = JSON.parse(localStorage.getItem("NoteLists")) || [];
    const noteToEdit = storedNotes.find((note) => note.id === id);

    if (!noteToEdit) return;

    setNoteEdit(noteToEdit);
    setTitle(noteToEdit.title);
    setDescription(noteToEdit.description);
    setShowForm(true);
  };

  const deleteAllNotes = () => {
    localStorage.removeItem("NoteLists");
    setNoteList([]);
  };

  const toggleComplete = (id) => {
    let updatedNotes = noteList.map((note) =>
      note.id === id
        ? {
            ...note,
            complete: !note.complete,
            type: note.complete ? type : "Completed Tasks",
          }
        : note
    );

    updatedNotes.sort(
      (a, b) =>
        new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
    );

    setNoteList(updatedNotes);
    saveNoteListInLocalStorage(updatedNotes);
  };

  return (
    <div className="container mx-auto p-4">
     

      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="bg-black text-white p-6 rounded-lg w-96 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-3xl text-white"
            >
              &times;
            </button>

            <h2 className="text-center text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              ✨ {noteEdit ? "Edit Note" : "Add a New Note"} ✨
            </h2>

            <form onSubmit={handleSubmit}>
              <label htmlFor="title" className="block mb-2 font-bold">
                Note Title:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-4 border border-white rounded-lg bg-gray-800 text-white"
                placeholder="Enter note title"
              />

              <label htmlFor="description" className="block mb-2 font-bold">
                Note Description:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full p-2 mb-4 border border-white rounded-lg bg-gray-800 text-white"
                placeholder="Enter note description"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-2 rounded-lg"
              >
                {noteEdit ? "Update Note" : "Add Note"}
              </button>
            </form>
          </div>
        </div>
      )}

      {noteList.length === 0 ? (
       <div className="bg-[#0A0A0A] flex flex-col items-center justify-center min-h-screen h-full px-6 pb-10 text-center mx-auto">
       <img
         src="/empty_list (1).png"
         alt="emptylist"
         className="w-[700px] md:w-[400px] h-auto mx-auto"
       />
       <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
         Every day is a new opportunity for success! 🚀
       </p>
       <p className="text-gray-500 mt-2 text-lg">
         Write down your tasks and take a step forward toward your goals!✨
       </p>
     </div>
     
      ) : (
        <div className="bg-[#0A0A0A] space-y-4">
           <h1 className="text-2xl font-bold text-left py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text inline-block">
        {type} Notes
      </h1>
          {noteList.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg flex flex-wrap justify-between items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <h2 className="text-xl text-white break-words whitespace-normal w-full">
                  {note.title}
                </h2>
                <p className="text-gray-300 mt-2 text-lg break-words whitespace-normal w-full">
                  {note.description}
                </p>
                <p className="text-sm text-gray-300">
                  {note.day}, {note.date} - {note.time}
                </p>
              </div>

              <div className="flex flex-col items-end space-y-5 p-1">
                <div
                  onClick={() => toggleComplete(note.id)}
                  className="w-6 h-6 border-2 border-white rounded-lg flex items-center justify-center cursor-pointer"
                >
                  {note.complete ? (
                    <svg
                      className="w-5 h-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : null}
                </div>
                <button
                  onClick={() => editNote(note.id)}
                  className="text-yellow-400"
                >
                  <img
                    src="/edit_icon.png"
                    alt="edit"
                    className="transition duration-200 transform hover:scale-95 active:scale-90 focus:outline-none"
                  />
                </button>
                <button onClick={() => deleteNote(note.id)}>
                  <img
                    src="/delete_icon.png"
                    alt="delete"
                    className="transition duration-200 transform hover:scale-95 active:scale-90 focus:outline-none"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 text-white w-16 h-16 rounded-full text-3xl font-bold hover:opacity-80 transition duration-300"
      >
        +
      </button>
    </div>
  );
}
