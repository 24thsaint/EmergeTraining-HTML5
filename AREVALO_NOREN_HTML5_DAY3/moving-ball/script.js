class Square {
    constructor() {
        this.x = 10
        this.y = 10
        this.width = 50
        this.height = 50
        this.moveSpeed = 5
        this.color = '#00FF00'
    }

    render(context) {
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height)
    }

}

function createBall() {
    const c = document.getElementById('ball')
    c.width = 64
    c.height = 64

    const context = c.getContext('2d')
    const width = c.width
    const height = c.height

    const x = width / 2
    const y = height / 2
    const radius = width - x

    // context.fillStyle = '#000000'
    // context.fillRect(0, 0, width, height)

    // context.fillStyle = '#00FF00'
    // context.arc(x, y, radius, toRadians(0), toRadians(360))
    // context.fill()
    // context.strokeStyle = '#0000FF'
    // context.stroke()

    // const image = document.createElement('img')
    // image.src = 'ball.png'
    // image.onload = () => {
    //     context.drawImage(image, 64, 64)
    // }

    const image = document.createElement('img')
    image.src = 'ball.png'
    c.className = 'spinner'
    image.onload = () => {
        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, c.width, c.height)
    }

    const handler = (event) => {
        c.style.top = `${event.y - y}px`
        c.style.left = `${event.x - x}px`
    }

    window.onmousedown = handler
}

function createBackground() {
    const update = () => {
        const c = document.getElementById('game')
        c.width = window.innerWidth
        c.height = window.innerHeight
        const context = c.getContext('2d')
        const width = c.width
        const height = c.height

        context.clearRect(0, 0, width, height)
        context.fillStyle = '#FF0000'
        context.fillRect(0, 0, width, height)

        if (square.x >= (width - square.width)) {
            movementDirectionX = -1
        }
        if (square.x <= 0) {
            movementDirectionX = 1
        }
        if (square.y >= (height - square.height)) {
            movementDirectionY = -1
        }
        if (square.y <= 0) {
            movementDirectionY = 1
        }

        square.x += (square.moveSpeed * movementDirectionX)
        square.y += (square.moveSpeed * movementDirectionY)

        square.render(context)
    }

    setInterval(update, Math.ceil(1000 / 60))
}

const square = new Square()
let movementDirectionX = 1
let movementDirectionY = 1

window.onload = () => {

    createBall()
    createBackground()

}

function toRadians(degrees) {
    return degrees * (Math.PI / 180)
}