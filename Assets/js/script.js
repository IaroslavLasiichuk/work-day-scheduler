$(function () {

  // This code uses the id in the containing time-block as a key to save the user input in local storage
  $('.btn').on("click", function () {
    let idOfparent = $(this).parent();
    for (let i = 0; i < idOfparent.length; i++){
      let id = $(idOfparent).prop('id');
      localStorage.setItem(id, $(idOfparent).children('textarea').val());
    }
  });

  // Timer for disappear message
  let timerCount = 5;
  $('.btn').on("click", function messageDisapear () {
    const timerInterval = setInterval(() => {
      timerCount--;
      let message = $('.appoitment');
      console.log(timerCount);
      $(message).text('Added to localStorage✅');
      if (timerCount === 0) {
        clearInterval(timerInterval);
        timerCount = 5;
        $(message).text('');
      }
  }, 1000);
  });

  //This code to apply the past, present, or future class to each time
  //  block by comparing the id to the current hour and
  // get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements
  const currentHour = `${'hour-'}${dayjs().format('HH')}`;
  let blocks = $('.time-block');
  for (let i = 0; i < blocks.length; i++){
    let divEl = $(blocks[i]);
    let divIdis = $(divEl).prop("id");
    let textAreaEl = $(blocks[i]).children('textarea');
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) === divIdis) {
        textAreaEl.val(localStorage.getItem(localStorage.key(i)));
      }
    }
    if (divIdis == currentHour) {
      divEl.addClass('present');
    }
    if (divIdis < currentHour) {
      divEl.addClass('past');
    }
    if (divIdis > currentHour) {
      divEl.addClass('future');
    }
  }

  // Displays the current date in the header of the page
  $('#currentDay').text(dayjs().format('dddd, MMMM, YYYY, HH:mm a'));
});