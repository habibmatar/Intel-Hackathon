// Early Literacy Development Game JS File

// ---------- Text-2-Speech ----------

meSpeak.loadConfig("mespeak_config.json");
meSpeak.loadVoice("en-us.json");

// ---------- Prepare Canvas ----------

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 500;
document.body.appendChild(canvas);

// ---------- Load Images ----------

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
	heroReady = true;
}
heroImage.src="https://raw.github.com/ashishdatta/website/master/img/hero.png";

var bgReady = false;
var bgImage = [
	new Image(),
	new Image(),
	new Image(),
	new Image(),
	new Image(),
	new Image()
];
bgImage[0].onload = function() {
	bgReady = true;
}
bgImage[0].src = "/hackathon/background.png";
bgImage[1].src = "/hackathon/barn.png";
bgImage[2].src = "/hackathon/shed.png";
bgImage[3].src = "/hackathon/doge_park.png";
bgImage[4].src = "/hackathon/telescope.png";
bgImage[5].src = "/hackathon/finale.png";

var cowImage = new Image();
cowImage.src="/hackathon/riding_cow.png";

// ---------- Mouse Move & Click Listeners ----------

var mouse = {
	x: 0,
	y: 0,
	on: true
};

var click = {
	x: 400,
	y: 330,
	on: false
};

canvas.addEventListener('mousemove', function(event) {
	mouse.x = event.offsetX || event.layerX;
	mouse.y = event.offsetY || event.layerY;
}, false);

canvas.addEventListener('click', function(event) {
	click.x = event.offsetX || event.layerX;
	click.y = event.offsetY || event.layerY;
	click.on = true;
}, false);

// ---------- Variables to keep track of game prgress ----------

var placeNumber = 0;
var wordNumber = 0;     // Current target word
var currentSound = 0;
var onWord = false;     // Show a word scene
var onSentence = false; // Show the sentence scene
var	mClickX = 0;
var	mClickY = 0;
var mClickDis = 0;

var correct0 = 0;
var correct1 = 0;


// ---------- Lists of words and associated places, tasks, sounds ----------

var sentence = ["Help me take care of the animals in the barn.", "Help me get something from my shed.", "Take my doge to the park.", "Lets look through the telescope.", "Shoot for the stars, go to the moon"];
var wordList = ["Cow", "Jump", "Over", "Moon"];
var placeList = ["", "Barn", "Shed", "Doge Park", "Telescope", "Moon"];
var soundOptions = new Array();
	soundOptions[0] = ["C","M","OW","AT"];
	soundOptions[1] = ["L","UMP","J","AMP"];
	soundOptions[2] = ["ER","ED","OV","ING"];
	soundOptions[3] = ["OON","COO","N","M"];
var soundSounds = new Array();
	soundSounds[0] = ["kuh","muh","auw","at"];
	soundSounds[1] = ["luh","ump","juh","amp"];
	soundSounds[2] = ["er","ed","ove","ing"];
	soundSounds[3] = ["oon","coo","nuh","muh"]
var wordSounds = new Array();
	wordSounds[0] = ["kuh", "auw"];
	wordSounds[1] = ["juh", "ump"];
	wordSounds[2] = ["ove", "er"];
	wordSounds[3] = ["muh", "oon"];

// ---------- Region Operations & Definitions ----------

var Region = function(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.getRegion = function() {
		return [this.x,this.y,this.width,this.height];
	}

	this.inRegion = function(x,y) {
		return (this.x < x && x < this.x + this.width && this.y < y && y < this.y + this.height);
	}

}

var background = new Region(0,0,900,500);
var field = new Region(0,0,900,400);
var helperMeme = new Region(0,300,150,200);
var helperText = new Region(150,400,550,100);
var hoverText = new Region(700, 400, 200, 100);

var mainButton = [
	new Region(190,180,190,140),
	new Region(410,240,110,70),
	new Region(540,250,170,80),
	new Region(760,250,130,150),
	new Region(660,50,110,110)
];

var wordLetter = [
//new Region(x, y, width, heigth)
	new Region(220,50,100,80),
	new Region(340,50,100,80),
	new Region(460,50,100,80),
	new Region(580,50,100,80)
];

var wordPlace = [
	new Region(220,170,220,100),
	new Region(460,170,220,100)
];

// ---------- Draw the Main Scene ----------

