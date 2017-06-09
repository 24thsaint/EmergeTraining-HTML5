window.onload = () => {
    document.getElementById('image-1').onclick = () => {
        change('1.JPG')
    }
    document.getElementById('image-2').onclick = () => {
        change('2.JPG')
    }
    document.getElementById('image-3').onclick = () => {
        change('3.JPG')
    }
    document.getElementById('image-4').onclick = () => {
        change('4.JPG')
    }
    document.getElementById('image-loader').onclick = () => {
        popUp('Hello, please enter image location')
    }
}

function change(file) {
    const element = document.getElementById('image')
    element.src = file
}

function popUp(text) {
    let textInput = ''
    const popUp = document.createElement('div')
    popUp.className = 'fullscreenpopup'
    const container = document.createElement('div')
    container.className = 'fullscreenpopup-container'
    popUp.appendChild(container)
    const content = document.createElement('div')
    content.className = 'fullscreenpopup-content'
    container.appendChild(content)
    const p1 = document.createElement('p')
    p1.appendChild(document.createTextNode(text))
    content.appendChild(p1)
    const pl1 = document.createElement('p')
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('id', 'location-field')
    pl1.appendChild(input)
    content.appendChild(pl1)
    const p2 = document.createElement('p')
    content.appendChild(p2)
    const button = document.createElement('a')
    button.href = '#'
    button.className = 'button'
    button.onclick = () => {
        const value = document.getElementById('location-field').value
        change(value)
        document.body.removeChild(popUp)
    }
    p2.appendChild(button)
    const span = document.createElement('span')
    span.appendChild(document.createTextNode('OK'))
    button.appendChild(span)
    document.body.appendChild(popUp)
}