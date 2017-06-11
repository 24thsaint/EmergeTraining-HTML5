class Character {
    constructor(x, y, size) {
        this.width = size;
        this.height = size;
        this.halfWidth = size * 0.5
        this.halfHeight = size * 0.5
        this.x = x
        this.y = y
        this.counter = 0
        this.isDead = false
    }

    render(game) {

        this.game.entities.forEach((entity) => {
            if (entity instanceof Enemy) {
                const hasCollision = PhysicsEngine.collisionDetected(entity, this)
                if (hasCollision) {
                    game.fillStyle = '#FFFFFF'
                    game.fillRect(this.x, this.y, this.width, this.height)
                    this.game.gameOver()
                }
            }
        })

        game.fillStyle = '#0000FF'
        game.fillRect(this.x, this.y, this.width, this.height)
        if (this.counter === 6) {
            this.shoot()
            this.counter = 0
        }
        this.counter++
    }

    move(x) {
        if (!this.isDead) {
            if (this.game.width - this.halfWidth <= (x)) {
                this.x = this.game.width - this.width
            } else if (this.halfWidth >= (x)) {
                this.x = 0
            } else {
                this.x = x - (this.halfWidth)
            }
        }
    }

    shoot() {
        const bullet = new Bullet(this.x + (this.halfWidth), this.y, 10, 20, 1)
        this.game.addEntity(bullet)
    }
}

class Bullet {
    constructor(x, y, width, height, damage) {
        this.x = x - (width / 2)
        this.y = y
        this.width = width
        this.height = height
        this.damage = damage
    }

    render(game) {
        game.fillStyle = '#00FF00'
        game.fillRect(this.x, this.y, this.width, this.height)
        this.y -= 5
        if (this.y <= 0) {
            this.game.removeEntity(this)
        }

        this.game.entities.forEach((entity) => {
            if (entity instanceof Enemy && !entity.isDestroyed) {
                const hasCollision = PhysicsEngine.collisionDetected(this, entity)
                if (hasCollision) {
                    entity.hit(this)
                    this.destroy()
                }
            }
        })
    }

    destroy() {
        this.game.removeEntity(this)
    }
}

class Enemy {
    constructor(x, y, width, height, health, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.health = health
        this.isDestroyed = false
        this.opacity = 1.0
        this.color = color
    }

    render(game) {
        if (this.isDestroyed) {
            // this.game.score.score += 1
            game.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
            game.fillRect(this.x, this.y, this.width, this.height)
            this.opacity -= 0.1

            if (this.opacity <= 0) {
                this.game.removeEntity(this)
            }
        } else {
            game.fillStyle = this.color
            game.fillRect(this.x, this.y, this.width, this.height)
            this.y += 3

            if (this.y >= this.game.height) {
                this.game.removeEntity(this)
            }
        }
    }

    hit(bullet) {
        this.health -= bullet.damage
        if (this.health <= 0) {
            this.isDestroyed = true
        }
    }
}

class Game {
    constructor(game) {
        this.game = game
        this.height = game.canvas.clientHeight
        this.width = game.canvas.clientWidth
        this.gameWindowWidth = 500
        this.maxBoundary = this.width - this.gameWindowWidth
        this.entities = []
            // this.score = score
        this.isGameOver = false
    }

    addEntity(entity) {
        entity.game = this
        this.entities.push(entity)
    }

    removeEntity(entity) {
        this.entities.splice(this.entities.indexOf(entity), 1)
    }

    render() {
        if (!this.isGameOver) {
            this.game.clearRect(0, 0, this.width, this.height)

            this.game.fillStyle = '#000000'
            this.game.fillRect(PhysicsEngine.centerize(this.width, this.gameWindowWidth), 0, this.gameWindowWidth, this.height)

            this.entities.forEach((entity) => {
                entity.render(this.game)
            })

            const chance = Math.floor(Math.random() * 100)
            if (chance <= 10) {
                const randomX = Math.floor(Math.random() * (this.width - 50))
                const enemy = new Enemy(randomX, 0, 50, 50, 1, '#FF0000')
                this.addEntity(enemy)
            } else if (chance <= 15) {
                const randomX = Math.floor(Math.random() * (this.width - 50))
                const enemy = new Enemy(randomX, 0, 50, 50, 3, '#00FFFF')
                this.addEntity(enemy)
            }
        } else {
            this.game.strokeStyle = '#FFFFFF'
            this.game.font = '75px cursive'
            const text = 'GAME OVER'
            const textWidth = this.game.measureText(text).width
            this.game.strokeText('GAME OVER', PhysicsEngine.centerize(this.width, textWidth), this.height * 0.5)

            this.game.fillStyle = '#FFFFFF'
            this.game.font = '30px Arial'
            const subText = 'Click to play again'
            const subTextWidth = this.game.measureText(subText).width
            this.game.fillText('Click to play again', PhysicsEngine.centerize(this.width, subTextWidth), (this.height * 0.5) + 100)
        }
    }

    restart(character) {
        // this.score.score = 0
        this.isGameOver = false
        this.entities = []
        this.addEntity(character)
            // this.addEntity(this.score)
    }

    gameOver() {
        this.isGameOver = true
    }

}

class PhysicsEngine {
    static centerize(parent, child) {
        return (parent * 0.5) - (child * 0.5)
    }

    static collisionAlign(x, width) {
        return x + (width * 0.5)
    }

    static collisionDetected(source, target) {
        const x = PhysicsEngine.collisionAlign(source.x, source.width) - PhysicsEngine.collisionAlign(target.x, target.width)
        const y = source.y - target.y
        const radius = (source.width * 0.5) + (target.width * 0.5)
        const distance = Math.sqrt((x * x) + (y * y));
        if (distance < radius) {
            return true
        }
        return false
    }
}

class Score {
    constructor() {
        this.score = 0
            // this.scoreCanvas = scoreCanvas
    }

    render() {
        // this.scoreCanvas.fillStyle = '#000000'
        // this.scoreCanvas.clearRect(0, 0, this.scoreCanvas.canvas.width, this.scoreCanvas.canvas.height)
        // this.scoreCanvas.strokeStyle = '#000000'
        // this.scoreCanvas.font = '30px Arial'
        // this.scoreCanvas.fillText('SCORE: ', 800, 800)
        // this.scoreCanvas.font = '50px Arial'
        // this.scoreCanvas.strokeText(`${this.score}`, 800, 800)
        // console.log('scoreDrawn')
    }
}

window.onload = () => {
    const handler = () => {
        window.removeEventListener('click', handler)
        initialize()
    }
    window.addEventListener('click', handler, false)
}

function initialize() {
    const gameElement = document.getElementById('game')
    gameElement.width = 500
    gameElement.height = window.innerHeight
    const gameCanvas = gameElement.getContext('2d')

    const entitySize = 50
    const entityMargin = entitySize * 2
    const width = gameElement.width
    const height = gameElement.height

    gameCanvas.clearRect(0, 0, width, height)

    const character = new Character(PhysicsEngine.centerize(width, entitySize), height - entityMargin, entitySize)
    const game = new Game(gameCanvas)
    game.addEntity(character)

    gameElement.onmousemove = (event) => {
        character.move(event.x)
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