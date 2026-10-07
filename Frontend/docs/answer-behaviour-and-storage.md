13. Answer Behaviour
When a player selects an answer:

Correct
Highlight answer green

Add points

Show short explanation

Update score meter

Briefly pause

Automatically move to next question

Incorrect
Highlight selected answer red

Highlight correct answer green

Show explanation

Deduct points only if configured

Briefly pause

Move to next question

Do not allow multiple answers after a selection.

Disable the remaining answer buttons once an answer has been chosen.

14. Scoring System
The score should be calculated in JavaScript.

Base scoring:

const BASE_POINTS = 100;

Difficulty multiplier:

Easy      × 1
Medium    × 1.5
Hard      × 2
Expert    × 3

Optional speed bonus:

Fast answer     +50
Normal answer   +25
Slow answer     +0

Example:

function calculateScore(question, timeRemaining) {
  let points = 100;

  if (question.difficulty === "medium") {
    points *= 1.5;
  }

  if (question.difficulty === "hard") {
    points *= 2;
  }

  if (timeRemaining >= 7) {
    points += 50;
  }

  return Math.round(points);
}

22. Local Storage Requirements
Create a storage helper module/object.

Example:

const Storage = {

  getProgress() {
    return JSON.parse(
      localStorage.getItem("movieQuizProgress")
    ) || {};
  },

  saveProgress(progress) {
    localStorage.setItem(
      "movieQuizProgress",
      JSON.stringify(progress)
    );
  },

  getHighScore() {
    return Number(
      localStorage.getItem("movieQuizHighScore")
    ) || 0;
  },

  saveHighScore(score) {
    localStorage.setItem(
      "movieQuizHighScore",
      String(score)
    );
  },

  reset() {
    localStorage.removeItem("movieQuizProgress");
    localStorage.removeItem("movieQuizHighScore");
  }
};

23. Reset Progress
Provide a small settings/reset option.

Example:

⚙ Settings

[ Reset All Progress ]

Before deleting data, use:

confirm(
  "Are you sure? This will erase all movie progress and scores."
);