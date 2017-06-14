class Mob {
    constructor(minionSize, scale) {
        this.enemies = []
        this.minionSize = minionSize
        this.scale = scale
    }

    generateMob() {
        let enemy
        for (let i = 0; i < this.minionSize / 2; i++) {
            const chance = Math.floor(Math.random() * 100)
            let enemy
            if (chance <= 20) {
                enemy = new Enemy(this.enemies.length * this.minionSize, 0, this.minionSize, this.minionSize, 1 * this.scale, '#FFF59D', 1 * this.scale)
            } else if (chance <= 40 && chance > 20) {
                enemy = new Enemy(this.enemies.length * this.minionSize, 0, this.minionSize, this.minionSize, 2 * this.scale, '#FF7043', 1 * this.scale)
            } else if (chance <= 60 && chance > 40) {
                enemy = new Enemy(this.enemies.length * this.minionSize, 0, this.minionSize, this.minionSize, 3 * this.scale, '#3949AB', 1 * this.scale)
            } else if (chance <= 80 && chance > 60) {
                enemy = new Enemy(this.enemies.length * this.minionSize, 0, this.minionSize, this.minionSize, 4 * this.scale, '#6A1B9A', 2 * this.scale)
            } else {
                enemy = new Enemy(this.enemies.length * this.minionSize, 0, this.minionSize, this.minionSize, 5 * this.scale, '#B71C1C', 3 * this.scale)
            }
            this.enemies.push(enemy)
        }
        return this.enemies
    }
}