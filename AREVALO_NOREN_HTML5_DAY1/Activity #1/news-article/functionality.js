window.onload = () => {
    const done = document.getElementById('done')
    const articleTitle = document.getElementById('article-title')
    const articleText = document.getElementById('article-text')
    done.onclick = () => {
        articleTitle.innerHTML = "Thank you for reading"
        articleText.style.visibility = "hidden"
    }
}