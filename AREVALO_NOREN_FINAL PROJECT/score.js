class Score {
    constructor(scoreCanvas) {
        this.score = 0
        this.scoreCanvas = scoreCanvas
        this.highScoreEmphasis = '#FFFFFF'
        this.element = document.createElement('canvas')
        this.height = 20
        this.margin = 10
    }

    render() {
        this.scoreCanvas.clearRect(0, 0, this.scoreCanvas.canvas.width, this.scoreCanvas.canvas.height)

        this.scoreCanvas.fillStyle = '#999999'
        this.scoreCanvas.fillRect(0, 0, this.scoreCanvas.canvas.width, this.scoreCanvas.canvas.height)

        this.scoreCanvas.fillStyle = '#FFFFFF'
        this.scoreCanvas.font = '20px Arial'
        this.scoreCanvas.fillText('Score: ', 0, this.height + this.margin)
        this.scoreCanvas.font = '20px Arial'
        this.scoreCanvas.fillText(`${this.score}`, 0, 2 * (this.height + this.margin))

        let highScore = window.localStorage.getItem('highScore')
        if (highScore === null) {
            highScore = 0
        }

        this.scoreCanvas.fillStyle = this.highScoreEmphasis
        this.scoreCanvas.font = '20px Arial'
        this.scoreCanvas.fillText('High Score: ', 0, 3 * (this.height + this.margin), 100)
        this.scoreCanvas.font = '20px Arial'
        this.scoreCanvas.fillText(`${highScore}`, 0, 4 * (this.height + this.margin))

        this.scoreCanvas.fillStyle = '#FFFFFF'
        this.scoreCanvas.font = '20px Arial'
        this.scoreCanvas.fillText('Damage: ', 0, 5 * (this.height + this.margin))
        this.scoreCanvas.font = '20px Arial'
        this.scoreCanvas.fillText(`${this.game.character.damage}`, 0, 6 * (this.height + this.margin))

        this.scoreCanvas.fillStyle = '#FFFFFF'
        this.scoreCanvas.font = '20px Arial'
        this.scoreCanvas.fillText('Difficulty: ', 0, 7 * (this.height + this.margin))
        this.scoreCanvas.font = '20px Arial'
        this.scoreCanvas.fillText(`${this.game.difficulty}`, 0, 8 * (this.height + this.margin))
    }

    add(score) {
        this.score += score
        if (this.score >= window.localStorage.getItem('highScore')) {
            window.localStorage.setItem('highScore', this.score)
            this.highScoreEmphasis = '#00FF00'
        }
        this.render()
    }

    reset() {
        this.score = 0
        this.render()
    }
}