
gFirstLoad = true

function renderCanvas() {
    gCanvas = document.querySelector('#meme-canvas')
    gCtx = gCanvas.getContext('2d')
    drawImg()
    renderText()
}

function drawImg() {
    var imgId = getSelectedImg()
    var elImg = document.querySelector(`#img-num-${imgId}`)
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function renderText() {
    var meme = getMeme()
    var lines = meme.lines
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
    gCtx.fillText(line.txt, 225, line.positionY)
    gCtx.strokeText(line.txt, 225, line.positionY)
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

function onChangePosition(num) {
    changePosition(num)
    renderCanvas()
}

function onSwitchLines() {
    switchLines()
    renderCanvas()
}