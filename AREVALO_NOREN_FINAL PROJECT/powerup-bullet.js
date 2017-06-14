class PowerUpBullet extends Bullet {
    constructor(character, x, y) {
        super(character, x, y, 40, 20, 3, '#FF00FF')
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
                const hasCollision = PhysicsEngine.boxCollisionDetected(this, entity)
                if (hasCollision) {
                    entity.hit(this)
                }
            }
        })
    }
}