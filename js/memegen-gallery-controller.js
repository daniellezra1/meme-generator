'use strict'

function onInit() {
    onRenderGallery()
    onRenderKeywords()
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
    document.querySelector('.about-container').style.display = 'none'
}

function onRenderMemes() {
    var savedImgs = getSavedImgs()
    var id = 0
    var strHtml = ''
    savedImgs.forEach(savedImg => {
        strHtml += `<img src="${savedImg}" id="img-num-${id}" onclick="onEditCurrMeme(${id})">`
        id++
    })
    document.querySelector('.meme-container').innerHTML = strHtml
    document.querySelector('.nav-memes').classList.add('active')
}

function onRenderKeywords() {
    var keywords = getKeywords()
    var strHtml = ''
    var idx = 0
    for (var keyword in keywords) {
        var fontSize = 16 + keywords[keyword]
        strHtml += `<button onclick="onFilterMemes('${keyword}', true)" class="search-btn ${keyword}" style="border: none;text-decoration: none;font-size:${fontSize}px">${keyword}</button>`
        idx++
        if (idx === 5) {
            strHtml += `<button onclick="onMore()" class="search-btn" style="text-decoration: underline;">more...</button>
                        <div class="search-more">`
        }
    }
    strHtml += `</div>`
    document.querySelector('.search-by-keywords').innerHTML = strHtml
}

function onFilterMemes(txt, isKeyword = false) {
    // if (!txt) onRenderGallery()
    var imgs = getImges()
    var newImgs = imgs.filter(img => {
        var keywords = img.keywords
        var isInclude = keywords.find(keyword => keyword.startsWith(txt.toLowerCase()))
        if (isInclude) return img
    })

    var strHtml = ``
    newImgs.forEach(img => {
        strHtml += `<img src="${img.url}" id="img-num-${img.id}" onclick="onRenderCanvas(${img.id})">`
    })
    document.querySelector('.gallery-container').innerHTML = strHtml
    document.querySelector('.nav-gallery').classList.add('active')
    if (isKeyword) addClickToKeyword(txt)
    onRenderKeywords()
    if (open) document.querySelector('.search-more').classList.toggle('block')
}

var open = false

function onMore() {
    document.querySelector('.search-more').classList.toggle('block')
    if (!open) open = true
    else open = false
}

function onEditCurrMeme(idx) {
    editCurrMeme(idx)
    var meme = getMeme()
    onRenderCanvas(meme.selectedImgId)
}

function onRenderCanvas(imgId) {
    updateMemeImg(imgId)
    renderCanvas()
    onRenderStickers()
    document.querySelector('.canvas-container').style.display = "flex"
    document.querySelector('.gallery-container').style.display = "none"
    document.querySelector('.about-container').style.display = "none"
    document.querySelector('.meme-container').style.display = "none"
    document.querySelector('.search-container').style.display = "none"
}

function onGetGalleryPage() {
    restartMeme()
    document.querySelector('.canvas-container').style.display = "none"
    document.querySelector('.gallery-container').style.display = "grid"
    document.querySelector('.about-container').style.display = "none"
    document.querySelector('.meme-container').style.display = "none"
    document.querySelector('.search-container').style.display = "flex"

    document.querySelector('.nav-gallery').classList.add('active')
    document.querySelector('.nav-about').classList.remove('active')
    document.querySelector('.nav-memes').classList.remove('active')
}

function onGetMemePage() {
    restartMeme()
    onRenderMemes()
    document.querySelector('.canvas-container').style.display = "none"
    document.querySelector('.gallery-container').style.display = "none"
    document.querySelector('.about-container').style.display = "none"
    document.querySelector('.meme-container').style.display = "grid"
    document.querySelector('.search-container').style.display = "none"

    document.querySelector('.nav-memes').classList.add('active')
    document.querySelector('.nav-about').classList.remove('active')
    document.querySelector('.nav-gallery').classList.remove('active')
}

function onGetAboutPage() {
    restartMeme()
    document.querySelector('.canvas-container').style.display = "none"
    document.querySelector('.gallery-container').style.display = "none"
    document.querySelector('.about-container').style.display = "flex"
    document.querySelector('.meme-container').style.display = "none"
    document.querySelector('.search-container').style.display = "none"

    document.querySelector('.nav-about').classList.add('active')
    document.querySelector('.nav-memes').classList.remove('active')
    document.querySelector('.nav-gallery').classList.remove('active')
}