'use strict'

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

mobileNav()

function toggleMenu() {
    document.body.classList.toggle('menu-open')
    document.body.classList.toggle('none-scroll')
    document.querySelector('.menu-btn').classList.toggle('is-active')
}

function mobileNav() {
    if (isMobileDevice()) {
        const links = document.querySelectorAll('.nav li')
        links.forEach(link => {
            if (link === document.querySelector('.nav-lang')) return
            else link.addEventListener('click', function () { setTimeout(toggleMenu, 500) })
        })
    }
}

// Mobile Device

function isMobileDevice() {
    return (window.innerWidth < 500 &&
        (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1))
}