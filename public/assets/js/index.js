$(document).ready(function () {
  // activeNote is used to keep track of the note in the textarea
  let activeNote = {};

  // A function for getting all notes from the db
  const getNotes = function () {
    return $.ajax({
      url: "/api/notes",
      method: "GET",
    });
  };

  // A function for saving a note to the db
  const saveNote = function (note) {
    return $.ajax({
      url: "/api/notes",
      data: note,
      method: "POST",
    });
  };

  // A function for deleting a note from the db
  const deleteNote = function (id) {
    return $.ajax({
      url: "api/notes/" + id,
      method: "DELETE",
    });
  };

  // If there is an activeNote, display it, otherwise render empty inputs
  const renderActiveNote = function () {
    // $saveNoteBtn.hide();
    $(".save-note").hide();

    if (activeNote.id) {
      $(".note-title").attr("readonly", true).val(activeNote.title);
      $(".note-textarea").attr("readonly", true).val(activeNote.text);
    } else {
      $(".note-title").attr("readonly", false).val("");
      $(".note-textarea").attr("readonly", false).val("");
    }
  };

  // Get the note data from the inputs, save it to the db and update the view
  function handleNoteSave() {
    $(".new-note").show();
    const newNote = {
      title: $(".note-title").val(),
      text: $(".note-textarea").val(),
    };

    saveNote(newNote).then(function (data) {
      getAndRenderNotes();
      renderActiveNote();
    });
  }

  // Delete the clicked note
  function handleNoteDelete(event) {
    // prevents the click listener for the list from being called when the button inside of it is clicked
    event.stopPropagation();

    const note = $(this).parent(".list-group-item").data();

    if (activeNote.id === note.id) {
      activeNote = {};
    }

    deleteNote(note.id).then(function () {
      getAndRenderNotes();
      renderActiveNote();
    });
  }

  // Sets the activeNote and displays it
  function handleNoteView() {
    activeNote = $(this).data();
    renderActiveNote();
  }

  // Sets the activeNote to and empty object and allows the user to enter a new note
  function handleNewNoteView() {
    activeNote = {};
    renderActiveNote();
  }

  // If a note's title or text are empty, hide the save button
  // Or else show it
  function handleRenderSaveBtn() {
    if (!$(".note-title").val().trim() || !$(".note-textarea").val().trim()) {
      $(".save-note").hide();
      $(".new-note").show();
    } else {
      $(".save-note").show();
      $(".new-note").hide();
    }
  }

  // Render's the list of note titles
  function renderNoteList(notes) {
    $(".list-container .list-group").empty();

    const noteListItems = [];

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];

      const $li = $("<li class='list-group-item'>").data(note);
      const $span = $("<span>").text(note.title);
      const $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );

      $li.append($span, $delBtn);
      noteListItems.push($li);
    }

    $(".list-container .list-group").append(noteListItems);
  }

  // Gets notes from the db and renders them to the sidebar
  function getAndRenderNotes() {
    return getNotes().then(function (data) {
      renderNoteList(data);
    });
  }

  $(".save-note").on("click", handleNoteSave);
  $(".list-container .list-group").on(
    "click",
    ".list-group-item",
    handleNoteView
  );
  $(".new-note").on("click", handleNewNoteView);
  $(".list-container .list-group").on(
    "click",
    ".delete-note",
    handleNoteDelete
  );
  $(".note-title").on("keyup", handleRenderSaveBtn);
  $(".note-textarea").on("keyup", handleRenderSaveBtn);

  // Gets and renders the initial list of notes
  getAndRenderNotes();
});
