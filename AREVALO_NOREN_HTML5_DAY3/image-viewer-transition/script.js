const change = (file, id) => {
    const img = document.getElementById(id)
    const endHandler = () => {
        img.src = file
        img.removeEventListener('transitionend', endHandler, false)
        img.removeEventListener('webkitTransitionEnd', endHandler, false)
        img.style.opacity = 1.0
    }
    img.addEventListener('transitionend', endHandler, false)
    img.addEventListener('webkitTransitionEnd', endHandler, false)
    img.style.opacity = 0.0
}

const transition = (element, value) => {
    element.style.opacity = value
}

const popUp = (text) => {
    let textInput = ''
    const popUp = document.createElement('div')
    popUp.className = 'fullscreenpopup'
    popUp.setAttribute('id', 'popper')
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
    const button = document.createElement('button')
    button.onclick = () => {
        const value = document.getElementById('location-field').value
        const removeChild = () => {
            setTimeout(() => {
                document.body.removeChild(popUp)
            }, 250)
        }

        if (value !== '') {
            change(value, 'image')
        }

        setTimeout(() => {
            transition(popUp, 0.0)
            removeChild()
        }, 250)
    }
    p2.appendChild(button)
    const span = document.createElement('span')
    span.appendChild(document.createTextNode('CATCH!'))
    button.appendChild(span)
    document.body.appendChild(popUp)
    setTimeout(() => {
        transition(popUp, 1.0)
    }, 250)
}

window.onload = () => {
    const sidebar = document.getElementById('sidebar')
    change('charmeleon.png', 'image')

    document.getElementById('image-1').onclick = () => {
        change('charmeleon.png', 'image')
    }
    document.getElementById('image-2').onclick = () => {
        change('charmander.png', 'image')
    }
    document.getElementById('image-3').onclick = () => {
        change('charizard.png', 'image')
    }
    document.getElementById('image-4').onclick = () => {
        change('mega-charizard.png', 'image')
    }
    document.getElementById('custom').onclick = () => {
        popUp('Choose your Pokemon!')
    }
    document.getElementById('hamburger').onclick = () => {
        if (sidebar.className === 'hiddenSidebar') {
            sidebar.className = 'shownSidebar'
        } else {
            sidebar.className = 'hiddenSidebar'
        }
    }
}