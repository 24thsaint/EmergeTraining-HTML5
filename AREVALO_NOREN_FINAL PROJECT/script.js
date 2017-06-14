window.onload = () => {
    const handler = () => {
        window.removeEventListener('click', handler)
        const starter = document.getElementById('starter')
        starter.remove()
        initialize()
    }
    window.addEventListener('click', handler, false)
}

function initialize() {
    const gameElement = document.getElementById('game')
    gameElement.width = 500
    gameElement.height = window.innerHeight
    const gameCanvas = gameElement.getContext('2d')
    const boundary = gameElement.getBoundingClientRect()

    const scoreElement = document.getElementById('score')
    scoreElement.width = gameElement.width
    scoreElement.height = 50
    const scoreCanvas = scoreElement.getContext('2d')
    const score = new Score(scoreCanvas)
    score.render()

    const entitySize = 50
    const entityMargin = entitySize * 2
    const width = gameElement.width
    const height = gameElement.height

    gameCanvas.clearRect(0, 0, width, height)

    const character = new Character(PhysicsEngine.centerize(width, entitySize), height - entityMargin, entitySize)
    const game = new Game(gameCanvas, score)
    game.addEntity(character)

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