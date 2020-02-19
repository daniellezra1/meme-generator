'use strict'

var gCanvas
var gCtx
var gFirstLoad = true
var gIsLocalImg = false
var gLocalImg
var gNoFocus = false
var gDragOn = false
var gFocustxt = true
var gFocusSticker = false
var gCurrPosX
var gCurrPosY


function renderCanvas() {
    gCanvas = document.querySelector('#meme-canvas')
    gCtx = gCanvas.getContext('2d')

    if (gFirstLoad) resizeCanvas()

    if (gIsLocalImg) drawLocalImg(gLocalImg)
    else drawImg()

    if (!gNoFocus) drawFocusRect()
    else gNoFocus = false

    renderText()
    drawStickers()
    addDragDrop()
    onChangePage(0)
}

function resizeCanvas() {
    var imgId = getSelectedImg()
    var elImg = document.querySelector(`#img-num-${imgId}`)
    var ratio = elImg.width / elImg.height

    if (isMobileDevice()) {
        gCanvas.width = window.innerWidth - 15
        gCanvas.height = (gCanvas.width / ratio)
        document.querySelector('.meme-control').style.width = `"${window.innerWidth}px"`
    } else {
        gCanvas.width = 500
        gCanvas.height = (gCanvas.width / ratio)
    }
    changePosTexts(gCanvas.width, gCanvas.height)
    gFirstLoad = false
}

