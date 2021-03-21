function showNote(note) {
    const notesBoard = document.getElementById("notes-board");
    notesBoard.innerHTML += `
    <div class="note">
        <div class="note-body" id="${note.nid}">
        ${note.body}
        </div>
        <div class="row note-footer">
            ${note.date} - ${note.time}
            <i class="fa fa-minus offset-4" aria-hidden="true"></i>
        </div>
    </div>
    `;
}
function validateDate(date) {
    const currentDate = new Date();
    const currDateObject = {
        year: parseInt(currentDate.getFullYear()),
        month: parseInt(currentDate.getMonth() + 1),
        day: parseInt(currentDate.getDate())
    }
    const dateArray = date.split("-")
    const dateObject = {
        year: parseInt(dateArray[0]),
        month: parseInt(dateArray[1]),
        day: parseInt(dateArray[2])
    }
    console.log(dateObject);
    console.log(currDateObject);
    if (dateObject.year < currDateObject.year) {
        alert("The date of the note can't be before the current year");
        return false;
    }
    else if (dateObject.year === currDateObject.year) {
        if (dateObject.month < currDateObject.month) {
            alert("The date of the note can't be before the current month");
            return false;
        }
        else if (dateObject.month === currDateObject.month) {
            if (dateObject.day < currDateObject.day) {
                alert("The date of the note can't be before the current day");
                return false;
            }
        }
    }
    return true;
}

function addNote() {
    /*
    this function gets activated whenever an add note button is clicked.
    When this function is called it checks if the textarea contains any text at all,
    and if the time to finish is added if not it will notify the user that he should a finish date and time, and press again. 
    */
    const noteText = document.getElementById("form-text").value;
    const dateAndTime = document.getElementById("date-time-input").value;

    if (noteText === "") {
        alert("You can't add an empty note!\nPlease enter a text in the box and don't forget to choose time and date :)");
        return;
    }
    if (dateAndTime === "") {
        alert("in order to add your note to the board, you will need to choose a date and time of when you will finish this task");
        return;
    }
    // separating the date and time because it is in this form: "date T time"   
    // our array is now in length of 2

    const dateAndTimeArray = dateAndTime.split("T")
    const checkDate = validateDate(dateAndTimeArray[0]);
    if (checkDate) {
        const note = saveToLocalStorage(noteText, dateAndTimeArray[0], dateAndTimeArray[1]);
        showNote(note);
    }

}

function saveToLocalStorage(noteText, noteDate, noteTime) {

    // giving each note a unique id so it can be used later,e.g.:removal of the note. 
    const noteId = Math.random().toString(36).substr(2);


    const note = {
        nid: noteId,
        body: noteText,
        date: noteDate,
        time: noteTime
    }

    let notes = [];
    const jsonArray = localStorage.getItem("notes");
    if (jsonArray) {
        notes = JSON.parse(jsonArray);
    }

    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    return note;

}

function onLoad() {

    const jsonArray = localStorage.getItem("notes");
    if (!jsonArray) return;

    const notes = JSON.parse(jsonArray);

    for (const note of notes) {
        showNote(note)
    }
}
onLoad()