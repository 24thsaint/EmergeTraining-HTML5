class Enemy {
    constructor(x, y, width, height, health, color, point) {
        this.x = x
        this.y = y
        this.width = width
        this.height = health
        this.health = this.height
        this.isDestroyed = false
        this.opacity = 1.0
        this.originalColor = color
        this.color = color
        this.isBeingHit = false
        this.point = point
    }

    render() {
        if (this.isDestroyed) {
            this.game.canvas.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
            this.game.canvas.fillRect(this.x, this.y, this.width, this.height)

            this.opacity -= 0.1

            if (this.opacity <= 0) {
                this.game.removeEntity(this)
            }
        } else {
            this.game.canvas.fillStyle = this.color
            this.game.canvas.fillRect(this.x, this.y, this.width, this.height)

            this.y += 2

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
        this.height -= bullet.damage + Math.floor(bullet.character.damage)
        this.health = this.height
        this.color = bullet.color
        this.isBeingHit = true
        if (this.health <= 0 && !this.isDestroyed) {
            this.isDestroyed = true
            this.game.score.add(this.point)
            const powerUpChance = Math.floor(Math.random() * 100)
            if (powerUpChance <= 10 && this.game.character.bulletType === 'normal') {
                this.game.spawnPowerUp()
            }
        }
    }
}