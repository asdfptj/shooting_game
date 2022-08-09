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
        delete keysDown[event.keyCode]
        console.log("버튼 클릭 후", keysDown);
    });
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
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

function main() {
    update(); //좌표값을 업데이트하고
    render()  //그려주고
    requestAnimationFrame(main)
}

loadImage();
setupkeyboardListener();
main();