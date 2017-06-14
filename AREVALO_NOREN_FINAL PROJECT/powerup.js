class PowerUp {
    constructor(x, y, width, height, damage) {
        this.x = Math.floor(x - (width / 2))
        this.y = y
        this.width = width
        this.height = height
        this.damage = damage
        this.color = `#${PhysicsEngine.generateRandomColor()}`
        this.degrees = 0
        this.caught = false
        this.element = PhysicsEngine.createElement('canvas', 50, 50)
        this.canvas = this.element.getContext('2d')
        this.element.width = width
        this.element.height = height
        this.element.className = 'show-front spinner'
        this.mainGame = document.getElementById('main-game')
        this.mainGame.appendChild(this.element)
    }

    render() {
        this.canvas.clearRect(0, 0, this.width, this.height)

        if (!this.caught) {
            this.color = `#${PhysicsEngine.generateRandomColor()}`
            this.canvas.fillStyle = this.color
            this.canvas.fillRect(0, 0, this.width, this.height)

            this.element.style.left = `${this.x}px`
            this.element.style.top = `${this.y}px`

            this.y += 10

            if (this.y >= this.game.height) {
                this.destroy()
            }

            this.game.entities.forEach((entity) => {
                if (entity instanceof Character && !entity.isDead) {
                    const hasCollision = PhysicsEngine.radialCollisionDetected(this, entity)
                    if (hasCollision) {
                        entity.powerUp(this)
                        this.caught = true
                        this.game.powerUpCaught()

                        this.width = 200
                        this.height = 100
                        this.element.width = this.width
                        this.element.height = this.height
                        this.y = PhysicsEngine.centerize(this.game.height, this.height)
                        this.x = PhysicsEngine.centerize(this.game.width, this.width)
                        this.element.className = 'show-front whack'
                        this.element.style.top = `${this.y}px`
                        this.element.style.left = `${this.x}px`
                        setTimeout(() => {
                            this.destroy()
                        }, 2000)
                    }
                }
            })
        } else {
            this.canvas.fillStyle = '#FFFFFF'
            this.canvas.font = '40px cursive'
            this.canvas.fillText('Power Up!', 0, this.height * 0.5, 200)
        }
    }

    destroy() {
        this.game.removeEntity(this)
        this.element.remove()
    }
}