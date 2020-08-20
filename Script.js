$(document).ready(function () {
    let taskArray = [];

    for (let b = 0; b < 24; b++) {
        taskArray.push("*");
    }

    let today = moment().format('MMMM Do YYYY');
    let m = moment();

    console.log(`Today's date is ${today}`)
    console.log(`Current time is ${m.format("LT")}`);

    // Store cities in local storage
    function storeTasks() {
        localStorage.setItem("tasks", JSON.stringify(taskArray));
    }

    // Rendering the table for the dayplanner
    function renderPlanner() {
        for (let i = 0; i < 24; i++) {

            init();
            let hour = m.hour(i);
            // console.log(hour.hour());
            let hourlyRow = $(`<tr id="row${i}" class="hourlyRow">`);
            let hourlyTime = $(`<td class="hour">`).text(hour.minute(0).format("LT"));
            let hourlyTask = $(`<td id="task${i}" class="hourlyTask" contenteditable="true">`).text(taskArray[i]);
            let hourlyStatus = $(`<td id="status${i}" class="hourlyStatus">`).text('Incomplete');
            let hourlySave = $('<td class="hourlySave">').text("Save");

            // If the hour is past then the table cells will be locked and unavailable
            let pastRow = $(`<tr class="table-secondary">`);
            let pastTask = $('<td class="pastTask">').text(" ");
            let pastStatus = $('<td class="pastStatus">').text(`Locked`);
            let pastSave = $('<td class="pastSave">');


            if (hour.hour() >= moment().hour()) {
                $(hourlyRow).append(hourlyTime);
                $(hourlyRow).append(hourlyTask);
                $(hourlyRow).append(hourlyStatus);
                $(hourlyRow).append(hourlySave);
                $('#taskManager').append(hourlyRow);
                storeTasks();
            }
            else {
                $(pastRow).append(hourlyTime);
                $(pastRow).append(pastTask);
                $(pastRow).append(pastStatus);
                $(pastRow).append(pastSave);
                $('#taskManager').append(pastRow);
                storeTasks();
            }



            // Clicking "Save" will lock in the task and will no longer be editable
            $(hourlySave).on("click", function () {
                let x = document.getElementById(`task${i}`)
                x.contentEditable = "false";
                hourlySave.text("Locked");
                taskArray[i] = x.innerHTML;
                console.log(taskArray)
                storeTasks();
            })

            // Clicking "Save" will highlight the task cell in green and the status will be complete.
            $(hourlyStatus).on("click", function() {
                let y = document.getElementById(`task${i}`);
                jQuery(`#${i}`).addClass('table-success')
                hourlyStatus.text("Complete!");
            })
        }

    }


    $("#currentDay").text(today);


    renderPlanner();


    function init() {
        let storedTasks = JSON.parse(localStorage.getItem("tasks"))
        if (storedTasks !== null) {
            taskArray = storedTasks;
        }
        for (let a = 0; a < 24; a++) {
                $(`task${a}`).innerHTML = taskArray[a];
                console.log(taskArray[a])
            }

    }
});

