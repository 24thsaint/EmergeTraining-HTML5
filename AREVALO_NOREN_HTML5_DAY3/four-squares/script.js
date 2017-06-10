class Square {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 100
        this.height = 100
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
    const context = c.getContext('2d')

    let lastX = 0;
    let lastY = 0;

    for (let i = 0; i < 4; i++) {
        const square = new Square(lastX, lastY)
        square.render(context)
        lastX += square.width
        lastY += square.height
    }
}