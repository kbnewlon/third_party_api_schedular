let now = moment();
let container = $(".container");
let workHours = ["9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm",];
let currentHour = parseInt(moment().format("H"))


//this function creates the work day list
function printWorkDay(hour) {
    for (var i = 0; i < hour.length; i++) {

        let hourRow = $("<div></div>");
        let workHour = $("<div></div>");
        let tasks = $("<textarea>");
        let save = $("<button>");
        let tVal = localStorage.getItem(`Task${i}`);
        let savIco = $("<i>");


        hourRow.attr("class", "row time-block");
        workHour.attr("class", "col-md-2 hour");
        workHour.attr("id", "hour-" + (9 + i));

        workHour.text(hour[i]);
        tasks.attr("class", "col-md-8 past");
        tasks.attr("id", "text-" + i);
        tasks.val(tVal);
        save.attr("class", "col-md-2 saveBtn");
        save.attr("id", "save-" + i);
        savIco.attr("class", "far fa-save");

        container.append(hourRow);
        hourRow.append(workHour, tasks, save);
        save.append(savIco);
    };

    timeOfDay();

};
// this function keeps the works day updated to the current time
function timeOfDay() {
    for (var j = 0; j < 9; j++) {
        let workID = $("#hour-" + (9 + j));
        let singleHour = parseInt(workID[0].id.replace("hour-", ""));
        let taskMod = $("#text-" + j);

        if (currentHour === singleHour) {
            taskMod.addClass("present");
        } else if (currentHour > singleHour) {
            taskMod.addClass("past");
        } else {
            taskMod.addClass("future");
        };
    };
};


//gives the current date and time
function currentDay() {
    $("#currentDay").text(now.format("LLLL"));
};

//tried to use this function to save to local storage. only use is save symbol. 
function saveTask(event) {
    let idx = event.target.id.replace("save-", "")
    let textInput = $(`#text-${idx}`).val();
    localStorage.setItem(`Task${idx}`, textInput);
};


//these functions get the system up and running 
printWorkDay(workHours);
currentDay();
