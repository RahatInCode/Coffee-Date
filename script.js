const balloonContainer = document.getElementById('balloon-container');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
let score = 0;
let gameInterval;

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  
  // Randomize balloon position and speed
  balloon.style.left = `${Math.random() * 350}px`;
  balloon.style.backgroundColor = getRandomColor();
  let speed = Math.random() * 3 + 2;

  balloonContainer.appendChild(balloon);

  let balloonMove = setInterval(() => {
    let currentTop = parseFloat(balloon.style.top || 600);
    if (currentTop <= -70) {
      balloon.remove();
      clearInterval(balloonMove);
    } else {
      balloon.style.top = `${currentTop - speed}px`;
    }
  }, 20);

  balloon.addEventListener('click', () => {
    balloon.remove();
    clearInterval(balloonMove);
    increaseScore();
  });
}

function getRandomColor() {
  const colors = ['#FF6347', '#FFD700', '#ADFF2F', '#20B2AA', '#FF69B4'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function increaseScore() {
  score++;
  scoreDisplay.textContent = score;
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  gameInterval = setInterval(createBalloon, 1000);

  // Stop game after 30 seconds
  setTimeout(() => {
    clearInterval(gameInterval);
    alert(`Game Over! Your final score is ${score}`);
  }, 30000);
}

startBtn.addEventListener('click', startGame);

