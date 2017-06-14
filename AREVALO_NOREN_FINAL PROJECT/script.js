window.onload = () => {
    const handler = () => {
        window.removeEventListener('click', handler)
        const starter = document.getElementById('starter')
        starter.style.position = 'fixed'
        starter.style.right = '-50%'
        setTimeout(() => {
            starter.remove()
        }, 1000)
        const gameContainer = document.getElementById('main-game')
        gameContainer.style.left = '0'
        initialize()
    }
    window.addEventListener('click', handler, false)
}

function initialize() {
    const gameElement = document.getElementById('game')
    gameElement.width = 500
    gameElement.height = window.innerHeight
    const gameCanvas = gameElement.getContext('2d')
    const boundary = {
        bottom: 678,
        height: 678,
        left: 0,
        right: 500,
        top: 0,
        width: 500,
    }
    const entitySize = 50
    const entityMargin = entitySize * 2
    const width = gameElement.width
    const height = gameElement.height

    gameCanvas.clearRect(0, 0, width, height)

    const character = new Character(PhysicsEngine.centerize(width, entitySize), height - entityMargin, entitySize)
    const game = new Game(gameCanvas)
    game.character = character
    game.addEntity(character)
    game.boundary = boundary

    const scoreElement = document.getElementById('score')
    scoreElement.width = 100
    scoreElement.height = gameElement.height
    const scoreCanvas = scoreElement.getContext('2d')
    const score = new Score(scoreCanvas)
    game.score = score
    score.game = game
    score.render()

    gameElement.onmousemove = (event) => {
        character.move(event.x, boundary.left, boundary.right)
    }

    gameElement.onclick = () => {
        if (game.isGameOver) {
            game.restart(character)
        }
    }

    const interval = setInterval(() => {
        game.render()
    }, (1000 / 60))
}