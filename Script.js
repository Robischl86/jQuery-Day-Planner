$(document).ready(function () {
    let today = moment().format('MMMM Do YYYY');
    let m = moment();
    let mDate = moment().format("L");

    console.log(`Today's date is ${today}`)
    console.log(`Current time is ${m.format("LT")}`);

    // Rendering the table for the dayplanner
    function renderPlanner() {
        for (let i = 0; i < 24; i++) {

            let hour = m.hour(i);
            // console.log(hour.hour());
            let hourlyRow = $(`<tr class="hourlyRow">`);
            let hourlyTime = $(`<td class="hour">`).text(hour.minute(0).format("LT"));
            let hourlyTask = $(`<td id=${i} class="hourlyTask" contenteditable="true">`);
            let hourlyStatus = $('<td class="hourlyStatus">').text('Incomplete');
            let hourlySave = $('<td class="hourlySave">').text("Save");

            // If the hour is past then the table cells will be locked and unavailable
            let pastRow = $(`<tr class="table-secondary">`);
            let pastTask = $('<td class="pastTask">').text(`No longer available`);
            let pastStatus = $('<td class="pastStatus">').text(`Locked`);
            let pastSave = $('<td class="pastSave">');


            if (hour.hour() >= moment().hour()) {
                $(hourlyRow).append(hourlyTime);
                $(hourlyRow).append(hourlyTask);
                $(hourlyRow).append(hourlyStatus);
                $(hourlyRow).append(hourlySave);
                $('#taskManager').append(hourlyRow);
            }
            else {
                $(pastRow).append(hourlyTime);
                $(pastRow).append(pastTask);
                $(pastRow).append(pastStatus);
                $(pastRow).append(pastSave);
                $('#taskManager').append(pastRow);
            }

            // Clicking "Save" will lock in the task and will no longer be editable
            $(hourlySave).on("click", function () {
                let x = document.getElementById(`${i}`)
                if (hourlySave.innerHTML = "Save") {
                    x.contentEditable = "false";
                    hourlySave.text("Edit")
                }
                else if (hourlySave.innerHTML = "Edit") {
                    x.contentEditable = "true";
                    hourlySave.text("Save")
                }
            })

            // Clicking "Save" will highlight the task cell in green and the status will be complete.
            $(hourlyStatus).on("click", function() {
                let y = document.getElementById(`${i}`);
                $(y).toggleClass("table-success");
                hourlyStatus.text("Complete!")
            })
        }
    }

    $("#currentDay").text(today);


    renderPlanner();

});

