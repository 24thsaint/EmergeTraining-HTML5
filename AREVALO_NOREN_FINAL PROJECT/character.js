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
        this.bulletType = 'normal'
        this.damage = 1

        setInterval(() => {
            this.shoot()
        }, 100)
    }

    render() {
        this.game.entities.forEach((entity) => {
            if (entity instanceof Enemy) {
                const hasCollision = PhysicsEngine.boxCollisionDetected(entity, this)
                if (hasCollision) {
                    this.game.canvas.fillStyle = '#FFFFFF'
                    this.game.canvas.fillRect(this.x, this.y, this.width, this.height)
                    this.game.gameOver()
                }
            }
        })

        this.game.canvas.fillStyle = '#0000FF'
        this.game.canvas.fillRect(this.x, this.y, this.width, this.height)
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
        let bullet
        switch (this.bulletType) {
            case 'normal':
                {
                    bullet = new NormalBullet(this, this.x + (this.halfWidth), this.y, this)
                    break
                }
            case 'powerup':
                {
                    bullet = new PowerUpBullet(this, this.x + (this.halfWidth), this.y, this)
                    break
                }
        }
        this.game.addEntity(bullet)
    }

    powerUp(power) {
        this.bulletType = 'powerup'
        this.damage += 1
        setTimeout(() => {
            this.bulletType = 'normal'
        }, 5000)
    }
}