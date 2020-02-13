'use strict'

var gSavedImgs
var gSavedMemes
const keyMemes = 'Memes'
const keyImgs = 'Imgs'

// var gKeywords = {
//     'happy': 12,
//     'funny puk': 1
// }

var gImgs = [
    {
        id: 1,
        url: 'img/1.jpg',
        keywords: ['politic', 'tramp', 'funny']
    }, {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['happy', 'cute', 'love', 'dog', 'animal']
    }, {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['happy', 'cute', 'love', 'dog', 'baby', 'animal', 'kid']
    }, {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['happy', 'cute', 'cat', 'baby', 'animal', 'kid']
    }, {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['happy', 'baby', 'funny', 'kid']
    }, {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['movie', 'tv', 'celebrity']
    }, {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['happy', 'baby', 'funny', 'kid']
    }, {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['movie', 'celebrity']
    }, {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['happy', 'baby', 'funny', 'evil', 'kid']
    }, {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['politic', 'obama', 'funny']
    }, {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['sport']
    }, {
        id: 12,
        url: 'img/12.jpg',
        keywords: ['honesty', 'justice']
    }, {
        id: 13,
        url: 'img/13.jpg',
        keywords: ['movie', 'celebrity']
    }, {
        id: 14,
        url: 'img/14.jpg',
        keywords: ['movie', 'celebrity']
    }, {
        id: 15,
        url: 'img/15.jpg',
        keywords: ['movie', 'celebrity']
    }, {
        id: 16,
        url: 'img/16.jpg',
        keywords: ['movie', 'celebrity']
    }, {
        id: 17,
        url: 'img/17.jpg',
        keywords: ['politic', 'putin', 'funny']
    }, {
        id: 19,
        url: 'img/18.jpg',
        keywords: ['movie', 'cartoon']
    }
]

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        font: 'impact',
        size: 40,
        align: 'center',
        OutlineColor: 'black',
        fillColor: 'white',
        positionX: 225,
        positionY: 50,
        isDragging: false
    }, {
        txt: 'I love Falafel',
        font: 'impact',
        size: 40,
        align: 'center',
        OutlineColor: 'black',
        fillColor: 'white',
        positionX: 225,
        positionY: 430,
        isDragging: false
    }],
}

function getMeme() {
    return gMeme
}

function getSavedMemes() {
    return gSavedMemes
}

function getSavedImgs() {
    return gSavedImgs
}

function getImges() {
    return gImgs
}

function updateMemeImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getSelectedImg() {
    return gMeme.selectedImgId
}

function changeText(txt) {
    if (gMeme.lines.length === 0) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = txt
}

function changeAlign(align) {
    if (gMeme.lines.length === 0) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].align = align
}

function changeOutlineColor(color) {
    if (gMeme.lines.length === 0) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].OutlineColor = color
}

function changeFillColor(color) {
    if (gMeme.lines.length === 0) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].fillColor = color
}

function changeSize(num) {
    if (gMeme.lines.length === 0) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size += num
}

function changeFont(font) {
    if (gMeme.lines.length === 0) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].font = font
}

function changePosForMobile(pos) {
    gMeme.lines.forEach(line => {
        line.positionX = (pos / 2)
        if (line.positionY > pos - 20) line.positionY = (pos - 20)
    })
}

function changePositionY(num) {
    if (gMeme.lines.length === 0) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].positionY += num
}

function changePositionX(num) {
    if (gMeme.lines.length === 0) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].positionX += num
}

function switchLines() {
    if (gMeme.lines.length === 0) return
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

function switchLinesDrogDrop(idx) {
    gMeme.selectedLineIdx = idx
}

function deleteLine() {
    if (gMeme.lines.length === 0) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(lineIdx, 1)
}

function updateDragging(idx, bool) {
    gMeme.lines[idx].isDragging = bool
}

function addLine() {
    var line = {
        txt: 'Add new text here',
        font: 'impact',
        size: 40,
        align: 'center',
        OutlineColor: 'black',
        fillColor: 'white',
        positionX: 225,
        positionY: 225
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function renderLocalStorage() {
    gSavedMemes = loadFromStorage(keyMemes)
    gSavedImgs = loadFromStorage(keyImgs)
}

function saveImg(data) {
    gSavedImgs.unshift(data)
    saveToStorage(keyImgs, gSavedImgs)
}

function saveAndRestartMeme() {
    gSavedMemes.unshift(gMeme)
    saveToStorage(keyMemes, gSavedMemes)
    restartMeme()
}

function restartMeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [{
            txt: 'I never eat Falafel',
            font: 'impact',
            size: 40,
            align: 'center',
            OutlineColor: 'black',
            fillColor: 'white',
            positionX: 225,
            positionY: 50,
            isDragging: false
        }, {
            txt: 'I love Falafel',
            font: 'impact',
            size: 40,
            align: 'center',
            OutlineColor: 'black',
            fillColor: 'white',
            positionX: 225,
            positionY: 430,
            isDragging: false
        }],
    }
}

function editCurrMeme(idx) {
    gMeme = gSavedMemes[idx]
}
