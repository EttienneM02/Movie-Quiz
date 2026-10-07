18. Game State
Use a single central JavaScript object.

const gameState = {
  selectedGenre: null,
  selectedMovie: null,
  selectedMode: null,

  questions: [],
  currentQuestionIndex: 0,

  score: 0,
  streak: 0,
  maxStreak: 0,

  correctAnswers: 0,
  incorrectAnswers: 0,

  questionStartTime: null,
  timeRemaining: 15,

  gameStarted: false,
  gameCompleted: false
};

Do not scatter gameplay state throughout unrelated variables.

19. Local Storage
Use localStorage to persist player progress.

The prototype does not need a backend.

Store:

High score
localStorage.setItem(
  "movieQuizHighScore",
  gameState.score
);

Movie mastery
Store something similar to:

{
  "the-conjuring": {
    gamesPlayed: 4,
    bestScore: 8200,
    bestStreak: 7,
    questionsAnswered: 40,
    questionsCorrect: 32,
    mastery: 80
  }
}

Use:

const progress =
  JSON.parse(localStorage.getItem("movieQuizProgress")) || {};

