class PowerUp {
    constructor(x, y, width, height, damage) {
        this.x = x - (width / 2)
        this.y = y
        this.width = width
        this.height = height
        this.damage = damage
        this.color = `#${PhysicsEngine.generateRandomColor()}`
        this.degrees = 0
        this.caught = false
    }

    render() {
        if (!this.caught) {
            this.color = `#${PhysicsEngine.generateRandomColor()}`
            this.game.canvas.fillStyle = this.color
            this.game.canvas.fillRect(this.x, this.y, this.width, this.height)
            this.y += 7
        }

        if (this.y >= this.game.height) {
            this.game.removeEntity(this)
        }

        this.game.entities.forEach((entity) => {
            if (entity instanceof Character && !entity.isDead) {
                const hasCollision = PhysicsEngine.collisionDetected(this, entity)
                if (hasCollision) {
                    entity.powerUp(this)

                    this.game.canvas.fillStyle = '#FFFFFF'
                    this.game.canvas.font = '30px cursive'
                    this.game.canvas.fillText('Power Up!', this.x + (this.width * 0.5), this.y + (this.height * 0.5))

                    this.caught = true
                    setTimeout(() => {
                        this.destroy()
                    }, 1000)
                }
            }
        })
    }

    destroy() {
        this.game.removeEntity(this)
    }
}