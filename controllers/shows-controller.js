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

router.get('/manualentry',
  auth.restrict,
  (req, res) => {
    res.render('manualentry');
  }
)

router.post('/manualentry',
  auth.restrict,
  Shows.manualAdd,
  (req, res) => {
    const show = res.locals.show;
    res.json(show);
  }
)

router.put('/changeattendance',
auth.restrict,
Shows.changeAttendance,
(req, res) => {
  const show = res.locals.show;
  res.json(show);
}
)

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

router.get('/:id/manualedit',
  auth.restrict,
  (req, res) => {
    res.render('manualedit');
  }
)

module.exports = router;
