
gFirstLoad = true

function renderCanvas() {
    gCanvas = document.querySelector('#meme-canvas')
    gCtx = gCanvas.getContext('2d')
    if (isMobileDevice()) resizeCanvas()
    drawImg()
    renderText()
}

// function isMobileDevice() {
//     return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)
// }

function isMobileDevice() {
    return (window.innerWidth < 500)
}

function resizeCanvas() {
    gCanvas.width = window.innerWidth - 20
    gCanvas.height = window.innerWidth - 20
    changePosForMobile(window.innerWidth - 20)
    document.querySelector('.meme-control').style.width = `"${window.innerWidth}px"`
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