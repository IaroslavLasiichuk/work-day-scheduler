$(function () {

  // This code uses the id in the containing time-block as a key to save the user input in local storage
  $('.btn').on("click", function () {
    let idOfparent = $(this).parent();
    idOfparent.each(function (i) {
      let id = $(this).prop('id');
      localStorage.setItem(id, $(idOfparent).children('textarea').val());
    });
  });

  //This code to apply the past, present, or future class to each time
  //  block by comparing the id to the current hour and
  // get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements
  const currentHour = `${dayjs().format('H')}`;
  let blocks = $('.time-block');
  blocks.each(function (i, element) {
    let divEl = $(element);
    let divIdis = $(this).prop('id');
    let textAreaEl = $(element).children('textarea');
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
  });

  // Displays the current date in the header of the page
  $('#currentDay').text(dayjs().format('dddd, MMMM, YYYY, h:m a'));
});