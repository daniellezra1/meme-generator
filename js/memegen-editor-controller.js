
// var gFirstLoad = true
var gFirstLinePos = 50
var gSecondLinePos = 400


function renderCanvas() {
    gCanvas = document.querySelector('#meme-canvas')
    gCtx = gCanvas.getContext('2d')
    drawImg()
    renderText(gFirstLinePos)
    renderText(gSecondLinePos)
}

function drawImg() {
    var imgId = getSelectedImg()
    var elImg = document.querySelector(`#img-num-${imgId}`)
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

// function renderText() {
//     if (gFirstLoad) {
//         var meme = getMeme()
//         var txt = meme.lines[0].txt
//         document.querySelector('.control-txt-input').value = txt
//         gFirstLoad = false
//         drawText(txt, 225, 50)
//     } else {
//         var elTxt = document.querySelector('.control-txt-input').value
//         changeLine(elTxt, 0)
//         drawText(elTxt, 225, 50)
//     }
// }

function renderText(pos) {
    var meme = getMeme()
    var txt = meme.lines[0].txt
    document.querySelector('.control-txt-input').value = txt
    drawText(txt, pos)
}

function drawText(txt, pos) {
    var meme = getMeme()
    var lineIdx = meme.selectedLineIdx
    // gCtx.lineWidth = '0.1'
    gCtx.strokeStyle = meme.lines[lineIdx].OutlineColor
    gCtx.fillStyle = meme.lines[lineIdx].fillColor
    gCtx.font = `${meme.lines[lineIdx].size}px ${meme.lines[lineIdx].font}`
    gCtx.textAlign = meme.lines[lineIdx].align
    gCtx.fillText(txt, 225, pos)
    gCtx.strokeText(txt, 225, pos)
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
    // changePosition()
    gFirstLinePos += num
    renderCanvas()
}