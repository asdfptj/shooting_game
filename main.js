// 캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

// 우주선 좌표
let spaceshipX = canvas.width / 2 - 32
let spaceshipY = canvas.height - 64

let bulletList = [] //총알들을 저장하는 리스트
function Bullet() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.x = spaceshipX + 18;
        this.y = spaceshipY - 15;

        bulletList.push(this);
    };
    this.update = function () {
        this.y -= 7
    }
}


function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "images/background.jpg"

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png"

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png"

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png"

    gameOverImage = new Image();
    gameOverImage.src = "images/gameover.gif"
}

let keysDown = {};
function setupkeyboardListener() {
    document.addEventListener("keydown", function (event) {
        keysDown[event.keyCode] = true;
        console.log("키다운객체에 들어간 값은?", keysDown);

    });
    document.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];

        if (event.keyCode == 32) {
            createBullet();  // 총알 생성
        }
    });
}

function createBullet() {
    console.log("총알 생성!");
    let b = new Bullet(); // 총알 하나 생성
    b.init();
    console.log("새로운 총알 리스트", bulletList);
}

function update() {
    if (39 in keysDown) {
        spaceshipX += 5 //우주선의 속도
    }  // right
    if (37 in keysDown) {
        spaceshipX -= 5
    }  //left

    if (spaceshipX <= 0) {
        spaceshipX = 0
    }
    if (spaceshipX >= canvas.width - 64) {
        spaceshipX = canvas.width - 64;
    }
    // 우주선의 좌표

    // 총알의 y좌표 업데이트하는 함수 호출
    for (let i = 0; i < bulletList.length; i++) {
        bulletList[i].update();
    }
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

    for (let i = 0; i < bulletList.length; i++) {
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
}

function main() {
    update(); //좌표값을 업데이트하고
    render()  //그려주고
    requestAnimationFrame(main)
}

loadImage();
setupkeyboardListener();
main();

// 방향키를 누르면
// 우주선의 xy좌표가 바뀌고
// 다시 render 그려준다

// 총알만들기
// 1. 스페이스바를 누르면 총알 발사
// 2. 총알이 발사 = 총알의 y값이 -- , 총알의 x값은? 스페이스를 누른 순간의 우주선
// 3. 발사된 총알들은 배열에 저장을 한다
// 4. 총알들은 x,y좌표값이 있어야 한다.
// 5. 총알 배열을 가지고 render 그려준다.