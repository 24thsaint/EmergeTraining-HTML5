class NormalBullet extends Bullet {
    constructor(character, x, y) {
        super(character, x, y, 10, 20, 1, '#00FF00')
    }

    render() {
        this.game.canvas.fillStyle = this.color
        this.game.canvas.fillRect(this.x, this.y, this.width, this.height)

        this.y -= 5

        if (this.y <= 0) {
            this.game.removeEntity(this)
        }

        this.game.entities.forEach((entity) => {
            if (entity instanceof Enemy && !entity.isDestroyed) {
                const hasCollision = PhysicsEngine.boxCollisionDetected(this, entity)
                if (hasCollision) {
                    entity.hit(this)
                    this.destroy()
                }
            }
        })
    }
}