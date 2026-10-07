2,500

The score meter should animate when points are earned.

When the player answers correctly:

+150

should briefly appear near the score.

Use CSS transitions/animations.

Example:

.score-pop {
  animation: scorePop 0.5s ease;
}

@keyframes scorePop {
  0% {
    transform: scale(1);
    opacity: 0;
  }

  50% {
    transform: scale(1.3);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}

16. Streak System
Track consecutive correct answers.

gameState.streak = 0;

Correct answer:

gameState.streak++;

Incorrect answer:

gameState.streak = 0;

Display:

🔥 4 ANSWER STREAK

Optional multiplier:

0–2 streak     ×1
3–4 streak     ×1.25
5–6 streak     ×1.5
7+ streak      ×2

This should make the game feel more arcade-like.