function drawLocalImg() {
    gCtx.drawImage(gLocalImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawImg() {
    var imgId = getSelectedImg()
    var elImg = document.querySelector(`#img-num-${imgId}`)
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function renderText() {
    var meme = getMeme()
    var lines = meme.lines
    if (lines.length === 0) return
    lines.forEach(line => drawText(line))

    var selectedLine = meme.lines[meme.selectedLineIdx]
    document.querySelector('.control-txt-input').value = selectedLine.txt
}

function drawText(line) {
    gCtx.setLineDash([])
    gCtx.lineWidth = '1'
    gCtx.strokeStyle = line.OutlineColor
    gCtx.fillStyle = line.fillColor
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, line.positionX, line.positionY)
    gCtx.strokeText(line.txt, line.positionX, line.positionY)
}


function drawFocusRect() {
    var meme = getMeme()
    if (gFocustxt) {
        if (meme.lines.length === 0) return
        var line = meme.lines[meme.selectedLineIdx]
        var posX = line.positionX
        var posY = line.positionY
        gCtx.beginPath()
        gCtx.rect(posX - 160, posY - 40, 320, 50)
        gCtx.setLineDash([4, 4])
        gCtx.strokeStyle = 'black'
        gCtx.stroke()
    }
    if (gFocusSticker) {
        var sticker = meme.stickers[meme.selectedStickerIdx]
        var posX = sticker.positionX
        var posY = sticker.positionY
        gCtx.beginPath()
        gCtx.rect(posX - 10, posY - 10, sticker.width + 20, sticker.height + 20)
        gCtx.setLineDash([4, 4])
        gCtx.strokeStyle = 'black'
        gCtx.stroke()
    }
}

function onChangeText(txt) {
    editMeme('txt', txt)
    // changeText(txt)
    gFocustxt = true
    gFocusSticker = false
    renderCanvas()
}

function onChangeAlign(align) {
    editMeme('align', align)
    // changeAlign(align)
    renderCanvas()
}

function onChangeOutlineColor(value) {
    editMeme('OutlineColor', value)
    // changeOutlineColor(value)
    renderCanvas()
}

function onChangeFillColor(value) {
    editMeme('fillColor', value)
    // changeFillColor(value)
    renderCanvas()
}

function onChangeSize(num) {
    changeSize(num)
    renderCanvas()
}

function onChangeFont(font) {
    editMeme('font', font)
    // changeFont(font)
    renderCanvas()
}

function onChangePositionY(num) {
    changePositionY(num)
    renderCanvas()
}

function onChangePositionX(num) {
    changePositionX(num)
    renderCanvas()
}

function onSwitchLines() {
    switchLines()
    gFocustxt = true
    gFocusSticker = false
    renderCanvas()
}

function onDeleteLine() {
    deleteLine()
    renderCanvas()
}

function onAddLine() {
    addLine()
    gFocustxt = true
    gFocusSticker = false
    renderCanvas()
}

function onDownloadCanvas(elLink) {
    gNoFocus = true
    renderCanvas()
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'Img'
}


function uploadImg(elForm, ev) {
    ev.preventDefault()
    gNoFocus = true
    renderCanvas()
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg")
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)
    }
    doUploadImg(elForm, onSuccess)
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm)
    fetch('https://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

function onUploadImg(ev) {
    loadImageFromInput(ev, renderCanvas)
    gIsLocalImg = true
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader();

    reader.onload = function (event) {
        gLocalImg = new Image();
        gLocalImg.onload = onImageReady.bind(null, gLocalImg)
        gLocalImg.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

function onSaveToStorage() {
    gFocustxt = false
    gFocusSticker = false
    gNoFocus = true
    renderCanvas()
    const data = gCanvas.toDataURL()
    saveImg(data)
    saveAndRestartMeme()
    onGetMemePage()
}

function addDragDrop() {
    gCanvas.addEventListener('mousedown', dragText)
    gCanvas.addEventListener('mouseup', dropText)
    gCanvas.addEventListener('mousemove', moveText)

    gCanvas.addEventListener('touchstart', dragText)
    gCanvas.addEventListener('touchend', dropText)
    gCanvas.addEventListener('touchmove', moveText)
}


function dragText(ev) {

    ev.preventDefault()
    ev.stopPropagation()

    var offsetX
    var offsetY
    if (ev.type === 'touchstart') {
        offsetX = ev.changedTouches[0].pageX - gCanvas.getBoundingClientRect().left
        offsetY = ev.changedTouches[0].pageY - gCanvas.getBoundingClientRect().top
    } else {
        offsetX = ev.offsetX
        offsetY = ev.offsetY
    }

    var meme = getMeme()
    var lines = meme.lines
    var idx = 0
    lines.forEach(function (line) {
        if (offsetX > line.positionX - 160 &&
            offsetX < line.positionX + 160 &&
            offsetY > line.positionY - 40 &&
            offsetY < line.positionY + 10) {
            switchLinesDrogDrop(idx)
            updateDragging(idx, 'lines', true)
            document.querySelector('.control-txt-input').value = line.txt
            renderCanvas()
            gDragOn = true
            gFocustxt = true
            gFocusSticker = false
            return
        }
        idx++
    })



    var stickers = meme.stickers
    var idx = 0
    stickers.forEach(function (sticker) {
        if (offsetX > sticker.positionX - 10 &&
            offsetX < sticker.positionX + sticker.width + 10 &&
            offsetY > sticker.positionY - 10 &&
            offsetY < sticker.positionY + sticker.height + 10) {
            switchStickersDrogDrop(idx)
            updateDragging(idx, 'stickers', true)
            renderCanvas()
            gDragOn = true
            gFocusSticker = true
            gFocustxt = false
            return
        }
        idx++
    })


    gCurrPosX = offsetX
    gCurrPosY = offsetY
    renderCanvas()
}

function dropText(ev) {

    ev.preventDefault()
    ev.stopPropagation()

    gDragOn = false

    var meme = getMeme()
    if (gFocustxt) {
        var lines = meme.lines
        var idx = 0
        lines.forEach(function (line) {
            if (line.isDragging) {
                updateDragging(idx, 'lines', false)
                return
            }
            idx++
        })
    }

    if (gFocusSticker) {
        var stickers = meme.stickers
        var idx = 0
        stickers.forEach(function (sticker) {
            if (sticker.isDragging) {
                updateDragging(idx, 'stickers', false)
                return
            }
            idx++
        })
    }

    gCurrPosX = undefined
    gCurrPosY = undefined
}


function moveText(ev) {

    if (gDragOn) {

        ev.preventDefault()
        ev.stopPropagation()

        var offsetX
        var offsetY
        if (ev.type === 'touchmove') {
            offsetX = ev.changedTouches[0].pageX - gCanvas.getBoundingClientRect().left
            offsetY = ev.changedTouches[0].pageY - gCanvas.getBoundingClientRect().top
        } else {
            offsetX = ev.offsetX
            offsetY = ev.offsetY
        }

        var disX = offsetX - gCurrPosX;
        var disY = offsetY - gCurrPosY;

        var meme = getMeme()

        if (gFocustxt) {
            var lines = meme.lines
            lines.forEach(function (line) {
                if (line.isDragging) {
                    changePositionX(disX)
                    changePositionY(disY)
                }
            })
        }

        if (gFocusSticker) {
            var stickers = meme.stickers
            stickers.forEach(function (sticker) {
                if (sticker.isDragging) {
                    changePositionX(disX)
                    changePositionY(disY)
                }
            })
        }


        renderCanvas()

        gCurrPosX = offsetX;
        gCurrPosY = offsetY;
    }
}


function onRenderStickers() {
    var stickers = getStickers()
    var strHtml = '<button class="stickers-btn" onclick="onChangePage(-1)"><img src="icons/stickers-left.png"></button><div class="stickers">'
    stickers.forEach(sticker => {
        strHtml += `<img src="${sticker.url}" class="sticker" id="sticker-num-${sticker.id}" onclick="drawSticker(${sticker.id})">`
    })
    strHtml += '</div><button class="stickers-btn" onclick="onChangePage(1)"><img src="icons/stickers-rigth.png"></button>'
    document.querySelector('.stickers-div').innerHTML = strHtml
    onAddStickersInPage()
}

function onAddStickersInPage() {
    var stickers = getStickersForDisplay()
    stickers.forEach(sticker => {
        var elSticker = document.querySelector(`#sticker-num-${sticker.id}`)
        elSticker.style.display = "inline-block"
    })
}


function drawSticker(stickerId) {
    var meme = getMeme()
    var isStickerExist = meme.stickers.find(sticker => sticker.id === stickerId)
    if (isStickerExist) {
        switchStickers(stickerId)
        gFocustxt = false
        gFocusSticker = true
    } else {
        var stickers = getStickers()
        var sticker = stickers[stickerId - 1]
        var elSticker = document.querySelector(`#sticker-num-${stickerId}`)
        gCtx.drawImage(elSticker, sticker.positionX, sticker.positionY)
        addSticker(sticker)
        gFocusSticker = true
        gFocustxt = false
    }
    renderCanvas()
}

function drawStickers() {
    var meme = getMeme()
    var stickers = meme.stickers
    if (stickers.length === 0) return
    else stickers.forEach(sticker => {
        var elSticker = document.querySelector(`#sticker-num-${sticker.id}`)
        gCtx.drawImage(elSticker, sticker.positionX, sticker.positionY, sticker.width, sticker.height)
    })
}

var gCurrPage = 1
var gStickersInPage = 3


function onChangePage(diff) {
    changePage(diff)
    onRenderStickers()
}

function changePage(diff) {
    gCurrPage += diff
    var lastPage = Math.ceil(gStickers.length / gStickersInPage)
    if (gCurrPage > lastPage) gCurrPage = 1
    else if (gCurrPage < 1) gCurrPage = lastPage
}

function getStickersForDisplay() {
    var from = (gCurrPage - 1) * gStickersInPage
    var to = from + gStickersInPage
    return gStickers.slice(from, to)
}
