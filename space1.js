var position = 50;
var shots;
var bunker;
var bunker1

var laser;
var enemy;
var aliens = [];
var bonus = [];
var enemyCount = 0;

var score = 0;
var aantalAliens = 0;
var levens = 3;
class bonusEnemy {
	positionX = 0;
	positionY = 55;
	img = "";
	move() {
		this.positionX += 2;
		this.updateImg()
	}
	updateImg() {
		this.img.style.left = this.positionX + "%";
		this.img.style.top = this.positionY + "%";
	}
	constructor(img) {
		this.img = img;
	}
}
class Enemy {
	positionX = 50;
	positionY = 15;
	img = "";
	goingleft = true;
	move() {
		if (this.positionX >= 95) {
			this.goingleft = true;
			this.positionX = 5;
			this.positionY -= 5;
		}
		if (this.positionX <= 5) {
			this.positionX = 95
			this.goingleft = true;
			this.positionY += 5;
		}
		if (!this.goingleft) {
			this.positionX += 2;
		} else {
			this.positionX -= 2;
		}
		this.updateImg()
	}
	updateImg() {
		this.img.style.left = this.positionX + "%";
		this.img.style.top = this.positionY + "%";
	}
	constructor(img) {
		this.img = img;
	}
}
function moveToSide(key) {
	if (position < 95 && key == 'ArrowRight') {
		document.getElementById("char").style.left = position + 5 + "%";
		position += 5;
	}
	if (position > 5 && key == 'ArrowLeft') {
		document.getElementById("char").style.left = position - 5 + "%";
		position -= 5;
	}
}
function move(key) {
	if (key == ' ' || key == 'ArrowUp') {
		addPlayerLaser();
	}
	if (key == '0') {
		PlaySound();
	}
	if (key === 'ArrowDown') {
		createEnemy();

		document.getElementById('enemycount').innerHTML = "Resterende aliens: " + enemyCount;
	}
}

