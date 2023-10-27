var timeDisplay = $('#currentDay');
var saveEventBtn = $('.saveBtn');

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
 
  saveEventBtn.on('click', handleSaveEvent);


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  $(document).ready(function() {
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();
  
    // Iterate through each time-block div
    $('.time-block').each(function() {
      var blockHour = parseInt($(this).attr('id').split('-')[1]);
  
      // Compare and add appropriate class
      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  });

  function handleSaveEvent() {
    // Get the user input and the time-block's ID
    var userInput = $(this).siblings('.description').val();
    var timeBlockId = $(this).closest('.time-block').attr('id');
  
    // Save the user input in local storage
    localStorage.setItem(timeBlockId, userInput);
  }

  $(document).ready(function() {
    // Iterate through each time-block div
    $('.time-block').each(function() {
      var blockId = $(this).attr('id');
      var storedUserInput = localStorage.getItem(blockId);
  
      if (storedUserInput) {
        // Set the textarea value with the stored user input
        $(this).find('.description').val(storedUserInput);
      }
    });
  });


  //
  // TODO: Add code to display the current date in the header of the page.

});

function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplay.text(rightNow);
}
displayTime();
setInterval(displayTime, 1000);