Users choose a movie from a genre and play quizzes based specifically on that movie.

Supported genres:

Horror

Sci-Fi

Action

Romance

Thriller

Each genre contains a predefined list of movies.

The prototype should use static JavaScript data rather than fetching movie information from an API.

Example:

const movies = [
  {
    id: "the-conjuring",
    title: "The Conjuring",
    genre: "horror",
    year: 2013,
    difficulty: "medium",
    description: "A supernatural horror film following paranormal investigators Ed and Lorraine Warren.",
    poster: "assets/posters/the-conjuring.jpg"
  }
];