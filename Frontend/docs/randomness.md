28. Randomization
Questions should be shuffled at the start of a quiz.

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

Answers should also be randomized.

Important:

The correct answer must remain correctly associated after shuffling.

Prefer storing answers as objects:

answers: [
  {
    id: "a",
    text: "James Wan",
    correct: true
  },
  {
    id: "b",
    text: "Mike Flanagan",
    correct: false
  }
]