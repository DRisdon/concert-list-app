$(document).ready(function() {


$('.new-show-form').on('submit', e => {
  e.preventDefault(); // stops default behavior of page refresh

  // grab values from form
  const artist = $('#artist-input').val(),
        event_date = $('#date-input').val(),
        venue = $('#venue-input').val(),
        city = $('#city-input').val(),
        attendance = $('#attendance-input').val();

  // create new object to send form data in
  const newShow = { artist: artist, event_date: event_date, venue: venue, city: city, attendance: attendance };

  $.ajax({
    method: 'POST',
    url: '/shows/manualentry',
    data: newShow,
    success: response => {
      console.log(response);
      window.location.replace('/shows/' + response.id);
    }, error: msg => {
      console.log(msg);
    }
  }); // ends ajax method
}); // ends submit function

$('.edit-show-form').on('submit', e => {
  e.preventDefault(); // stops default behavior of page refresh

  // grab values from form
  const artist = $('#artist-input').val(),
        event_date = $('#date-input').val(),
        venue = $('#venue-input').val(),
        city = $('#city-input').val(),
        attendance = $('#attendance-input').val(),
        id = $('#id-input').val();

  // create new object to send form data in
  const updatedShow = { artist: artist, event_date: event_date, venue: venue, city: city, attendance: attendance };

  $.ajax({
    method: 'PUT',
    url: `/shows/${id}/edit`,
    data: updatedShow,
    success: response => {
      console.log(response);
      window.location.replace('/shows/' + response.id);
    }, error: msg => {
      console.log(msg);
    }
  }); // ends ajax method
}); // ends submit function

$('#attendance-form').on('submit', e => {
  e.preventDefault(); // stops default behavior of page refresh

  // grab values from form
  const id = $('#attendance-form').attr('data-id');
  const attendance = $('#attendance-input').val();

  const updateData = { id: id, attendance: attendance };

  $.ajax({
    method: 'PUT',
    url: '/shows/changeattendance',
    data: updateData,
    success: response => {
      console.log(response);
      window.location.replace('/shows/' + response.id);
    }, error: msg => {
      console.log(msg);
    }
  }); // ends ajax method
}); // ends submit function for new pokemon form

});
