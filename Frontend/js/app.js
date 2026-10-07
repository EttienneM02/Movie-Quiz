(function () {
  "use strict";

  const { genres, movies, modes } = window.MovieQuizData;
  const questions = window.MovieQuizQuestions;
  const BASE_POINTS = 100;
  const QUESTION_TIME_SECONDS = 15;
  const ANSWER_FEEDBACK_DELAY = 1800;
  const screens = Array.from(document.querySelectorAll("[data-screen]"));
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
    timeBonus: 0,
    questionStartTime: null,
    timeRemaining: QUESTION_TIME_SECONDS,
    gameStarted: false,
    gameCompleted: false,
    answerLocked: false
  };

  const genreGrid = document.querySelector("#genre-grid");
  const movieGrid = document.querySelector("#movie-grid");
  const modeGrid = document.querySelector("#mode-grid");
  const screenAnnouncement = document.querySelector("#screen-announcement");
  const homeHighScore = document.querySelector("#home-high-score");
  const selectedGenreName = document.querySelector("#selected-genre-name");
  const modeMovieTitle = document.querySelector("#mode-movie-title");
  const movieCount = document.querySelector("#movie-count");
  const quizScreen = document.querySelector("#quiz");
  const quizMovieTitle = document.querySelector("#quiz-movie-title");
  const quizScore = document.querySelector("#quiz-score");
  const scoreValue = document.querySelector("#quiz-score");
  const scorePop = document.querySelector("#score-pop");
  const questionNumber = document.querySelector("#question-number");
  const questionModeLabel = document.querySelector("#question-mode-label");
  const questionProgress = document.querySelector("#question-progress");
  const timerValue = document.querySelector("#timer-value");
  const timerProgress = document.querySelector("#timer-progress");
  const timerPanel = document.querySelector("#timer-panel");
  const streakValue = document.querySelector("#streak-value");
  const currentStreak = document.querySelector("#current-streak");
  const questionType = document.querySelector("#question-type");
  const questionPrompt = document.querySelector("#question-prompt");
  const answerGrid = document.querySelector("#answer-grid");
  const answerFeedback = document.querySelector("#answer-feedback");
  const feedbackTitle = document.querySelector("#feedback-title");
  const feedbackExplanation = document.querySelector("#feedback-explanation");
  const quizQuestionPanel = document.querySelector("#quiz-question-panel");
  const recordBanner = document.querySelector("#record-banner");
  const appNotice = document.querySelector("#app-notice");
  const modeLabels = Object.fromEntries(modes.map((mode) => [mode.id, mode.name]));
  let answerAdvanceTimer = null;
  let countdownTimer = null;
  let noticeTimer = null;

  function showNotice(message) {
    appNotice.textContent = message;
    appNotice.hidden = false;
    clearTimeout(noticeTimer);
    noticeTimer = window.setTimeout(() => {
      appNotice.hidden = true;
      appNotice.textContent = "";
    }, 7000);
  }

  const Storage = {
    getItem(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        console.warn(`Browser storage is unavailable for "${key}".`, error);
        showNotice("Progress storage is unavailable in this browser session. Your results will not be saved.");
        return null;
      }
    },
    getProgress() {
      const rawProgress = this.getItem("movieQuizProgress");
      if (!rawProgress) return {};
      try {
        const progress = JSON.parse(rawProgress);
        if (progress && typeof progress === "object" && !Array.isArray(progress)) return progress;
        console.warn("Saved movie progress has an unexpected format.");
      } catch (error) {
        console.warn("Saved movie progress could not be read.", error);
      }
      showNotice("Saved movie progress could not be read. A fresh progress record will be used.");
      return {};
    },
    getHighScore() {
      const score = Number(this.getItem("movieQuizHighScore"));
      return Number.isFinite(score) && score > 0 ? score : 0;
    },
    saveItem(key, value) {
      try {
        window.localStorage.setItem(key, value);
        return true;
      } catch (error) {
        console.warn(`Could not save "${key}" to browser storage.`, error);
        showNotice("Your result is shown, but browser storage prevented it from being saved.");
        return false;
      }
    },
    saveProgress(progress) {
      return this.saveItem("movieQuizProgress", JSON.stringify(progress));
    },
    saveHighScore(score) {
      return this.saveItem("movieQuizHighScore", String(score));
    },
    reset() {
      try {
        window.localStorage.removeItem("movieQuizProgress");
        window.localStorage.removeItem("movieQuizHighScore");
        return true;
      } catch (error) {
        console.warn("Could not reset saved movie quiz progress.", error);
        showNotice("Progress could not be reset because browser storage is unavailable.");
        return false;
      }
    }
  };

  function getBestScore() {
    return Storage.getHighScore();
  }

  function showScreen(screenName) {
    const nextScreen = document.getElementById(screenName);
    if (!nextScreen || !screens.includes(nextScreen)) {
      throw new Error(`Unknown screen: ${screenName}`);
    }

    if (screenName !== "quiz") stopQuestionTimers();
    screens.forEach((screen) => {
      screen.hidden = screen !== nextScreen;
    });

    const heading = nextScreen.querySelector("h1");
    screenAnnouncement.textContent = `${heading.textContent.trim()} screen`;
    if (heading) heading.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function shuffle(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
  }

  function getQuestionsForMode(movieId, modeId) {
    const movieQuestions = questions.filter((question) => question.movieId === movieId);
    const focusedQuestions = modeId === "mixed"
      ? []
      : shuffle(movieQuestions.filter((question) => question.mode === modeId));
    const supportingQuestions = shuffle(movieQuestions.filter((question) =>
      !focusedQuestions.some((focusedQuestion) => focusedQuestion.id === question.id)
    ));
    return [...focusedQuestions, ...supportingQuestions].slice(0, 8);
  }

  function renderGenres() {
    genreGrid.replaceChildren(...genres.map((genre) => {
      const count = movies.filter((movie) => movie.genre === genre.id).length;
      const card = document.createElement("button");
      card.className = "genre-card";
      card.type = "button";
      card.style.setProperty("--genre-color", genre.color);
      card.setAttribute("aria-label", `${genre.name}, ${count} movies. ${genre.description}`);
      card.innerHTML = `
        <span class="genre-topline">
          <span class="genre-icon" aria-hidden="true">${genre.icon}</span>
          <span class="genre-arrow" aria-hidden="true">↗</span>
        </span>
        <span>
          <span class="genre-name">${genre.name}</span>
          <span class="genre-count">${count} MOVIES <span aria-hidden="true">·</span> ${genre.description}</span>
        </span>
      `;
      card.addEventListener("click", () => {
        gameState.selectedGenre = genre.id;
        gameState.selectedMovie = null;
        gameState.selectedMode = null;
        renderMovies();
        showScreen("movies");
      });
      return card;
    }));
  }

  function renderMovies() {
    const genre = genres.find((item) => item.id === gameState.selectedGenre);
    if (!genre) {
      showScreen("genres");
      return;
    }

    const genreMovies = movies.filter((movie) => movie.genre === genre.id);
    selectedGenreName.textContent = genre.name.toUpperCase();
    movieCount.textContent = `${genreMovies.length} FILMS IN THE LINEUP`;
    if (genreMovies.length === 0) {
      const emptyState = document.createElement("p");
      emptyState.className = "empty-state";
      emptyState.textContent = "No movies are available in this genre yet. Choose another genre to keep playing.";
      movieGrid.replaceChildren(emptyState);
      showNotice("There are no movies in this genre yet.");
      return;
    }
    const savedProgress = Storage.getProgress();
    movieGrid.replaceChildren(...genreMovies.map((movie) => {
      const movieProgress = savedProgress[movie.id];
      const mastery = movieProgress && movieProgress.mastery !== null && Number.isFinite(Number(movieProgress.mastery))
        ? Math.max(0, Math.min(100, Number(movieProgress.mastery)))
        : null;
      const card = document.createElement("article");
      card.className = "movie-card";
      card.style.setProperty("--movie-color", genre.color);
      const masteryLabel = mastery === null
        ? "Not played yet"
        : `Mastery <strong>${Math.round(mastery)}%</strong> · Best score ${readCount(movieProgress.bestScore).toLocaleString()}`;
      card.innerHTML = `
        <div class="movie-art" role="img" aria-label="Stylized ${movie.title} title artwork">
          <span class="movie-art-title">${movie.title}</span>
        </div>
        <div class="movie-content">
          <div class="movie-meta">
            <span>${movie.year} <span aria-hidden="true">·</span> ${genre.name}</span>
            <span class="difficulty">${movie.difficulty}</span>
          </div>
          <p class="movie-description">${movie.description}</p>
          <p class="mastery">${masteryLabel}</p>
          <button class="button movie-play" type="button" data-movie-id="${movie.id}">
            CHOOSE MOVIE <span aria-hidden="true">↗</span>
          </button>
        </div>
      `;
      card.querySelector("[data-movie-id]").addEventListener("click", () => {
        gameState.selectedMovie = movie.id;
        gameState.selectedMode = null;
        renderModes();
        showScreen("modes");
      });
      return card;
    }));
  }

  function renderModes() {
    const movie = movies.find((item) => item.id === gameState.selectedMovie);
    if (!movie) {
      showScreen("movies");
      return;
    }
    modeMovieTitle.textContent = `${movie.title} · ${movie.year}`;
    modeGrid.replaceChildren(...modes.map((mode) => {
      const count = Math.min(8, questions.filter((question) => question.movieId === movie.id).length);
      const card = document.createElement("button");
      card.className = "mode-card";
      card.type = "button";
      card.disabled = count < 8;
      card.setAttribute("aria-label", card.disabled
        ? `${mode.name}: unavailable, this movie needs eight questions for a complete round`
        : `${mode.name}, eight-question round. ${mode.description}`);
      card.innerHTML = `
        <span class="mode-icon" aria-hidden="true">${mode.icon}</span>
        <span><strong>${mode.name}</strong><small>${mode.description}</small></span>
        <span class="mode-play">${card.disabled ? "UNAVAILABLE" : "8-QUESTION ROUND"} <b aria-hidden="true">${card.disabled ? "—" : "↗"}</b></span>
      `;
      card.addEventListener("click", () => {
        gameState.selectedMode = mode.id;
        beginQuiz();
      });
      return card;
    }));
  }

  function beginQuiz() {
    const movie = movies.find((item) => item.id === gameState.selectedMovie);
    const selectedQuestions = movie && getQuestionsForMode(movie.id, gameState.selectedMode);
    if (!movie || !selectedQuestions || selectedQuestions.length !== 8) {
      console.error("Cannot start quiz: selected movie or question set is unavailable.");
      showNotice("This movie does not have enough questions for an eight-question round yet.");
      return;
    }

    stopQuestionTimers();
    gameState.questions = selectedQuestions;
    gameState.currentQuestionIndex = 0;
    gameState.score = 0;
    gameState.streak = 0;
    gameState.maxStreak = 0;
    gameState.correctAnswers = 0;
    gameState.incorrectAnswers = 0;
    gameState.timeBonus = 0;
    gameState.timeRemaining = QUESTION_TIME_SECONDS;
    gameState.gameStarted = true;
    gameState.gameCompleted = false;
    gameState.answerLocked = false;
    quizMovieTitle.textContent = `${movie.title} · ${movie.year}`;
    quizScore.textContent = "0";
    streakValue.textContent = "0";
    currentStreak.textContent = "No active streak";
    quizQuestionPanel.hidden = false;
    renderQuestion();
    showScreen("quiz");
    questionPrompt.focus({ preventScroll: true });
  }

  function stopQuestionTimers() {
    clearTimeout(answerAdvanceTimer);
    clearInterval(countdownTimer);
    answerAdvanceTimer = null;
    countdownTimer = null;
  }

  function startQuestionTimer() {
    clearInterval(countdownTimer);
    gameState.questionStartTime = Date.now();
    gameState.timeRemaining = QUESTION_TIME_SECONDS;
    timerPanel.classList.remove("is-urgent");
    updateTimerDisplay();
    countdownTimer = window.setInterval(() => {
      const elapsedSeconds = (Date.now() - gameState.questionStartTime) / 1000;
      gameState.timeRemaining = Math.max(0, QUESTION_TIME_SECONDS - elapsedSeconds);
      updateTimerDisplay();
      if (gameState.timeRemaining <= 0) resolveAnswer(null, true);
    }, 100);
  }

  function updateTimerDisplay() {
    const remaining = Math.ceil(gameState.timeRemaining);
    timerValue.textContent = String(remaining);
    timerProgress.value = gameState.timeRemaining;
    timerPanel.classList.toggle("is-urgent", remaining <= 5);
  }

  function renderQuestion() {
    const question = gameState.questions[gameState.currentQuestionIndex];
    if (!question) {
      finishQuiz();
      return;
    }

    const questionCount = gameState.questions.length;
    questionNumber.textContent = `QUESTION ${String(gameState.currentQuestionIndex + 1).padStart(2, "0")} / ${String(questionCount).padStart(2, "0")}`;
    questionModeLabel.textContent = modeLabels[question.mode] || "MIXED";
    questionProgress.max = questionCount;
    questionProgress.value = gameState.currentQuestionIndex + 1;
    questionType.textContent = question.type === "true-false" ? "TRUE OR FALSE" : "MULTIPLE CHOICE";
    questionPrompt.textContent = question.question;
    screenAnnouncement.textContent = `Question ${gameState.currentQuestionIndex + 1} of ${questionCount}. ${question.question}`;
    answerFeedback.hidden = true;
    gameState.answerLocked = false;

    const shuffledAnswers = shuffle(question.answers);
    answerGrid.replaceChildren(...shuffledAnswers.map((answer, index) => {
      const button = document.createElement("button");
      button.className = "answer-option";
      button.type = "button";
      button.dataset.answerId = answer.id;
      button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span class="answer-text"></span>`;
      button.querySelector(".answer-text").textContent = answer.text;
      button.addEventListener("click", () => resolveAnswer(answer.id, false));
      return button;
    }));
    startQuestionTimer();
    if (!quizScreen.hidden) questionPrompt.focus({ preventScroll: true });
  }

  function getStreakMultiplier(streak) {
    if (streak >= 7) return 2;
    if (streak >= 5) return 1.5;
    if (streak >= 3) return 1.25;
    return 1;
  }

  function getDifficultyMultiplier(difficulty) {
    return ({ easy: 1, medium: 1.5, hard: 2, expert: 3 })[difficulty.toLowerCase()] || 1;
  }

  function calculateScore(question, timeRemaining, streak) {
    const base = BASE_POINTS * getDifficultyMultiplier(question.difficulty || "easy");
    const speedBonus = timeRemaining >= 10 ? 50 : timeRemaining >= 7 ? 25 : 0;
    return {
      points: Math.round((base + speedBonus) * getStreakMultiplier(streak)),
      speedBonus
    };
  }

  function animateScore(points) {
    scoreValue.classList.remove("score-value-pop");
    scorePop.classList.remove("score-bonus-pop");
    void scoreValue.offsetWidth;
    scoreValue.classList.add("score-value-pop");
    scorePop.textContent = `+${points}`;
    scorePop.classList.add("score-bonus-pop");
  }

  function resolveAnswer(answerId, timedOut) {
    if (gameState.answerLocked || gameState.gameCompleted) return;
    const question = gameState.questions[gameState.currentQuestionIndex];
    const selectedAnswer = answerId === null
      ? null
      : question && question.answers.find((answer) => answer.id === answerId);
    if (!question || (answerId !== null && !selectedAnswer)) {
      console.error("Cannot evaluate answer: question or selected answer is unavailable.");
      showNotice("The answer could not be checked. Please try continuing or restart the quiz.");
      return;
    }

    gameState.answerLocked = true;
    clearInterval(countdownTimer);
    countdownTimer = null;
    const isCorrect = Boolean(selectedAnswer && selectedAnswer.id === question.correctAnswer);
    const correctAnswer = question.answers.find((answer) => answer.id === question.correctAnswer);
    let pointsEarned = 0;
    let speedBonus = 0;
    if (isCorrect) {
      gameState.correctAnswers += 1;
      gameState.streak += 1;
      gameState.maxStreak = Math.max(gameState.maxStreak, gameState.streak);
      const scoreAward = calculateScore(question, gameState.timeRemaining, gameState.streak);
      pointsEarned = scoreAward.points;
      speedBonus = scoreAward.speedBonus;
      gameState.score += pointsEarned;
      gameState.timeBonus += speedBonus;
      quizScore.textContent = gameState.score.toLocaleString();
      streakValue.textContent = String(gameState.maxStreak);
      currentStreak.textContent = `🔥 ${gameState.streak} ${gameState.streak === 1 ? "ANSWER" : "ANSWERS"} · ×${getStreakMultiplier(gameState.streak)}`;
      animateScore(pointsEarned);
    } else {
      gameState.incorrectAnswers += 1;
      gameState.streak = 0;
      currentStreak.textContent = "Streak ended";
    }

    answerGrid.querySelectorAll(".answer-option").forEach((button) => {
      const isAnswer = button.dataset.answerId === question.correctAnswer;
      const isSelected = selectedAnswer && button.dataset.answerId === selectedAnswer.id;
      button.disabled = true;
      if (isAnswer) button.classList.add("answer-correct");
      if (isSelected && !isCorrect) button.classList.add("answer-incorrect");
    });

    feedbackTitle.textContent = timedOut
      ? "TIME'S UP"
      : isCorrect
        ? `CORRECT  +${pointsEarned}`
        : "NOT QUITE";
    feedbackExplanation.textContent = isCorrect
      ? `${question.explanation}${speedBonus ? ` +${speedBonus} speed bonus.` : ""}`
      : `Correct answer: ${correctAnswer.text}. ${question.explanation}`;
    answerFeedback.classList.toggle("is-incorrect", !isCorrect);
    answerFeedback.hidden = false;
    screenAnnouncement.textContent = timedOut
      ? `Time is up. ${feedbackExplanation.textContent}`
      : `${isCorrect ? "Correct" : "Incorrect"}. ${feedbackExplanation.textContent}`;
    answerFeedback.querySelector("button").focus({ preventScroll: true });
    clearTimeout(answerAdvanceTimer);
    answerAdvanceTimer = window.setTimeout(advanceQuestion, ANSWER_FEEDBACK_DELAY);
  }

  function advanceQuestion() {
    clearTimeout(answerAdvanceTimer);
    answerAdvanceTimer = null;
    if (!gameState.answerLocked || gameState.gameCompleted) return;
    gameState.currentQuestionIndex += 1;
    if (gameState.currentQuestionIndex >= gameState.questions.length) {
      finishQuiz();
      return;
    }
    renderQuestion();
  }

  function readCount(value) {
    const count = Number(value);
    return Number.isFinite(count) && count >= 0 ? Math.floor(count) : 0;
  }

  function getAccuracy(correct, total) {
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  }

  function saveCompletedGame() {
    const progress = Storage.getProgress();
    const previous = progress[gameState.selectedMovie] || {};
    const totalAnswered = readCount(previous.questionsAnswered) + gameState.questions.length;
    const totalCorrect = readCount(previous.questionsCorrect) + gameState.correctAnswers;
    const mastery = Math.max(0, Math.min(100, getAccuracy(totalCorrect, totalAnswered)));
    const movieRecord = {
      gamesPlayed: readCount(previous.gamesPlayed) + 1,
      bestScore: Math.max(readCount(previous.bestScore), gameState.score),
      bestStreak: Math.max(readCount(previous.bestStreak), gameState.maxStreak),
      questionsAnswered: totalAnswered,
      questionsCorrect: totalCorrect,
      mastery
    };
    progress[gameState.selectedMovie] = movieRecord;
    const newHighScore = gameState.score > Storage.getHighScore();
    let saved = Storage.saveProgress(progress);
    if (newHighScore) {
      saved = Storage.saveHighScore(gameState.score) && saved;
    }
    return { movieRecord, newHighScore, saved };
  }

  function finishQuiz() {
    if (gameState.gameCompleted) return;
    stopQuestionTimers();
    gameState.gameCompleted = true;
    gameState.gameStarted = false;
    gameState.answerLocked = true;
    const movie = movies.find((item) => item.id === gameState.selectedMovie);
    if (!movie) {
      console.error("Cannot show results: selected movie is unavailable.");
      showNotice("The movie for this result could not be found.");
      return;
    }
    const result = saveCompletedGame();
    const accuracy = getAccuracy(gameState.correctAnswers, gameState.questions.length);
    const rating = accuracy >= 90 ? "LEGENDARY!" : accuracy >= 70 ? "EXCELLENT!" : accuracy >= 50 ? "NICE RUN!" : "KEEP PRACTICING!";
    homeHighScore.textContent = getBestScore().toLocaleString();
    document.querySelector("#results-movie-title").textContent = `${movie.title} · ${movie.year}`;
    document.querySelector("#results-score").textContent = gameState.score.toLocaleString();
    document.querySelector("#results-rating").textContent = rating;
    document.querySelector("#results-accuracy").textContent = `${accuracy}%`;
    document.querySelector("#results-correct").textContent = `${gameState.correctAnswers} / ${gameState.questions.length}`;
    document.querySelector("#results-streak").textContent = String(gameState.maxStreak);
    document.querySelector("#results-time-bonus").textContent = `+${gameState.timeBonus}`;
    document.querySelector("#results-mastery-value").textContent = `${result.movieRecord.mastery}%`;
    document.querySelector("#results-mastery-progress").value = result.movieRecord.mastery;
    document.querySelector("#results-mastery-record").textContent = `${result.movieRecord.gamesPlayed} ${result.movieRecord.gamesPlayed === 1 ? "GAME" : "GAMES"} PLAYED`;
    document.querySelector("#results-mastery-copy").textContent = `${result.movieRecord.questionsCorrect} correct answers across ${result.movieRecord.questionsAnswered} questions. Best score: ${result.movieRecord.bestScore.toLocaleString()}.`;
    recordBanner.hidden = !result.newHighScore;
    if (result.newHighScore) {
      recordBanner.classList.remove("record-celebrate");
      void recordBanner.offsetWidth;
      recordBanner.classList.add("record-celebrate");
    }
    if (!result.saved) {
      screenAnnouncement.textContent = "Quiz complete, but your progress could not be saved.";
    }
    showScreen("results");
    if (!result.saved) showNotice("Quiz complete. Browser storage was unavailable, so this result was not saved.");
  }

  function renderMastery() {
    const movie = movies.find((item) => item.id === gameState.selectedMovie);
    if (!movie) {
      showNotice("Select a movie before viewing its mastery.");
      showScreen("movies");
      return;
    }
    const record = Storage.getProgress()[movie.id] || {};
    const answered = readCount(record.questionsAnswered);
    const correct = readCount(record.questionsCorrect);
    const mastery = Math.max(0, Math.min(100, Number(record.mastery) || 0));
    document.querySelector("#mastery-movie-title").textContent = `${movie.title} · ${movie.year}`;
    document.querySelector("#mastery-percentage").textContent = `${mastery}%`;
    document.querySelector("#mastery-progress").value = mastery;
    document.querySelector("#mastery-games").textContent = String(readCount(record.gamesPlayed));
    document.querySelector("#mastery-best-score").textContent = readCount(record.bestScore).toLocaleString();
    document.querySelector("#mastery-best-streak").textContent = String(readCount(record.bestStreak));
    document.querySelector("#mastery-accuracy").textContent = `${getAccuracy(correct, answered)}%`;
    document.querySelector("#mastery-answered").textContent = String(answered);
    document.querySelector("#mastery-correct").textContent = String(correct);
    showScreen("mastery");
  }

  function resetProgress() {
    if (!window.confirm("Are you sure? This will erase all movie progress and scores.")) return;
    if (!Storage.reset()) return;
    homeHighScore.textContent = "0";
    if (!document.querySelector("#movies").hidden) renderMovies();
    showNotice("All movie progress and scores have been reset.");
  }

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]");
    if (!action) return;

    switch (action.dataset.action) {
      case "play":
        renderGenres();
        showScreen("genres");
        break;
      case "home":
        gameState.selectedGenre = null;
        gameState.selectedMovie = null;
        gameState.selectedMode = null;
        showScreen("home");
        break;
      case "back-to-genres":
        gameState.selectedMovie = null;
        gameState.selectedMode = null;
        renderGenres();
        showScreen("genres");
        break;
      case "back-to-movies":
        gameState.selectedMode = null;
        renderMovies();
        showScreen("movies");
        break;
      case "continue":
        advanceQuestion();
        break;
      case "replay-quiz":
        beginQuiz();
        break;
      case "show-mastery":
        renderMastery();
        break;
      case "back-to-results":
        showScreen("results");
        break;
      case "reset-progress":
        resetProgress();
        break;
      default:
        break;
    }
  });

  document.querySelectorAll("[data-screen-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      gameState.selectedGenre = null;
      gameState.selectedMovie = null;
      gameState.selectedMode = null;
      showScreen(link.dataset.screenLink);
    });
  });

  homeHighScore.textContent = getBestScore().toLocaleString();
})();
