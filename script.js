let roundsPlayed = 0;
let wins = 0;
let losses = 0;
let draws = 0;

const moveHistory = { rock: 0, paper: 0, scissors: 0 };

function cpuMove() {
  // Pattern-based: counter the most-used player move
  const mostUsed = Object.keys(moveHistory)
    .reduce((a, b) => moveHistory[a] > moveHistory[b] ? a : b);

  if (mostUsed === "rock") return "paper";
  if (mostUsed === "paper") return "scissors";
  if (mostUsed === "scissors") return "rock";

  return "rock";
}

function play(player) {
  if (roundsPlayed >= 5) return;

  moveHistory[player]++;
  const cpu = cpuMove();
  roundsPlayed++;

  let result = "";

  if (player === cpu) {
    draws++;
    result = "Draw";
  } else if (
    (player === "rock" && cpu === "scissors") ||
    (player === "paper" && cpu === "rock") ||
    (player === "scissors" && cpu === "paper")
  ) {
    wins++;
    result = "You Win";
  } else {
    losses++;
    result = "You Lose";
  }

  updateUI(player, cpu, result);

  if (roundsPlayed === 5) {
    endTournament();
  }
}

function updateUI(player, cpu, result) {
  document.getElementById("roundInfo").textContent =
    `You: ${player} | CPU: ${cpu} → ${result}`;

  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;
  document.getElementById("draws").textContent = draws;
}

function endTournament() {
  let message = "Tournament Draw!";
  if (wins > losses) message = "🏆 You Win the Tournament!";
  else if (losses > wins) message = "💀 CPU Wins the Tournament!";

  setTimeout(() => alert(message), 200);
}