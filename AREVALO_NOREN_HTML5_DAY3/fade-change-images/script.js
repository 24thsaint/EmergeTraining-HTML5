let current = 0

const fadeChangeImage = (imageId, newUrl) => {
    const img = document.getElementById(imageId)
    const endHandler = () => {
        img.src = newUrl
        img.removeEventListener('transitionend', endHandler, false)
        img.removeEventListener('webkitTransitionEnd', endHandler, false)
        img.style.opacity = 1.0
    }
    img.addEventListener('transitionend', endHandler, false)
    img.addEventListener('webkitTransitionEnd', endHandler, false)
    img.style.opacity = 0.0
}

window.onload = () => {
    const images = ['chu.png', 'pikachu.png', 'raichu.png']
    const image = document.getElementById('image')
    const previous = document.getElementById('previous')
    const next = document.getElementById('next')

    fadeChangeImage('image', images[current])

    previous.onclick = () => {
        current -= 1
        if (current < 0) {
            current = 0
        }
        fadeChangeImage('image', images[current])
    }

    next.onclick = () => {
        current += 1
        if (current >= images.length) {
            current = images.length - 1
        }
        fadeChangeImage('image', images[current])
    }
}