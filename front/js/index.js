const canvas = document.querySelector(".Game");
let ctx = canvas.getContext("2d");  
let ballRadius = 9;
let x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3);
let y = canvas.height - 40;
let Px = 2, Py = -2;

let padHeight = 10;
let padwidth = 80;

let block = [];

// 마우스 위치 - 시작점.
let padX = (canvas.width - padwidth) / 2; 

// 블럭들
let blockWidth = 54,
  blockheight = 18,
  blockPadding = 12,
  col = 9, row = 5, 
  topOffSet = 40, leftOffSet = 33,
  score = 0;

// 초기화
for (let i = 0; i < col; i++) {
  block[i] = [];
  for (let j = 0; j < row; j++) {
    block[i][j] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("mousemove", mouseHandler, false);

function mouseHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    padX = relativeX - padwidth / 2;
  }
  console.log('mouse is moving');
}

function padDraw() {
  ctx.beginPath();
  ctx.rect(padX, canvas.height - padHeight, padwidth, padHeight);
  ctx.fillStyle = '#333';
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#333';
  ctx.fill();
  ctx.closePath();
}

function drawBlock() {
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (block[i][j].status === 1) {
        let blockX = i * (blockWidth + blockPadding) + leftOffSet;
        let blockY = j * (blockheight + blockPadding) + topOffSet;
        block[i][j].x = blockX;
        block[i][j].y = blockY;

        ctx.beginPath();
        ctx.rect(blockX, blockY, blockWidth, blockheight);
        ctx.fillStyle = '#333';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function Score() {
  ctx.font = 'bold 16px sans-serif';
  ctx.fillStyle = '#333';
  ctx.fillText('개수 : ' + score, 8, 24);
}

function hitBlock() {
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      let b = block[i][j];
      if (b.status === 1) {
        if (x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockheight) {
          Py = -Py;
          b.status = 0;
          score++;
          if (score === row * col) {
            alert('짝짝짝');
            document.location.reload();
          }
        }
      }
    }
  }
}

// Main
function init() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Score();
  drawBlock();
  drawBall();
  padDraw();
  hitBlock();

  if (x + Px > canvas.width - ballRadius || x + Px < ballRadius) {
    Px = -Px;
  }

  if (y + Py < ballRadius) {
    Py = -Py;
  } else if (y + Py > canvas.height - ballRadius) {
    if (x > padX && x < padX + padwidth) {
      Py = -Py;
    } else {
      alert("아쉬워요");
      document.location.reload();
    }
  }

  // bottom wall
  if (y + Py > canvas.height - ballRadius || y + Py < ballRadius) {
    Py = -Py;
  }

  // move
  x += Px + 0.1;
  y += Py + 0.03;
}

setInterval(init, 5);