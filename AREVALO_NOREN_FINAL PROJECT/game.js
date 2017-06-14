class Game {
    constructor(context) {
        this.canvas = context
        this.height = context.canvas.clientHeight
        this.width = context.canvas.clientWidth
        this.gameWindowWidth = 500
        this.maxBoundary = this.width - this.gameWindowWidth
        this.entities = []
        this.isGameOver = false
        this.eventTimer = new Date()
        this.isSpawningMinions = false
        this.spawnTime = 5
        this.difficulty = 1

        setInterval(() => {
            this.difficulty++
        }, 10000 + (this.difficulty * 1000))
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
            this.canvas.clearRect(0, 0, this.width, this.height)

            this.canvas.fillStyle = '#000000'
            this.canvas.fillRect(PhysicsEngine.centerize(this.width, this.gameWindowWidth), 0, this.gameWindowWidth, this.height)

            this.entities.forEach((entity) => {
                entity.render()
            })

            const chance = Math.floor(Math.random() * 100)
            const present = new Date()

            if (PhysicsEngine.getSecondsElapsed(this.eventTimer, present) % this.spawnTime === 0 && !this.isSpawningMinions) {
                this.spawnMinions()
                this.isSpawningMinions = true
                setTimeout(() => {
                    this.isSpawningMinions = false
                }, 1000)
                setTimeout(() => {
                    this.spawnTime--
                        if (this.spawnTime <= 1) {
                            this.spawnTime = Math.ceil(Math.random() * 5)
                        }
                }, 5000)
            }
        } else {
            this.canvas.strokeStyle = '#FFFFFF'
            this.canvas.font = '75px cursive'
            const text = 'GAME OVER'
            const textWidth = this.canvas.measureText(text).width
            this.canvas.strokeText('GAME OVER', PhysicsEngine.centerize(this.width, textWidth), this.height * 0.5)

            this.canvas.fillStyle = '#FFFFFF'
            this.canvas.font = '30px Arial'
            const subText = 'Click to play again'
            const subTextWidth = this.canvas.measureText(subText).width
            this.canvas.fillText('Click to play again', PhysicsEngine.centerize(this.width, subTextWidth), (this.height * 0.5) + 100)
        }
    }

    spawnMinions() {
        const mob = new Mob(50, this.difficulty)
        mob.generateMob().forEach((enemy) => {
            this.addEntity(enemy)
        })
    }

    spawnPowerUp() {
        const randomX = Math.floor(Math.random() * this.gameWindowWidth)
        const powerUp = new PowerUp(randomX, 0, 25, 25, 4)
        this.addEntity(powerUp)
    }

    restart(character) {
        this.difficulty = 1
        character.bulletType = 'normal'
        character.damage = 1
        this.score.reset()
        this.isGameOver = false
        this.entities = []
        this.addEntity(character)
    }

    gameOver() {
        this.isGameOver = true

        this.entities.forEach((entity) => {
            if (entity instanceof PowerUp) {
                entity.element.remove()
            }
        })
    }

    powerUpCaught() {

    }

}