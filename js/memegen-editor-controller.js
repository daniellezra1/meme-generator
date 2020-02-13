'use strict'

var gCanvas
var gCtx
var gFirstLoad = true

function renderCanvas() {
    gCanvas = document.querySelector('#meme-canvas')
    gCtx = gCanvas.getContext('2d')

    if (isMobileDevice() && gFirstLoad) resizeCanvas()
    drawImg()
    renderText()
    window.addEventListener('keydown', doKeyDown, true)

    addDragDrop()

}

function isMobileDevice() {
    return (window.innerWidth < 500)
}

function resizeCanvas() {
    gCanvas.width = window.innerWidth - 20
    gCanvas.height = window.innerWidth - 20
    changePosForMobile(window.innerWidth - 20)
    document.querySelector('.meme-control').style.width = `"${window.innerWidth}px"`
    gFirstLoad = false
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
    // gCtx.lineWidth = '0.1'
    gCtx.strokeStyle = line.OutlineColor
    gCtx.fillStyle = line.fillColor
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, line.positionX, line.positionY)
    gCtx.strokeText(line.txt, line.positionX, line.positionY)
}

function onChangeText(txt) {
    changeText(txt)
    renderCanvas()
}

function onChangeAlign(align) {
    changeAlign(align)
    renderCanvas()
}

function onChangeOutlineColor(value) {
    changeOutlineColor(value)
    renderCanvas()
}

function onChangeFillColor(value) {
    changeFillColor(value)
    renderCanvas()
}

function onChangeSize(num) {
    changeSize(num)
    renderCanvas()
}

function onChangeFont(font) {
    changeFont(font)
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
    renderCanvas()
}

function onDeleteLine() {
    deleteLine()
    renderCanvas()
}

function onAddLine() {
    addLine()
    renderCanvas()
}

function onDownloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'Img'
}


function uploadImg(elForm, ev) {
    ev.preventDefault()
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg")

    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)
    }
    doUploadImg(elForm, onSuccess)
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm)
    fetch('http://ca-upload.com/here/upload.php', {
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

function doKeyDown(ev) {
    switch (ev.keyCode) {
        case 38:  /* Up */
            ev.preventDefault()
            onChangePositionY(-2)
            break;
        case 40:  /* Down */
            ev.preventDefault()
            onChangePositionY(2)
            break;
        case 37:  /* Left */
            ev.preventDefault()
            onChangePositionX(-2)
            break;
        case 39:  /* Right */
            ev.preventDefault()
            onChangePositionX(2)
            break;
    }
}



var gDragOn = false
var gCurrPosX
var gCurrPosY

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
    if (ev.type === 'touchmove') {
        offsetX = ev.changedTouches[screenX].pageX
        offsetY = ev.changedTouches[screenY].pageY
    } else {
        offsetX = ev.offsetX
        offsetY = ev.offsetY
    }

    var meme = getMeme()
    var lines = meme.lines
    var idx = 0
    lines.forEach(function (line) {
        if (offsetX > line.positionX - 150 &&
            offsetX < line.positionX + 150 &&
            offsetY > line.positionY - 50 &&
            offsetY < line.positionY + 10) {
            switchLinesDrogDrop(idx)
            updateDragging(idx, true)
            document.querySelector('.control-txt-input').value = line.txt
            gDragOn = true
            return
        }
        idx++
    })

    gCurrPosX = offsetX
    gCurrPosY = offsetY
}


function dropText(ev) {

    ev.preventDefault()
    ev.stopPropagation()

    gDragOn = false

    var meme = getMeme()
    var lines = meme.lines
    var idx = 0
    lines.forEach(function (line) {
        if (line.isDragging) {
            updateDragging(idx, false)
            return
        }
        idx++
    })

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
            offsetX = ev.changedTouches[screenX].pageX
            offsetY = ev.changedTouches[screenY].pageY
        } else {
            offsetX = ev.offsetX
            offsetY = ev.offsetY
        }

        var disX = offsetX - gCurrPosX;
        var disY = offsetY - gCurrPosY;

        var meme = getMeme()
        var lines = meme.lines
        lines.forEach(function (line) {
            if (line.isDragging) {
                changePositionX(disX)
                changePositionY(disY)
            }
        })

        renderCanvas()

        gCurrPosX = offsetX;
        gCurrPosY = offsetY;
    }
}