$(document).ready(function() {

  // attendance text for show page
  if ($('#attendance-tag').attr('data-attendance') === 'true') {
    $('#attendance-tag').text('ATTENDING');
  } else $('#attendance-tag').text('MAYBE ATTENDING');

  $('.new-show-form').on('submit', e => {
    e.preventDefault(); // stops default behavior of page refresh

    // grab values from form
    const artist = $('#artist-input').val(),
      event_date = $('#date-input').val(),
      venue = $('#venue-input').val(),
      city = $('#city-input').val(),
      attendance = $('#attendance-input').val();

    // create new object to send form data in
    const newShow = {
      artist: artist,
      event_date: event_date,
      venue: venue,
      city: city,
      attendance: attendance
    };

    $.ajax({
      method: 'POST',
      url: '/shows/manual-entry',
      data: newShow,
      success: response => {
        console.log(response);
        window.location.replace('/shows/' + response.id);
      },
      error: msg => {
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
    const updatedShow = {
      artist: artist,
      event_date: event_date,
      venue: venue,
      city: city,
      attendance: attendance
    };

    $.ajax({
      method: 'PUT',
      url: `/shows/${id}/edit`,
      data: updatedShow,
      success: response => {
        console.log(response);
        window.location.replace('/shows/' + response.id);
      },
      error: msg => {
        console.log(msg);
      }
    }); // ends ajax method
  }); // ends submit function

  $('#attendance-form').on('submit', e => {
    e.preventDefault(); // stops default behavior of page refresh

    // grab values from form
    const id = $('#attendance-form').attr('data-id');
    const attendance = $('#attendance-input').val();

    const updateData = {
      id: id,
      attendance: attendance
    };

    $.ajax({
      method: 'PUT',
      url: '/shows/change-attendance',
      data: updateData,
      success: response => {
        console.log(response);
        window.location.replace('/shows/' + response.id);
      },
      error: msg => {
        console.log(msg);
      }
    });
  });

  $('.delete-button').on('click', e => {
    const id = $('.delete-button').attr('data-id');

    $.ajax({
      method: 'DELETE',
      url: `/shows/${id}`,
      success: response => {
        console.log(response);
        window.location.replace('/shows');
      },
      error: msg => {
        console.log(msg);
      }
    })
  })

  $('.search-form').on('submit', e => {
    e.preventDefault();
    const artist = $('.artist-search').val();
    window.location.replace(`/shows/search/${artist}`)
  });

  $('.confirm').on('click', e => {
    const artist = $('#shows').attr('data-artist')
      venue = e.target.attributes[1].value,
      city = e.target.attributes[2].value,
      event_date = moment(e.target.attributes[3].value).format('YYYY-MM-DDTHH:mm'),
      url = e.target.attributes[4].value;

    if (e.target.attributes[0].value === "attending-sk confirm") {
      var attendance = true;
    } else var attendance = false;

    // create new object to send form data in
    const newShow = {
      artist: artist,
      event_date: event_date,
      venue: venue,
      city: city,
      attendance: attendance,
      url: `${url}`
    };
    console.log(newShow);

    $.ajax({
      method: 'POST',
      url: '/shows/sk-entry',
      data: newShow,
      success: response => {
        console.log(response);
        window.location.replace('/shows/' + response.id);
      },
      error: msg => {
        console.log(msg);
      }
    }); // ends ajax method)
  });

});
