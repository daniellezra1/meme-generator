'use strict'

function onInit() {
    onRenderGallery()
}

function onRenderGallery() {
    var imgs = getImges()
    var strHtml = ''
    imgs.forEach(img => {
        strHtml += `<img src="${img.url}" id="img-num-${img.id}" onclick="onRenderCanvas(${img.id})">`
    })
    document.querySelector('.gallery-container').innerHTML = strHtml
}

function onRenderCanvas(imgId) {
    updateMemeImg(imgId)
    renderCanvas()
    document.querySelector('.canvas-container').style.display = 'flex'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.about-container').style.display = 'none'
}