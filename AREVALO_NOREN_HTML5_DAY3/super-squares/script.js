class Square {
    constructor(x, y, squareWidth) {
        this.x = x
        this.y = y
        this.width = squareWidth
        this.height = squareWidth
        this.color = `#${this.randomColor()}`
    }

    render(context) {
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height)
    }

    randomColor() {
        const color = Math.floor(Math.random() * 16777215)
        return color.toString(16)
    }

}

window.onload = () => {

    const c = document.getElementById('squares')
    c.width = window.innerWidth
    c.height = window.innerHeight

    generateSquares()

    c.onclick = () => {
        generateSquares()
    }

    window.onresize = () => {
        const c = document.getElementById('squares')
        c.width = window.innerWidth
        c.height = window.innerHeight
        generateSquares()
    }

}

function generateSquares() {
    const c = document.getElementById('squares')
    const context = c.getContext('2d')
    const squareWidth = 100

    let lastX = 0;
    let lastY = 0;

    let limitX = c.width / squareWidth
    let limitY = c.height / squareWidth

    let counter = 0

    for (let y = 0; y < limitY; y++) {
        for (let x = 0; x < limitX; x++) {
            if (counter % 7 === 0) {
                generateSquareSorcery(x * squareWidth, y * squareWidth, squareWidth, context, 2)
            } else if (counter % 11 === 0) {
                generateSquareSorcery(x * squareWidth, y * squareWidth, squareWidth, context, 4)
            } else {
                const square = new Square(x * squareWidth, y * squareWidth, squareWidth)
                square.render(context)
            }
            counter++
        }
    }
}

function generateSquareSorcery(sizeX, sizeY, squareWidth, context, divisor) {
    const halfSquareWidth = squareWidth / divisor

    for (let miniTop = 0; miniTop < divisor; miniTop++) {
        for (let miniBot = 0; miniBot < divisor; miniBot++) {
            const x = sizeX + miniTop * halfSquareWidth
            const y = sizeY + miniBot * halfSquareWidth
            const square = new Square(x, y, halfSquareWidth)
            square.render(context)
        }
    }
}