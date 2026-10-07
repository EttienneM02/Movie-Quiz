he prototype should contain the following screens.

HOME
  ↓
GENRE SELECT
  ↓
MOVIE SELECT
  ↓
QUIZ MODE
  ↓
QUIZ
  ↓
RESULTS
  ↓
MOVIE MASTERY

The application can technically be a single-page application using vanilla JavaScript.

Do not create multiple HTML pages unless necessary.

Use sections/views that are shown and hidden with JavaScript.

6. Home Screen
The home screen should immediately communicate the game.

Example:

        🎬 MOVIE QUIZ

     HOW WELL DO YOU
       KNOW MOVIES?

   Test your movie knowledge.
   Choose a genre. Pick a movie.
   Take the challenge.

        [ PLAY NOW ]

     🔥 BEST SCORE
         8,420

Include:

Game title

Short tagline

Play button

High score

Optional "How to Play" button

The Play button takes the user to Genre Selection.

7. Genre Selection
Display the five genres as large interactive cards.

CHOOSE YOUR GENRE

┌─────────────┐  ┌─────────────┐
│ 👻          │  │ 🚀          │
│ HORROR      │  │ SCI-FI      │
└─────────────┘  └─────────────┘

┌─────────────┐  ┌─────────────┐
│ 💥          │  │ ❤️          │
│ ACTION      │  │ ROMANCE     │
└─────────────┘  └─────────────┘

        ┌─────────────┐
        │ 🔪          │
        │ THRILLER    │
        └─────────────┘

Each genre should have:

Icon

Name

Number of available movies

Hover animation

Click interaction

Clicking a genre stores:

gameState.selectedGenre

Then opens Movie Selection.

8. Movie Selection
Show movies belonging to the selected genre.

Example:

HORROR

Choose your movie

┌────────────────┐
│                │
│   POSTER       │
│                │
├────────────────┤
│ THE CONJURING  │
│ 2013           │
│ ★★★            │
│                │
│ [ PLAY ]       │
└────────────────┘

Movie cards should contain:

Poster

Movie title

Release year

Difficulty

Optional short description

Player's previous mastery percentage

Example:

THE CONJURING

Mastery
██████░░░░ 62%

Best Score: 8,200

If the movie has never been played:

Not played yet