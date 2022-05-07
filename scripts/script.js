let points = 0
let clicks = []
let sequence = []

const TILES = {
	0: document.getElementById('tileRed'),
	1: document.getElementById('tileBlue'),
	2: document.getElementById('tileGreen'),
	3: document.getElementById('tileYellow')
}

TILES[0].onclick = () => click(0)
TILES[1].onclick = () => click(1)
TILES[2].onclick = () => click(2)
TILES[3].onclick = () => click(3)

function playNewGame() {
	points = 0
	alert('Bem-vindo(a)!\nIniciando novo jogo...')
	nextLevel()
}

function nextLevel() {
	points++
	addNewOrder()
}

function addNewOrder() {
	clicks = []
	sequence.push(Math.floor(Math.random() * 4))
	lightTile()
}

function lightTile() {
	for (let i = 0; i < sequence.length; i++)
		addTimer(TILES[sequence[i]], Number(i) + 1)
}

function addTimer(tile, number) {
	number *= 400
	setTimeout(() => tile.classList.add('selected'), number - 100)
	setTimeout(() => tile.classList.remove('selected'), number)
}

function click(tile) {
	clicks.push(tile)
	TILES[tile].classList.add('selected')
	setTimeout(() => {
		TILES[tile].classList.remove('selected')
		checkIfPlayerWon()
	}, 50)
}

function checkIfPlayerWon() {
	if (checkClickedOrder()) {
		if (clicks.length == sequence.length)
			playerWon()
	} else {
		playerLose()
	}	
}

function checkClickedOrder() {
	for (let i = 0; i < clicks.length; i++)
		if (clicks[i] != sequence[i])
			return false
	return true
}

function playerWon() {
	alert(`Pontuação: ${points}\nVocê acertou! Iniciando próximo nível...`)
	nextLevel()
}

function playerLose() {
	clicks = []
	sequence = []
	alert(`Pontuação: ${points}\nVocê errou!\nClique em OK para iniciar um novo jogo...`)
	playNewGame()
}

playNewGame()