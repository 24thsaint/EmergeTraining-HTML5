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

    move(x, boundaryLeft, boundaryRight) {
        const pad = 5

        if (!this.isDead) {
            this.x = x - boundaryLeft - (this.halfWidth)

            if (this.x <= 0) {
                this.x = 0 + pad
            }

            if (x >= boundaryRight - this.halfWidth) {
                this.x = boundaryRight - boundaryLeft - this.width - pad
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
        this.color = '#00FF00'
    }

    render(game) {
        game.fillStyle = this.color
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
        this.originalColor = color
        this.color = color
        this.isBeingHit = false
    }

    render(game) {
        if (this.isDestroyed) {
            this.game.score.add(1)
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

            if (this.isBeingHit) {
                this.isBeingHit = false
                this.color = this.originalColor
            }

            if (this.y >= this.game.height) {
                this.game.removeEntity(this)
            }
        }
    }

    hit(bullet) {
        this.health -= bullet.damage
        this.color = bullet.color
        this.isBeingHit = true
        if (this.health <= 0) {
            this.isDestroyed = true
        }
    }
}

class Game {
    constructor(game, score) {
        this.game = game
        this.height = game.canvas.clientHeight
        this.width = game.canvas.clientWidth
        this.gameWindowWidth = 500
        this.maxBoundary = this.width - this.gameWindowWidth
        this.entities = []
        this.score = score
        this.isGameOver = false
        this.eventTimer = new Date()
        this.isSpawningMinions = false
        this.difficulty = 5
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
            const present = new Date()

            if (PhysicsEngine.getSecondsElapsed(this.eventTimer, present) % this.difficulty === 0 && !this.isSpawningMinions) {
                this.spawnMinions()
                this.isSpawningMinions = true
                setTimeout(() => {
                    this.isSpawningMinions = false
                }, 1000)
                setTimeout(() => {
                    this.difficulty--
                        if (this.difficulty <= 0) {
                            this.difficulty = Math.ceil(Math.random() * 10)
                        }
                }, 5000)
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

    spawnMinions() {
        const minionSize = 50

        const enemies = []

        for (let i = 0; i < minionSize / 2; i++) {
            const chance = Math.floor(Math.random() * 100)
            let enemy
            if (chance <= 20) {
                enemy = new Enemy(enemies.length * minionSize, 0, minionSize, minionSize, 1, '#FFF59D')
            } else if (chance <= 40 && chance > 20) {
                enemy = new Enemy(enemies.length * minionSize, 0, minionSize, minionSize, 5, '#FF7043')
            } else if (chance <= 60 && chance > 40) {
                enemy = new Enemy(enemies.length * minionSize, 0, minionSize, minionSize, 7, '#3949AB')
            } else if (chance <= 80 && chance > 60) {
                enemy = new Enemy(enemies.length * minionSize, 0, minionSize, minionSize, 9, '#6A1B9A')
            } else {
                enemy = new Enemy(enemies.length * minionSize, 0, minionSize, minionSize, 12, '#B71C1C')
            }
            enemies.push(enemy)
        }

        enemies.forEach((enemy) => {
            this.addEntity(enemy)
        })
    }

    restart(character) {
        this.score.reset()
        this.isGameOver = false
        this.entities = []
        this.addEntity(character)
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
        const y = PhysicsEngine.collisionAlign(source.y, source.height) - PhysicsEngine.collisionAlign(target.y, target.height)
        const radius = (source.width * 0.5) + (target.width * 0.5)
        const distance = Math.sqrt((x * x) + (y * y));
        if (distance < radius) {
            return true
        }
        return false
    }

    static generateRandomColor() {
        const color = Math.floor(Math.random() * 16777215)
        return color.toString(16)
    }

    static getSecondsElapsed(past, present) {
        return Math.ceil((present.getTime() - past.getTime()) / 1000)
    }
}

class Score {
    constructor(scoreCanvas) {
        this.score = 0
        this.scoreCanvas = scoreCanvas
    }

    render() {
        this.scoreCanvas.clearRect(0, 0, this.scoreCanvas.canvas.width, this.scoreCanvas.canvas.height)

        this.scoreCanvas.fillStyle = '#999999'
        this.scoreCanvas.fillRect(0, 0, this.scoreCanvas.canvas.width, this.scoreCanvas.canvas.height)

        this.scoreCanvas.fillStyle = '#FFFFFF'
        this.scoreCanvas.strokeStyle = '#FFFFFF'
        this.scoreCanvas.font = '30px Arial'
        this.scoreCanvas.fillText('SCORE: ', 0, this.scoreCanvas.canvas.clientHeight - 10)
        this.scoreCanvas.font = '30px Arial'
        this.scoreCanvas.strokeText(`${this.score}`, 120, this.scoreCanvas.canvas.clientHeight - 10)
    }

    add(score) {
        this.score += score
        this.render()
    }

    reset() {
        this.score = 0
        this.render()
    }
}

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