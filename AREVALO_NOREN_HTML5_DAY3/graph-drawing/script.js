window.onload = () => {
    const c = document.getElementById('graph')
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    drawGraph()

    window.onresize = () => {
        drawGraph()
    }

    c.onclick = () => {
        drawGraph()
    }
}

function drawGraph() {
    const c = document.getElementById('graph')
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    const context = c.getContext('2d')

    const height = c.height;
    const width = c.width;
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, width, height)

    const dx = width / 2;
    const dy = height / 2;

    drawAxis(context, dx, dy)
    functionOfXRaisedToPower(context, dx, dy, 1, 1)
    functionOfXRaisedToPower(context, dx, dy, 0.05, 2)
    functionOfXRaisedToPower(context, dx, dy, 0.01, 3)
}

function functionOfXRaisedToPower(context, dx, dy, coefficient, power) {
    context.beginPath()
    context.moveTo(dx, dy)
    context.beginPath()
    for (let x = dy; x > -dy; x--) {
        context.lineTo(dx + x, dy - (coefficient * (Math.pow(x, power))))
    }
    context.strokeStyle = `#${randomColor()}`
    context.stroke()
}

function randomColor() {
    const color = Math.floor(Math.random() * 16777215)
    return color.toString(16)
}

function drawAxis(context) {
    context.beginPath()
    const height = context.canvas.clientHeight;
    const width = context.canvas.clientWidth;
    const dx = width / 2;
    const dy = height / 2;

    context.moveTo(0, dy)
    context.lineTo(width, dy)
    context.moveTo(dx, 0)
    context.lineTo(dx, height)

    context.strokeStyle = '#000000'
    context.stroke()

    context.draw
}