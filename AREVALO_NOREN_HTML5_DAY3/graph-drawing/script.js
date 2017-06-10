window.onload = () => {
    const c = document.getElementById('graph')
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    const context = c.getContext('2d')

    console.log(context.canvas.clientWidth)
    console.log(c.width)

    const height = c.height;
    const width = c.width;
    context.fillStyle = '#000000'
    context.fillRect(0, 0, width, height)

    const dx = width / 2;
    const dy = height / 2;
    console.log(dx)


    drawAxis(context, dx, dy)

    context.moveTo(dx, dy)

    for (let y = dy; y > -dy; y--) {
        context.lineTo(dy + y, dy - (y * y))
    }

    context.strokeStyle = '#FFFFFF'
    context.stroke()
}

function drawAxis(context) {
    const height = context.canvas.clientHeight;
    const width = context.canvas.clientWidth;
    const dx = width / 2;
    const dy = height / 2;

    context.moveTo(0, dy)
    context.lineTo(width, dy)
    context.moveTo(dx, 0)
    context.lineTo(dx, height)
}