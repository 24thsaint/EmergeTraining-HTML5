window.onload = () => {
    document.getElementById('menulink').onclick = () => {
        console.log(menu.className)
        if (menu.className != 'shownmenu') {
            menu.className = 'shownmenu'
        } else {
            menu.className = 'hiddenmenu'
        }
    }

    const loaderButton = document.getElementById('countries-loader')
    const clearButton = document.getElementById('clear-countries')
    const countriesView = document.getElementById('countries')
    let lastElement = ""
    let lastTr = document.createElement('tr')

    const getCountries = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'http://emerge.training/countries.xml', true)
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                const response = xhr.responseXML
                let document = response.getElementsByTagName('country')
                const countriesCollection = []
                clear()
                for (let i = 0; i < document.length; i++) {
                    const country = document[i].getAttribute('name').toString()
                    countriesCollection.push(country)
                }
                countriesCollection.sort()
                for (let i = 0; i < countriesCollection.length; i++) {
                    const country = countriesCollection[i]
                    render(country)
                }
            }
        }
        xhr.send()
    }

    getCountries()

    function clear() {
        document.getElementById('countries-loader').innerText = "Countries of the World"
    }

    function render(country) {
        const currentElement = country.substring(0, 1)
        if (currentElement !== lastElement) {
            lastTr = document.createElement('tr')
            lastElement = currentElement
            const index = document.createElement('td')
            index.innerText = lastElement
            index.className = "index"
            lastTr.appendChild(index)
            countriesView.appendChild(lastTr)
        }

        const element = document.createElement('td')
        element.innerText += country
        if (country === "Philippines") {
            element.className = "red-background-emphasis"
        }
        lastTr.appendChild(element)
    }

    const sidebar = document.getElementById('sidebar')

    document.getElementById('image-1').onclick = () => {
        change('1.jpg')
    }
    document.getElementById('image-2').onclick = () => {
        change('2.jpg')
    }
    document.getElementById('image-3').onclick = () => {
        change('3.jpg')
    }
    document.getElementById('image-4').onclick = () => {
        change('4.jpg')
    }
    document.getElementById('hamburger').onclick = () => {
        if (sidebar.className === 'hiddenSidebar') {
            sidebar.className = 'shownSidebar'
        } else {
            sidebar.className = 'hiddenSidebar'
        }
    }

    function change(file) {
        const element = document.getElementById('image')
        element.src = file
    }
}