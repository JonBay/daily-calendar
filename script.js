var timeDisplay = $("#currentDay");
var saveEventBtn = $(".saveBtn");

$(function () {
  saveEventBtn.on("click", handleSaveEvent);

  $(document).ready(function () {
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();

    // Iterate through each time-block
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]); //I used internet help to figure out the split

      // compare time of day and add past,present,future class
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  });

  function handleSaveEvent() {
    // Get the user input and which time block it belongs to
    var userInput = $(this).siblings(".description").val();
    var timeBlockId = $(this).closest(".time-block").attr("id");

    // Save the user input in local storage
    localStorage.setItem(timeBlockId, userInput);
  }

  $(document).ready(function () {
    $(".time-block").each(function () {
      var blockId = $(this).attr("id");
      var storedUserInput = localStorage.getItem(blockId);

      if (storedUserInput) {
        // Populate the text with the stored user input
        $(this).find(".description").val(storedUserInput);
      }
    });
  });

  function displayDate() {
    var currentDate = dayjs().format("dddd, MMM DD, YYYY");
    timeDisplay.text(currentDate);
  }

  displayDate();
  setInterval(displayDate, 1000);
});
