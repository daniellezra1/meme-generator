'use strict'

function onInit() {
    onRenderGallery()
    renderLocalStorage()
}

function onRenderGallery() {
    var imgs = getImges()
    var strHtml = ''
    imgs.forEach(img => {
        strHtml += `<img src="${img.url}" id="img-num-${img.id}" onclick="onRenderCanvas(${img.id})">`
    })
    document.querySelector('.gallery-container').innerHTML = strHtml
    document.querySelector('.nav-gallery').classList.add('active')
}

function onRenderMemes() {
    var savedImgs = getSavedImgs()
    // var savedMemes = getSavedMemes()
    var id = 0
    var strHtml = ``
    savedImgs.forEach(savedImg => {
        // console.log(savedMemes[id])
        strHtml += `<img src="${savedImg}" id="img-num-${id}" onclick="onEditCurrMeme(${id})">`
        id++
    })
    document.querySelector('.meme-container').innerHTML = strHtml
    document.querySelector('.nav-memes').classList.add('active')
}

function onEditCurrMeme(idx) {
    editCurrMeme(idx)
    var meme = getMeme()
    onRenderCanvas(meme.selectedImgId)
}

function onRenderCanvas(imgId) {
    updateMemeImg(imgId)
    renderCanvas()
    document.querySelector('.canvas-container').style.display = 'flex'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.about-container').style.display = 'none'
    document.querySelector('.meme-container').style.display = 'none'
}

function onGetGalleryPage() {
    restartMeme()
    document.querySelector('.canvas-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'grid'
    document.querySelector('.about-container').style.display = 'none'
    document.querySelector('.meme-container').style.display = 'none'
    document.querySelector('.nav-gallery').classList.add('active')
    document.querySelector('.nav-about').classList.remove('active')
    document.querySelector('.nav-memes').classList.remove('active')
}

function onGetMemePage() {
    restartMeme()
    onRenderMemes()
    document.querySelector('.canvas-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.about-container').style.display = 'none'
    document.querySelector('.meme-container').style.display = 'grid'
    document.querySelector('.nav-memes').classList.add('active')
    document.querySelector('.nav-about').classList.remove('active')
    document.querySelector('.nav-gallery').classList.remove('active')
}

function onGetAboutPage() {
    restartMeme()
    document.querySelector('.canvas-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.about-container').style.display = 'block'
    document.querySelector('.meme-container').style.display = 'none'
    document.querySelector('.nav-about').classList.add('active')
    document.querySelector('.nav-memes').classList.remove('active')
    document.querySelector('.nav-gallery').classList.remove('active')
}