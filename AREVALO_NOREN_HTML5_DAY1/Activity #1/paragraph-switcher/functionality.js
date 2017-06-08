let globalElements = []

const render = () => {
    let elements = document.getElementById('paragraphs').children
    for (let i = 0; i < elements.length; i++) {
        elements[i].remove()
    }
    elementParent = document.getElementById('paragraphs')
    for (let i = 0; i < globalElements.length; i++) {
        elementParent.appendChild(globalElements[i])
    }
    globalElements[0].className = "bold-text"
    globalElements[1].className = "italic-text"
}

const switcher = (first, second) => {
    globalElements[0].className = ""
    globalElements[1].className = ""

    temp = globalElements[first]
    globalElements[first] = globalElements[second]
    globalElements[second] = temp
    render()
}

const initialize = () => {
    const elements = document.getElementById('paragraphs').children
    globalElements = Array.from(elements)
}

window.onload = () => {
    initialize()
    const elements = document.getElementById('controls')
    for (let i = 0; i < elements.length; i++) {
        elements.onclick = switcher
    }
}