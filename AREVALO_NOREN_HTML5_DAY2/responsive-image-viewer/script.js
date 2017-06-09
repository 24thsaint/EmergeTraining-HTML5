window.onload = () => {
    const sidebar = document.getElementById('sidebar')

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
    document.getElementById('hamburger').onclick = () => {
        if (sidebar.className === 'hiddenSidebar') {
            sidebar.className = 'shownSidebar'
        } else {
            sidebar.className = 'hiddenSidebar'
        }
    }
}

function change(file) {
    const element = document.getElementById('image')
    element.src = file
}