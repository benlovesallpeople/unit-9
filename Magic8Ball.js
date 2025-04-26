let answers = [];
let currentAnswer = "";
let isShaking = false;
let shakeIntensity = 0;
let ballSize = 300;

function preload() {
  answers = [
    { text: "It is certain.", color: [34, 197, 94] }, 
    { text: "It is decidedly so.", color: [99, 102, 241] }, 
    { text: "Without a doubt.", color: [236, 72, 153] }, 
    { text: "Yes - definitely!", color: [249, 115, 22] }, 
    { text: "You may rely on it.", color: [234, 179, 8] }, 
    { text: "As I see it, yes.", color: [6, 182, 212] }, 
    { text: "Most likely...", color: [139, 92, 246] }, 
    { text: "Outlook... good!", color: [22, 163, 74] }, 
    { text: "Signs point to yes.", color: [5, 150, 105] }, 
    { text: "Reply hazy, try again...", color: [148, 163, 184] }, 
    { text: "Ask again later.", color: [156, 163, 175] }, 
    { text: "Better not tell you now!", color: [113, 128, 150] }, 
    { text: "I have no idea...", color: [100, 116, 139] }, 
    { text: "Think about what you just said... and ask again.", color: [71, 85, 105] }, 
    { text: "Don't count on it.", color: [220, 38, 38] }, 
    { text: "My reply is: no!", color: [239, 68, 68] }, 
    { text: "My sources say 'no dice'.", color: [185, 28, 28] },
    { text: "Outlook... not so good.", color: [225, 29, 72] }, 
    { text: "Indubitably.", color: [190, 18, 60] } 
  ];
}

function setup() {
  createCanvas(400, 500);
  textAlign(CENTER, CENTER);
  textFont('Arial');
  noStroke();
}

function draw() {
  background(10, 10, 30);
  
  // Handle shaking animation
  if (isShaking) {
    shakeIntensity = constrain(shakeIntensity + 0.2, 0, 15);
    translate(random(-shakeIntensity, shakeIntensity), random(-shakeIntensity, shakeIntensity));
  } else if (shakeIntensity > 0) {
    shakeIntensity = max(shakeIntensity - 0.5, 0);
  }

  drawEightBall(width/2, height/2 - 30);

  if (!isShaking && currentAnswer !== "") {
    displayAnswer();
  }
}

function drawEightBall(x, y) {

  fill(5, 5, 15);
  ellipse(x, y, ballSize, ballSize);
  
  for (let i = 0; i < 5; i++) {
    fill(0, 0, 120 - i*20, 200 - i*40);
    ellipse(x, y, ballSize - i*20, ballSize - i*20);
  }
  fill(245);
  ellipse(x, y, ballSize * 0.6, ballSize * 0.6);
  fill(0);
  textSize(100);
  textStyle(BOLD);
  text("8", x, y - 10);
  fill(255, 255, 255, 60);
  arc(x, y, ballSize * 0.9, ballSize * 0.9, -PI/4, PI/4);
}

function displayAnswer() {
  let answerObj = answers.find(a => a.text === currentAnswer);
  if (answerObj) {
    fill(answerObj.color);
    textSize(20);
    textStyle(BOLD);

    if (currentAnswer.includes("yes") || currentAnswer.includes("certain")) {
      textSize(24);
      textStyle(BOLD);
    } else if (currentAnswer.includes("no") || currentAnswer.includes("doubt")) {
      textSize(22);
      textStyle(ITALIC);
    }
    
    textWrap(WORD);
    text(currentAnswer, width/5, height/2 + 180, ballSize * 0.8);
  }
}

function mousePressed() {
  isShaking = true;
  currentAnswer = "";
}

function mouseReleased() {
  if (isShaking) {
    isShaking = false;
    let randomIndex = floor(random(0, answers.length));
    currentAnswer = answers[randomIndex].text;
  }
}

function mouseDragged() {
  shakeIntensity = min(dist(pmouseX, pmouseY, mouseX, mouseY), 20);
  return false;
}