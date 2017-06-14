class PowerUpBullet extends Bullet {
    constructor(x, y) {
        super(x, y, 20 * 7, 20, 5, '#FF00FF')
    }

    render() {
        this.game.canvas.fillStyle = this.color
        this.game.canvas.fillRect(this.x, this.y, this.width, this.height)

        this.y -= 10

        if (this.y <= 0) {
            this.game.removeEntity(this)
        }

        this.game.entities.forEach((entity) => {
            if (entity instanceof Enemy && !entity.isDestroyed) {
                const hasCollision = PhysicsEngine.collisionDetected(this, entity)
                if (hasCollision) {
                    entity.hit(this)
                        // this.destroy()
                }
            }
        })
    }
}