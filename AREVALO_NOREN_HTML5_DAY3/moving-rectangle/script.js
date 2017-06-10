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

const square = new Square()
let movementDirectionX = 1
let movementDirectionY = 1

window.onload = () => {
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