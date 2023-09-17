const canvas = document.querySelector(".Game");
let ctx = canvas.getContext("2d");

 
let ballRadius = 9;
let x = canvas.width /(Math.floor(Math.random() * Math.random() * 10 ) + 3);
let y = canvas.height - 40;
let Px = 2,Py =-2;

let padHeight = 10;
let padwidth = 80;

let block = [];

//시작 하는 지점  - 시발점.
let padStart = (canvas.width - padwidth)/2; 

//블럭들
let blockWidth = 50, 
  blockheight = 18, 
  blockPadding = 12 ,
  col = 9 , row = 5, 
  topOffSet = 40,leftOffSet = 33, 
  score = 0; 

//초기화
for(let i = 0 ; i < col ; i++) {
  block[i] = [];
  for(let j = 0; j < row ; j++ ){
    block[i][j] = {x : 0, y : 0 , st : 1}
  }
}

const mouseHandler = (e) => {
  let relativeX = e.clintX - canvas.leftOffSet;
  if(relativeX > 0 && relativeX < canvas.width){
    Px = relativeX - padwidth / 2;
  }
};

const padDraw =  () => {
  ctx.beginPath();
  ctx.roundRect(Px , canvas.height - padHeight , padwidth , padHeight , 30);
  ctx.fillStyle = '#333';
  ctx.fill();
  ctx.closePath();
};

const drawBall = () => {
  ctx.deginPath();
  ctx.arc(x , y , ballRadius , 0 , Math.PI * 2);
  ctx.fillStyle = '#333';
  ctx.fill();
  ctx.closePath();
};

const drawBlock = () => {
  for(let i = 0; i < col ; i++){
    for(let j = 0; j < row; j++){
      if(block[i][j].status === 1){
        let blockX = (i* (blockWidth + blockPadding)) + leftOffSet;
        let blockY = (j* (blockheight + blockPadding)) + topOffSet;
        block[i][j].x = blockX;
        block[i][j].y = blockY;

        ctx.beginPath();
        ctx.roundRect(blockX , blockY , blockWidth , blockheight , 30);
        ctx.fillStyle = '#333';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

const Score = () => {
  ctx.font = 'bold 16px sans-serif';
  ctx.fillStyle = '#333';
  ctx.fillText('Score : ' + score , 8, 24);
};

const hitBlock = () => {
  for(let i =0 ;i < col ; i ++){
    for(let j = 0 ; j < row ; j++){
      let b = block[i][j];
      if(b.status === 1){
        if(x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockheight){
          dy = -dy;
          b.status = 0;
          score++;
          if(score === rowCount * col){
            alert('You Win');
            document.location.reload();
          }
        }
      }
    }
  }
};

document.addEventListener("mousemove", mouseHandler, false);