function addPlayerLaser() {
	const audio = new Audio("sounds/gunSound.ogg");
	audio.volume = 0.9;
	audio.play();
	shotplace = 80;
	img = document.createElement('img');
	img.className = "shot"
	img.src = 'image/shot.png';
	img.style.position = "fixed";
	img.style.width = 40 + "px";
	img.style.height = 40 + "px";
	img.style.left = position + 2 + "%";
	img.style.top = 80 + "%";
	document.getElementById('body').appendChild(img);
	raken(img, enemy);
}
function shootup() {
	shots = document.getElementsByClassName('shot');
	for (var a = 0; a < shots.length; a++) {
		var shotup = parseInt(shots[a].style.top, 10);
		shots[a].style.top = shotup - 1 + "%";
		for (var j = 0; j < aliens.length; j++) {
			var bunker = document.getElementsByClassName('boom')
			for (var k = 0; k < bunker.length; k++) {
				var rake = raken(shots[a], aliens[j].img);
				var raak = rakenBunker(bunker[k], shots[a])
				if (rake) {
					
					document.getElementById('body').removeChild(aliens[j].img);
					explosion(aliens[j].positionX, aliens[j].positionY);
					const audio = new Audio("sounds/Explosion.wav");
					audio.volume = 0.9;
					audio.play();   
					enemyCount = parseInt(enemyCount - 1)
					document.getElementById('enemycount').innerHTML = "Resterende aliens: " + enemyCount;
					score = score + 1;
					document.getElementById('scoreboard').innerHTML = "SCORE: " + score + " |    + 1 punt!"
					setTimeout(() => document.getElementById('scoreboard').innerHTML = "SCORE: " + score, 1300)
					document.getElementById('score').innerHTML = "Aantal vermoorde aliens: " + score;
					aantalAliens = parseInt(aantalAliens + 1);
					
				}
				if (raak) {
					document.getElementById('body').removeChild(shots[a]);
					const audio = new Audio("sounds/hitBunker.wav");
					audio.volume = 0.9;
					audio.play();
				}
				if (parseInt(enemyCount) == 0) {
					document.getElementById('tudo').style.display = "block"
					document.getElementById('container').style.display = "block"
				}
			}
		}
		for (var t = 0; t < bonus.length; t++) {
			var raakBonus = rakenBonus(shots[a], bonus[t].img)
			if (raakBonus) {
				explosion(bonus[t].positionX, bonus[t].positionY);
				const audio = new Audio("sounds/Bonus.wav");
				audio.volume = 0.9;
				audio.play();
				document.getElementById('body').removeChild(bonus[t].img)
				score = score + 1;
				levens = levens + 1;
				document.getElementById('levens').innerHTML = "Aantal levens: " + levens + " |   + 1 leven!";
				setTimeout(() => document.getElementById('levens').innerHTML = "Aantal levens: " + levens, 1300);
			}
		}
	}
}
function explosion(left, top) {
	var bom = document.createElement('img');
	bom.className = "explosie"
	bom.src = 'image/explosieGif.gif';
	bom.style.position = "fixed";
	bom.style.width = 64 + "px";
	bom.style.height = 52 + "px";
	bom.style.left = left + 1 + "%";
	bom.style.top = top - 2 + "%";
	document.getElementById('body').appendChild(bom);
	setTimeout(() => document.getElementById('body').removeChild(bom), 700);
}
function raken(img, enemy) {
	var presiesie = 2;
	var imgtop = parseInt(img.style.top, 10)
	var enemytop = parseInt(enemy.style.top, 10)
	var imgleft = parseInt(img.style.left, 10)
	var enemyleft = parseInt(enemy.style.left, 10)
	if (imgtop <= enemytop + presiesie && imgtop >= enemytop - presiesie) {
		if (imgleft <= enemyleft + presiesie && imgleft >= enemyleft - presiesie) {
			return true;
		}
	} else {
		return false
	}
}
function createBonus() {
	enemyBonus = document.createElement("img");
	enemyBonus.className = "alien"
	enemyBonus.src = "image/bonus.png";
	enemyBonus.style.width = 70 + "px";
	enemyBonus.style.height = 70 + "px";
	enemyBonus.style.position = "fixed";
	var Alien = new bonusEnemy(enemyBonus);
	enemyBonus.style.left = parseInt(Alien.positionX) + "%";
	enemyBonus.style.top = parseInt(Alien.positionY) + "%";
	document.getElementById("body").appendChild(enemyBonus);
	bonus.push(Alien)
}
setInterval(createBonus, 10000);

function rakenBunker(img, enemy) {
	var presiesie = 2;
	var imgtop = parseInt(img.style.top, 10)
	var enemytop = parseInt(enemy.style.top, 10)
	var imgleft = parseInt(img.style.left, 10)
	var enemyleft = parseInt(enemy.style.left, 10)
	if (imgtop <= enemytop + presiesie && imgtop >= enemytop - presiesie) {
		if (imgleft <= enemyleft + presiesie && imgleft >= enemyleft - presiesie) {
			return true;
		}
	} else {
		return false
	}
}
setInterval(shootup, 15);
setInterval(shootupLaser, 15);
function createEnemy() {
	enemy = document.createElement("img");
	enemy.className = "alien"
	enemy.src = "image/trump2.gif";
	enemy.style.width = 70 + "px";
	enemy.style.height = 70 + "px";
	enemy.style.position = "fixed";
	var Alien = new Enemy(enemy);
	enemy.style.left = parseInt(Alien.positionX) + "%";
	enemy.style.top = parseInt(Alien.positionY) + "%";
	document.getElementById("body").appendChild(enemy);
	aliens.push(Alien)
	enemyCount = parseInt(enemyCount + 1)
	document.getElementById('enemycount').innerHTML = "Resterende aliens: " + enemyCount;
}

