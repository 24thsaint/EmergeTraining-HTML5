window.onload = () => {
    const loaderButton = document.getElementById('countries-loader')
    const clearButton = document.getElementById('clear-countries')
    const countriesView = document.getElementById('countries')

    loaderButton.onclick = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'http://emerge.training/countries.xml', true)
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                const response = xhr.responseXML
                let document = response.getElementsByTagName('country')
                const countriesCollection = []
                for (let i = 0; i < document.length; i++) {
                    const country = document[i].getAttribute('name').toString()
                    render(country)
                }
            }
        }
        xhr.send()
    }

    clearButton.onclick = () => {
        countriesView.innerHTML = ""
    }

    function render(country) {
        const element = document.createElement('p')
        element.innerText = country
        countriesView.appendChild(element)
    }

}