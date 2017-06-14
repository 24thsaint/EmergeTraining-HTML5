class Bullet {
    constructor(character, x, y, width, height, damage, color) {
        this.character = character
        this.x = x - (width / 2)
        this.y = y
        this.width = width
        this.height = height
        this.damage = damage
        this.color = color
    }

    render() {
        this.constructor.render()
    }

    destroy() {
        this.game.removeEntity(this)
    }
}