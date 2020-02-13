
// Local Storage

function saveToStorage(key, value) {
    var item = JSON.stringify(value)
    localStorage.setItem(key, item)
}

function loadFromStorage(key) {
    var item = localStorage.getItem(key)
    var value = JSON.parse(item)
    if (value) return value
    else return []
}

// Mobile Menu

var openMenu = false

function toggleMenu() {
    document.body.classList.toggle('menu-open')
    document.querySelector('.menu-btn').classList.toggle('is-active')

    if (!openMenu) {
        openMenu = true
        document.querySelector('ul.main-nav').style.visibility = 'visible'
    } else {
        openMenu = false
        document.querySelector('ul.main-nav').style.visibility = 'hidden'
    }
}