let currentProblem = null;

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date-display").textContent = today;

  fetch("problems.json")
    .then((res) => res.json())
    .then((data) => {
      if (data[today]) {
        currentProblem = data[today];
        displayProblem(currentProblem);
      } else {
        document.getElementById("question-text").textContent =
          "No problem scheduled for today. Check back tomorrow!";
      }
    })
    .catch((err) => {
      console.error("Error loading problem:", err);
      document.getElementById("question-text").textContent =
        "Failed to load today's problem.";
    });
});

function displayProblem(problem) {
  document.getElementById("topic-badge").textContent = problem.topic || "SEAMO Grade 7";
  document.getElementById("question-text").innerHTML = problem.question;
  document.getElementById("hint-box").innerHTML = problem.hint;
  document.getElementById("solution-box").innerHTML = problem.solution;

  renderMathInElement(document.body, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
  });
}

function checkAnswer() {
  if (!currentProblem) return;

  const userAns = document.getElementById("user-answer").value.trim();
  const feedback = document.getElementById("feedback");
  const solutionBtn = document.getElementById("solution-btn");

  if (userAns === currentProblem.answer) {
    feedback.textContent = "Correct! Great job.";
    feedback.className = "correct";
    solutionBtn.classList.remove("hidden");
  } else {
    feedback.textContent = "Incorrect. Try again!";
    feedback.className = "incorrect";
    solutionBtn.classList.remove("hidden");
  }
}

function toggleHint() {
  document.getElementById("hint-box").classList.toggle("hidden");
}

function toggleSolution() {
  document.getElementById("solution-box").classList.toggle("hidden");
}
