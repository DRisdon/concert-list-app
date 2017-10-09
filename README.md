# CONCERT WISHLIST

**TECH AND APPROACH**

The app was built using the [Songkick API](https://www.songkick.com/developer). The API allows for searching for an artist by name, which which gives an artist ID, which can be used to then search for that artist's tour schedule. The user can search for an artist, and then choose from a list of shows which one they are interested in. They can choose whether they are definitely attending or just interested. Additionally the user can manually enter information about shows that might not be listed on Songkick, such as those by smaller artists.

When the user searches for an artist, two middleware functions are called, returning first the artist ID, and then using that artist ID to find a list of shows. The user will then choose a show to store into the database, or just return to their list or the search page. Timestamps between Songkick and user entry may vary, so [Moment](https://momentjs.com/) is used to format them for consistency in the DB.

**WIREFRAMES**

<img width="1024" alt="screen shot 2017-10-03 at 9 19 18 pm" src="https://git.generalassemb.ly/storage/user/7633/files/4b5b3f32-a883-11e7-808b-98128dd134c6">
<img width="1033" alt="screen shot 2017-10-03 at 9 20 31 pm" src="https://git.generalassemb.ly/storage/user/7633/files/4d96e08a-a883-11e7-9b01-056dccd31ee0">
<img width="1033" alt="screen shot 2017-10-03 at 9 21 30 pm" src="https://git.generalassemb.ly/storage/user/7633/files/4f3bb29e-a883-11e7-85e4-d82db5bbaf72">
<img width="1026" alt="screen shot 2017-10-03 at 9 22 28 pm" src="https://git.generalassemb.ly/storage/user/7633/files/51a16d08-a883-11e7-9d4b-6ecd3745295a">

**USER STORIES**

- As a user I want to have a list of concerts I want to attend that is easy to access
- As a user i want to be able to find a list of upcoming concerts by bands I like

**INSTALATION**

If you wish to install and use this app, you need first run `npm install` in your terminal, and also acquire an API key from Songkick. Preferably, you should just open the app in a browser, as it is hosted on Heroku.

**USOLVED PROBLEMS**

Something to add in the future would be updating information about shows in the database if they are changed on Songkick.
