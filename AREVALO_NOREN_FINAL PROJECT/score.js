class Score {
    constructor(scoreCanvas) {
        this.score = 0
        this.scoreCanvas = scoreCanvas
        this.highScoreEmphasis = '#FFFFFF'
        this.element = document.createElement('canvas')
    }

    render() {
        this.scoreCanvas.clearRect(0, 0, this.scoreCanvas.canvas.width, this.scoreCanvas.canvas.height)

        this.scoreCanvas.fillStyle = '#999999'
        this.scoreCanvas.fillRect(0, 0, this.scoreCanvas.canvas.width, this.scoreCanvas.canvas.height)

        this.scoreCanvas.fillStyle = '#FFFFFF'
        this.scoreCanvas.font = '30px Arial'
        this.scoreCanvas.fillText('Score: ', 0, this.scoreCanvas.canvas.clientHeight - 10, 100)
        this.scoreCanvas.font = '30px Arial'
        this.scoreCanvas.fillText(`${this.score}`, 100, this.scoreCanvas.canvas.clientHeight - 10)

        if (window.localStorage.getItem('highScore') !== undefined) {
            this.scoreCanvas.fillStyle = this.highScoreEmphasis
            this.scoreCanvas.font = '30px Arial'
            this.scoreCanvas.fillText('High Score: ', 200, this.scoreCanvas.canvas.clientHeight - 10, 100)
            this.scoreCanvas.font = '30px Arial'
            this.scoreCanvas.fillText(`${window.localStorage.getItem('highScore')}`, 300, this.scoreCanvas.canvas.clientHeight - 10)
        }
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