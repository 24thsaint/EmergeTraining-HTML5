class Mob {
    constructor(minionSize) {
        this.enemies = []
        this.minionSize = minionSize
    }

    generateMob() {
        let enemy
        for (let i = 0; i < this.minionSize / 2; i++) {
            const chance = Math.floor(Math.random() * 100)
            let enemy
            if (chance <= 20) {
                enemy = new Enemy(this.enemies.length * this.minionSize, 0, this.minionSize, this.minionSize, 1, '#FFF59D')
            } else if (chance <= 40 && chance > 20) {
                enemy = new Enemy(this.enemies.length * this.minionSize, 0, this.minionSize, this.minionSize, 5, '#FF7043')
            } else if (chance <= 60 && chance > 40) {
                enemy = new Enemy(this.enemies.length * this.minionSize, 0, this.minionSize, this.minionSize, 7, '#3949AB')
            } else if (chance <= 80 && chance > 60) {
                enemy = new Enemy(this.enemies.length * this.minionSize, 0, this.minionSize, this.minionSize, 9, '#6A1B9A')
            } else {
                enemy = new Enemy(this.enemies.length * this.minionSize, 0, this.minionSize, this.minionSize, 12, '#B71C1C')
            }
            this.enemies.push(enemy)
        }
        return this.enemies
    }
}