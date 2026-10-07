10. Quiz Screen
This is the primary gameplay screen.

The layout should prioritize the question and answers.

Example:

THE CONJURING

QUESTION 04 / 10

████████████░░░░░░░░

SCORE
1,850

────────────────────

What is the name of
the family's youngest daughter?

────────────────────

[ A ] Nancy

[ B ] April

[ C ] Cindy

[ D ] Christine

The quiz screen must include:

Movie title

Question number

Progress bar

Current score

Question

Answer choices

Optional countdown timer

11. Question Data Structure
Questions should be stored in JavaScript.

Example:

const questions = [
  {
    id: "conjuring-q01",
    movieId: "the-conjuring",
    mode: "classic",
    difficulty: "easy",

    question: "Who directed The Conjuring?",

    answers: [
      "James Wan",
      "David F. Sandberg",
      "Mike Flanagan",
      "Scott Derrickson"
    ],

    correctAnswer: 0,

    explanation: "The Conjuring was directed by James Wan."
  }
];

Do not store the correct answer as the answer text.

Use an index or unique answer ID.

12. Question Types
The data model should support multiple question types.

Use:

type: "multiple-choice"

Initially support:

multiple-choice

true-false

Structure the code so additional types can be added later.

Potential future types:

quote

timeline

image

what-happens-next

character-identification