var drawMainScene = function() {

	// Mouse Hover

	if (helperMeme.inRegion(mouse.x,mouse.y)) { //Helper Meme
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak("I'm farmer Joe, I'm here to help you learn to build new words!", {speed: 150, wordgap: 5});
		}
	}
	else if (helperText.inRegion(mouse.x,mouse.y)) { //Helper Text
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak(sentence[wordNumber], {speed: 150, wordgap: 5});
		}
	}
	else if (mainButton[0].inRegion(mouse.x,mouse.y)) { //Barn
		placeNumber = 1;
		canvas.style.cursor = "pointer";
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak(placeList[1], {speed: 150, wordgap: 5});
		}
	}
	else if (mainButton[1].inRegion(mouse.x,mouse.y)) { //Shed
		placeNumber = 2;
		canvas.style.cursor = "pointer";
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak(placeList[2], {speed: 150, wordgap: 5});
		}
	}
	else if (mainButton[2].inRegion(mouse.x,mouse.y)) { //Dog Park
		placeNumber = 3;
		canvas.style.cursor = "pointer";
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak(placeList[3], {speed: 150, wordgap: 5});
		}
	}
	else if (mainButton[3].inRegion(mouse.x,mouse.y)) { //Telescope
		placeNumber = 4;
		canvas.style.cursor = "pointer";
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak(placeList[4], {speed: 150, wordgap: 5});
		}
	}
	else if (mainButton[4].inRegion(mouse.x,mouse.y)) {
		placeNumber = 5;
		canvas.style.cursor = "pointer";
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak(placeList[5], {speed: 150, wordgap: 5});
		};
	}
	else {
		mouse.on = true;
		placeNumber = 0;
		canvas.style.cursor = "default";
	}

	// Handle Clicks

	if (click.on) {
		if (field.inRegion(click.x,click.y)) {
			hero.dx = click.x;
			hero.dy = click.y;
		}
		click.on = false;
	}

	// Handle Collisions

	if (mainButton[0].inRegion(hero.x, hero.y) && mainButton[0].inRegion(click.x, click.y) && wordNumber == 0 ||
		mainButton[1].inRegion(hero.x, hero.y) && mainButton[1].inRegion(click.x, click.y) && wordNumber == 1 ||
		mainButton[2].inRegion(hero.x, hero.y) && mainButton[2].inRegion(click.x, click.y) && wordNumber == 2 ||
		mainButton[3].inRegion(hero.x, hero.y) && mainButton[3].inRegion(click.x, click.y) && wordNumber == 3) {
		onWord = true;
	}
	if (mainButton[4].inRegion(hero.x, hero.y) && mainButton[4].inRegion(click.x, click.y) && wordNumber == 4) {
		onSentence = true;
		mouse.on = true;
		canvas.style.cursor = "default";
	}

	// Draw Stuff

	if(bgReady) {
		ctx.drawImage(bgImage[0],0,0);
	}

//	ctx.fillStyle = "#0000FF";
//	ctx.fillRect.apply(ctx, mainButton[4].getRegion());

	ctx.fillStyle = "#000000";
	ctx.font = "20px Arial";
	ctx.fillText(sentence[wordNumber], 170, 450);
	ctx.fillText(placeList[placeNumber], 720, 450);

	if(heroReady){
		ctx.drawImage(heroImage,hero.x,hero.y);
	}

}

// ---------- Draw a Word Scene ----------

