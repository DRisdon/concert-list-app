const router = require('express').Router();
const auth = require('../services/auth');
const moment = require('moment')
const Shows = require('../models/shows');

// get all shows for this user
router.get('/',
  auth.restrict,
  Shows.findAllForUser,
  (req, res) => {
    const shows = res.locals.shows;
    shows.forEach((show) => {
      console.log(show.event_date);
      show.event_date = moment(show.event_date).format('dddd, MMMM Do YYYY, h:mm a');
    });
    res.render('home', shows);
  }
)

// get manual entry form
router.get('/manual-entry',
  auth.restrict,
  (req, res) => {
    res.render('manualentry');
  }
)

// post manual entry
router.post('/manual-entry',
  auth.restrict,
  Shows.manualAdd,
  (req, res) => {
    const show = res.locals.show;
    res.json(show);
  }
)

// post show from songkick
router.post('/sk-entry',
  auth.restrict,
  Shows.skAdd,
  (req, res) => {
    const show = res.locals.show;
    res.json(show);
  }
)

// update attendance
router.put('/change-attendance',
  auth.restrict,
  Shows.changeAttendance,
  (req, res) => {
    const show = res.locals.show;
    res.json(show);
  }
)

// get search page
router.get('/search',
  auth.restrict,
  (req, res) => {
    res.render('search');
  }
)

// get single show
router.get('/:id',
  auth.restrict,
  Shows.findByID,
  (req, res) => {
    const show = res.locals.show;
    console.log(show.event_date);
    show.event_date = moment(show.event_date).format('dddd, MMMM Do YYYY, h:mm a');
    res.render('show', show);
  }
)

// get edit page
router.get('/:id/edit',
  auth.restrict,
  Shows.findByID,
  (req, res) => {
    const show = res.locals.show;
    console.log(show.event_date);
    show.event_date = moment(show.event_date).format('YYYY-MM-DDTHH:mm');
    res.render('manualedit', show);
  }
)

// update a show
router.put('/:id/edit',
  auth.restrict,
  Shows.manualEdit,
  (req, res) => {
    const show = res.locals.show;
    res.json(show);
  }
)

// delete a show
router.delete('/:id',
  auth.restrict,
  Shows.delete,
  (req, res) => {
    const show = res.locals.show;
    res.json(show);
  }
)

// songkick api
router.get('/search/:artist',
  auth.restrict,
  Shows.getArtistIdSK,
  Shows.getShowsByArtistSK,
  (req, res) => {
    const shows = res.locals.shows;
    // artist has no shows
    if (shows === undefined) {
      res.render('search', {
        text: 'Error: artist has no upcoming shows'
      })
    }
    // convert timestamps to readable format
    shows.forEach((show) => {
      if (show.start.datetime === null) {
        // display date
        show.start.eventdate = moment(`${show.start.date}`).format('dddd, MMMM Do YYYY');
        // date to enter into database
        show.start.datetime = moment(`${show.start.date}`).format('YYYY-MM-DD');
      } else {
      show.start.eventdate = `${show.start.datetime}`
      show.start.eventdate = moment(show.start.eventdate.substring(0, show.start.eventdate.length - 5))
        .format('dddd, MMMM Do YYYY, h:mm a');
      }
    });
    const artistName = res.locals.artistName;
    res.render('schedule', {
      shows: shows,
      artistName: artistName
    });
  }
)

module.exports = router;
