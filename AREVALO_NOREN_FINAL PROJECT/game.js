class Game {
    constructor(context, score) {
        this.canvas = context
        this.height = context.canvas.clientHeight
        this.width = context.canvas.clientWidth
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
            this.canvas.clearRect(0, 0, this.width, this.height)

            this.canvas.fillStyle = '#000000'
            this.canvas.fillRect(PhysicsEngine.centerize(this.width, this.gameWindowWidth), 0, this.gameWindowWidth, this.height)

            this.entities.forEach((entity) => {
                entity.render()
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
                        if (this.difficulty <= 3) {
                            this.difficulty = Math.ceil(Math.random() * 5)
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
        const mob = new Mob(50)

        mob.generateMob().forEach((enemy) => {
            this.addEntity(enemy)
        })
    }

    spawnPowerUp() {
        const randomX = Math.floor(Math.random() * this.width)
        const powerUp = new PowerUp(randomX, 0, 75, 75, 4)
        this.addEntity(powerUp)
    }

    restart(character) {
        character.bulletType = 'normal'
        this.score.reset()
        this.isGameOver = false
        this.entities = []
        this.addEntity(character)
    }

    gameOver() {
        window.localStorage.setItem('highScore', this.score.score)
        this.isGameOver = true
    }

}