'use strict'

var gCanvas
var gCtx
var gFirstLoad = true
var gIsLocalImg = false
var gLocalImg

function renderCanvas() {

    gCanvas = document.querySelector('#meme-canvas')
    gCtx = gCanvas.getContext('2d')

    if (isMobileDevice() && gFirstLoad) resizeCanvas()
    if (gIsLocalImg) drawLocalImg(gLocalImg)
    else drawImg()

    // drawImg()
    renderText()

    window.addEventListener('keydown', doKeyDown, true)
    addDragDrop()
}

function resizeCanvas() {
    gCanvas.width = window.innerWidth - 15
    gCanvas.height = window.innerWidth - 15
    changePosForMobile(window.innerWidth - 15)
    document.querySelector('.meme-control').style.width = `"${window.innerWidth}px"`
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
    gCtx.lineWidth = '1'
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
    console.log(data)
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

function onShareMeme() {
    if (navigator.share) {
        navigator.share({
            title: 'Come see my new Meme!',
            url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
        }).then(() => {
            console.log('Thanks for sharing!');
        })
            .catch(console.error);
    } else {
        // fallback
    }
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
    const data = gCanvas.toDataURL()
    saveImg(data)
    saveAndRestartMeme()
    onGetMemePage()
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
            offsetX = ev.changedTouches[0].pageX - gCanvas.getBoundingClientRect().left
            offsetY = ev.changedTouches[0].pageY - gCanvas.getBoundingClientRect().top
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
