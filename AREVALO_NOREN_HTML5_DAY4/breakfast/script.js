class Square {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.width = size
        this.height = size
        this.originalWidth = size
        this.originalHeight = size
        this.widthChangeRate = 1
        this.heightChangeRate = 1
        this.color = `#${this.randomColor()}`
        this.directionX = 1
        this.directionY = 1
        this.moveSpeed = 1
    }

    render() {

        if (this.x >= (this.display.width - this.width)) {
            this.directionX = -1
        }
        if (this.x <= 0) {
            this.directionX = 1
        }
        if (this.y >= (this.display.height - this.height)) {
            this.directionY = -1
        }
        if (this.y <= 0) {
            this.directionY = 1
        }

        if (this.width >= this.originalWidth) {
            this.widthChangeRate = -1
        }
        if (this.width <= 0) {
            this.widthChangeRate = 1
        }
        if (this.height >= this.originalHeight) {
            this.heightChangeRate = -1
        }
        if (this.height <= 0) {
            this.heightChangeRate = 1
        }

        this.height += this.heightChangeRate
        this.width += this.widthChangeRate

        this.x += (this.moveSpeed * this.directionX)
        this.y += (this.moveSpeed * this.directionY)

        this.display.context.fillStyle = this.color
        this.display.context.fillRect(this.x, this.y, this.width, this.height)
    }

    randomColor() {
        const color = Math.floor(Math.random() * 16777215)
        return color.toString(16)
    }
}

class Display {
    constructor(context) {
        this.context = context
        this.squares = []
        this.width = context.canvas.clientWidth
        this.height = context.canvas.clientHeight
        this.increaseSquares = true
        this.maxSquares = 20
    }

    render() {
        this.context.clearRect(0, 0, this.context.canvas.clientWidth, this.context.canvas.clientHeight);
        this.context.fillStyle = '#000000'
        this.context.fillRect(0, 0, this.context.canvas.clientWidth, this.context.canvas.clientHeight);

        this.squares.forEach((square) => {
            square.render()
        })
    }

    spawnSquare() {
        if (this.squares.length === this.maxSquares) {
            this.increaseSquares = false
        }

        if (this.squares.length <= 0) {
            this.increaseSquares = true
        }

        if (this.increaseSquares) {
            const randomX = Math.floor(Math.random() * this.context.canvas.clientWidth)
            const randomY = Math.floor(Math.random() * this.context.canvas.clientHeight)
            const square = new Square(randomX, randomY, 50)
            square.display = this
            this.squares.push(square)
        } else {
            this.squares.pop()
        }
    }
}

window.onload = () => {
    const element = document.getElementById('hypnotizing-squares')
    element.width = window.innerWidth
    element.height = window.innerHeight
    const context = element.getContext('2d')
    const display = new Display(context)
    display.render()

    window.setInterval(() => {
        display.render()
    }, 1000 / 60)

    const delay = Math.ceil(Math.random() * 5) * 1000

    window.setInterval(() => {
        display.spawnSquare()
    }, delay)
}