var drawWordScene = function() {

	// Draw Stuff

	ctx.drawImage(bgImage[wordNumber + 1],0,0);

	//Mouse Hover on Letters

	if (helperMeme.inRegion(mouse.x,mouse.y)) { //Helper Meme
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak("I'm farmer Joe, I'm here to help you learn to build new words!", {speed: 150, wordgap: 5});
		}
	}
	else if (helperText.inRegion(mouse.x,mouse.y)) { //Helper Text
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak("Move the word pieces to the empty spaces to build the word " + wordList[wordNumber], {speed: 150, wordgap: 5});
		}
	}
	else if (hoverText.inRegion(mouse.x,mouse.y)) {
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak(wordList[wordNumber] + ". . . . " + 
				wordSounds[wordNumber][0] + ". . . " + 
				wordSounds[wordNumber][1] + ". . . . " + 
				wordList[wordNumber], {speed: 150, wordgap: 5});
		}
	}

	else if (wordLetter[0].inRegion(mouse.x,mouse.y)) { //Box1
		ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
		ctx.fillRect.apply(ctx, wordLetter[0].getRegion());
		canvas.style.cursor = "pointer"
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak(soundSounds[wordNumber][0], {speed: 150, wordgap: 5});
		}
		if (click.on) {
			click.on = false;
			if (currentSound == 1) {
				currentSound = 0;
			}
			else {
				currentSound = 1;
			}
		}

	}
	else if (wordLetter[1].inRegion(mouse.x,mouse.y)) { //Box2
		ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
		ctx.fillRect.apply(ctx, wordLetter[1].getRegion());
		canvas.style.cursor = "pointer"
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak(soundSounds[wordNumber][1], {speed: 150, wordgap: 5});
		}
		if (click.on) {
			click.on = false;
			if (currentSound == 2) {
				currentSound = 0;
			}
			else {
				currentSound = 2;
			}
		}
	}
	else if (wordLetter[2].inRegion(mouse.x,mouse.y)) { //Box3
		ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
		ctx.fillRect.apply(ctx, wordLetter[2].getRegion());
		canvas.style.cursor = "pointer"
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak(soundSounds[wordNumber][2], {speed: 150, wordgap: 5});
		}
		if (click.on) {
			click.on = false;
			if (currentSound == 3) {
				currentSound = 0;
			}
			else {
				currentSound = 3;
			}
		}
	}
	else if (wordLetter[3].inRegion(mouse.x,mouse.y)) { //Box4
		ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
		ctx.fillRect.apply(ctx, wordLetter[3].getRegion());
		canvas.style.cursor = "pointer"
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak(soundSounds[wordNumber][3], {speed: 150, wordgap: 5});
		}
		if (click.on) {
			click.on = false;
			if (currentSound == 4) {
				currentSound = 0;
			}
			else {
				currentSound = 4;
			}
		}
	}
	else if (wordPlace[0].inRegion(mouse.x,mouse.y)) {
		ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
		ctx.fillRect.apply(ctx, wordPlace[0].getRegion());
		canvas.style.cursor = "pointer"
		if (mouse.on) {
			mouse.on = false;
		}
		if (click.on) {
			click.on = false;
			if (currentSound != 0) {
				if (soundSounds[wordNumber][currentSound - 1] == wordSounds[wordNumber][0]) {
					correct0 = currentSound;
					meSpeak.speak("correct!", {speed: 150, wordgap: 5});
				}
				else {
					meSpeak.speak("incorrect", {speed: 150, wordgap: 5});
				}
			}
		}
	}
	else if (wordPlace[1].inRegion(mouse.x,mouse.y)) {
		ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
		ctx.fillRect.apply(ctx, wordPlace[1].getRegion());
		canvas.style.cursor = "pointer"
		if (mouse.on) {
			mouse.on = false;
		}
		if (click.on) {
			click.on = false;
			if (currentSound != 0) {
				if (soundSounds[wordNumber][currentSound - 1] == wordSounds[wordNumber][1]) {
					correct1 = currentSound;
					meSpeak.speak("correct!", {speed: 150, wordgap: 5});
				}
				else {
					meSpeak.speak("incorrect", {speed: 150, wordgap: 5});
				}
			}
		}
	}
	else {
		mouse.on = true;
		canvas.style.cursor = "default";
	}

	ctx.fillStyle = "rgba(255, 255, 255, 0.3)";

	if (currentSound != 0) {
		ctx.fillRect.apply(ctx, wordLetter[currentSound - 1].getRegion());
	}

	//Fill Letters into Boxes
	ctx.fillStyle = "#000000"
	ctx.font = "20px Arial"
	ctx.fillText(soundOptions[wordNumber][0], 250, 100);
	ctx.fillText(soundOptions[wordNumber][1], 370, 100);
	ctx.fillText(soundOptions[wordNumber][2], 480, 100);
	ctx.fillText(soundOptions[wordNumber][3], 610, 100);
	ctx.fillText("Move the word pieces to the empty spaces to", 170, 450);
	ctx.fillText("build the word " + wordList[wordNumber], 170, 480);
	if (correct0 != 0) {
		ctx.fillText(soundOptions[wordNumber][correct0 - 1], 320, 230);
	}
	if (correct1 != 0) {
		ctx.fillText(soundOptions[wordNumber][correct1 - 1], 550, 230);
	}
	if (correct0 != 0 && correct1 != 0) {
		wordNumber++;
		onWord = false;
		correct0 = 0;
		correct1 = 0;
		currentSound = 0;
	}

}

// ---------- Hero/Monster Implementation -----------

// Game Objects

var hero = {
	speed: 100, //pixels per second
	x: click.x,
	y: click.y,
	dx: click.x,
	dy: click.y
};

// Update Stuff

var update = function (modifier){

	// Move Player

	if (Math.abs(hero.x - hero.dx) > hero.speed / 25 || Math.abs(hero.y - hero.dy) > hero.speed / 25) {
		var xDistance = hero.dx - hero.x;
		var yDistance = hero.dy - hero.y;
		var move = hero.speed / 25 / (Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
		var xMove = xDistance * move;
		var yMove = yDistance * move;
		hero.x += xMove;
		hero.y += yMove;
	}

};

// Draw Stuff

var render = function(){
	if (onWord) {
		drawWordScene();
	}
	else if (onSentence) {
		ctx.drawImage(bgImage[5],0,0);
		if (mouse.on) {
			mouse.on = false;
			meSpeak.speak("The cow jumps over the moon. Congratulations! You made a sentence.", {speed: 150, wordgap: 5});
		}
		ctx.drawImage(cowImage,200,175);
	}
	else {
		drawMainScene();
	}
};

var main = function() {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();
	then = now;
};

// Play

var then = Date.now();
setInterval(main, 1);