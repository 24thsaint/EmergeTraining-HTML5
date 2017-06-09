let array = []

window.onload = () => {
    const first = document.getElementById('first')
    const second = document.getElementById('second')
    const third = document.getElementById('third')

    const content = document.getElementById('content')
    array = Array.from(content.children)

    const firstText = document.getElementById('first-text')
    const secondText = document.getElementById('second-text')
    const thirdText = document.getElementById('third-text')

    first.onclick = () => {
        change(0)
    }
    second.onclick = () => {
        change(1)
    }
    third.onclick = () => {
        change(2)
    }

    resetView()
}

function resetView() {
    const content = document.getElementById('content')
    const length = content.children.length
    for (let i = 0; i < length; i++) {
        content.removeChild(content.children[0])
    }
}

function change(element) {
    resetView()
    const content = document.getElementById('content')
    content.appendChild(array[element])
}