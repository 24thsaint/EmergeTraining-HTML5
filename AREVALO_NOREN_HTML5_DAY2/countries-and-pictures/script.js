window.onload = () => {
    let person = prompt("What is your name?")
    const suffix = person.substring(1, person.length)
    const prefix = person.substring(0, 1).toUpperCase()

    document.getElementById('person').innerText = ' ' + prefix + suffix

    document.getElementById('menulink').onclick = () => {
        console.log(menu.className)
        if (menu.className != 'shownmenu') {
            menu.className = 'shownmenu'
        } else {
            menu.className = 'hiddenmenu'
        }
    }
}