function MaakXAantalEnemy(callback, interval, aantalHerhalen) {
    let repeated = 0;
    const intervalTask = setInterval(DoeOpdracht, interval)

    function DoeOpdracht() {
        if ( repeated < aantalHerhalen ) {
            callback()
            repeated += 1
        } else {
            clearInterval(intervalTask)
        }
    }
} 
MaakXAantalEnemy(createEnemy, 1000, 4)
setInterval(moveEnemy, 140);
setInterval(moveEnemyBonus, 140);
function addEnemyLaser() {
	laser = document.createElement('img');
	laser.className = "laser";
	laser.src = 'image/laser.png';
	laser.style.position = "fixed";
	laser.style.width = 10 + "px";
	laser.style.height = 30 + "px";
	var random = Math.floor(Math.random() * aliens.length); 
	for (var z = 0; z < random; z++) {
		console.log(random)
		laser.style.left = aliens[z].positionX + 2 + "%";
		laser.style.top = aliens[z].positionY + 2 + "%";
		document.getElementById('body').appendChild(laser);
		
	}
}
setInterval(addEnemyLaser, 3000);

function shootupLaser() {

	var lasers = document.getElementsByClassName('laser');
	
	for (var a = 0; a < lasers.length; a++) {
		var shotup = parseInt(lasers[a].style.top, 10);
		lasers[a].style.top = shotup + 1 + "%";
		
		var raaken = raakLaser(lasers[a]);
		
		if (raaken) {
			document.getElementById('body').removeChild(lasers[a])
			console.log('geraakt')
//			document.getElementById('char').style.display = "none";
			
			levens = parseInt(levens -1)
			document.getElementById('levens').innerHTML = "Aantal levens: " + levens + " |   - 1 leven!";
				setTimeout(() => document.getElementById('levens').innerHTML = "Aantal levens: " + levens, 1300);
		}
		if(levens == -1){
			document.getElementById('score1').innerHTML = "Aantal vermoorde aliens: " + score;
			document.getElementById('tudo1').style.display = "block"
					document.getElementById('container1').style.display = "block"
//					const audio = new Audio("gameOver.wav");
//					audio.volume = 0.9;
//					audio.play();
					
					
					
		}
	}
}
function raakLaser(enemy) {
	var presiesie = 4;
	var imgtop = 90
	var enemytop = parseInt(enemy.style.top, 10)
	var imgleft = parseInt(position +2, 10)
	var enemyleft = parseInt(enemy.style.left, 10)
	if (imgtop <= enemytop + presiesie && imgtop >= enemytop - presiesie) {
		if (imgleft <= enemyleft + presiesie && imgleft >= enemyleft - presiesie) {
			return true;
		}
	} else {
		return false;
	}
}
function moveEnemy() {
	for (var i = 0; i < aliens.length; i++) {
		aliens[i].move();
	}
}
function moveEnemyBonus() {
	for (var i = 0; i < bonus.length; i++) {
		bonus[i].move();
	}
}
function removeimg(img) {
	console.log('Cleanup of ' + img)
	img.parentNode.removeChild(img)
}
function PlaySound() {
	const audio = new Audio("sounds/main.ogg");
	audio.volume = 0.1;
	audio.play();
}
function createbunker() {
	bunker1 = document.createElement('img');
	bunker1.className = "boom"
	bunker1.src = 'image/bunker.png';
	bunker1.style.position = "fixed";
	bunker1.style.width = 70 + "px";
	bunker1.style.height = 70 + "px";
	bunker1.style.left = 20 + "%";
	bunker1.style.top = 70 + "%";
	document.getElementById('body').appendChild(bunker1);
	bunker = document.createElement('img');
	bunker.className = "boom"
	bunker.src = 'image/bunker.png';
	bunker.style.position = "fixed";
	bunker.style.width = 70 + "px";
	bunker.style.height = 70 + "px";
	bunker.style.left = 75 + "%";
	bunker.style.top = 70 + "%";
	document.getElementById('body').appendChild(bunker);
}
function rakenBonus(img, enemy) {
	var presiesie = 2;
	var imgtop = parseInt(img.style.top, 10)
	var enemytop = parseInt(enemy.style.top, 10)
	var imgleft = parseInt(img.style.left, 10)
	var enemyleft = parseInt(enemy.style.left, 10)
	if (imgtop <= enemytop + presiesie && imgtop >= enemytop - presiesie) {
		if (imgleft <= enemyleft + presiesie && imgleft >= enemyleft - presiesie) {
			return true;
		}
	} else {
		return false
	}
}