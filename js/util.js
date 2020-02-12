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