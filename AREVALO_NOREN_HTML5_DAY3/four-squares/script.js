class Square {
    constructor(x, y, width) {
        this.x = x
        this.y = y
        this.width = width
        this.height = width
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

}

function generateSquares() {
    const c = document.getElementById('squares')
    const context = c.getContext('2d')

    let width = 100;

    for (let i = 0; i < 4; i++) {
        const square = new Square(i * width, i * width, width)
        square.render(context)
    }
}