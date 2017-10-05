const db = require('../db/config');
const axios = require('axios');
require('dotenv').config();

const Shows = {};

// get all shows for this user
Shows.findAllForUser = (req, res, next) => {
  const user_id = req.user.id;
  db.manyOrNone('SELECT * FROM concerts WHERE user_id= $1', [user_id])
    .then((shows) => {
      res.locals.shows = shows;
      console.log(shows);
      next();
    });
}

Shows.findByID = (req, res, next) => {
  const user_id = req.user.id;
  const id = req.params.id
  db.oneOrNone('SELECT * FROM concerts WHERE user_id= $1 AND id = $2 ORDER BY event_date', [user_id, id])
    .then((show) => {
      res.locals.show = show;
      console.log(show);
      next();
    });
}

Shows.manualAdd = (req, res, next) => {
  const user_id = req.user.id;
  const artist = req.body.artist;
  const venue = req.body.venue;
  const city = req.body.city;
  const event_date = req.body.event_date;
  const attendance = req.body.attendance;

  db.one(
      `INSERT INTO concerts
      (artist, venue, city, event_date, attendance, user_id, songkick)
      VALUES ($1, $2, $3, $4, $5, $6, $7) returning id`,
      [artist, venue, city, event_date, attendance, user_id, 'manual']
  ).then((show) => {
      console.log('returned new show: ', show);
      res.locals.show = show;
      next();
  });
}

Shows.changeAttendance = (req, res, next) => {
  const user_id = req.user.id;
  const id = req.body.id;
  const attendance = req.body.attendance;

  db.one(
    'UPDATE concerts SET attendance = $1 WHERE id = $2 and user_id = $3 RETURNING id',
    [attendance, id, user_id]
  ).then((show) => {
      console.log('returned new show: ', show);
      res.locals.show = show;
      next();
  });
}

Shows.manualEdit = (req, res, next) => {
  const user_id = req.user.id;
  const id = req.params.id;
  const artist = req.body.artist;
  const venue = req.body.venue;
  const city = req.body.city;
  const event_date = req.body.event_date;
  const attendance = req.body.attendance;

  db.one(
    `UPDATE concerts
    SET artist = $1, venue = $2, city = $3, event_date = $4, user_id = $5, attendance = $6
    WHERE id = $7 and user_id = $5 RETURNING id`,
    [artist, venue, city, event_date, user_id, attendance, id]
  ).then((show) => {
      console.log('returned new show: ', show);
      res.locals.show = show;
      next();
  });
}

module.exports = Shows;
