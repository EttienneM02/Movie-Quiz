24. Navigation
The prototype should have simple navigation.

Possible screens:

const screens = {
  home: document.querySelector("#home"),
  genres: document.querySelector("#genres"),
  movies: document.querySelector("#movies"),
  modes: document.querySelector("#modes"),
  quiz: document.querySelector("#quiz"),
  results: document.querySelector("#results")
};

Create a reusable function:

function showScreen(screenName) {
  // hide all screens
  // show requested screen
}

Avoid page reloads during normal gameplay.

