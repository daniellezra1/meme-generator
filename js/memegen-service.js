'use strict'

var gSavedImgs
var gSavedMemes
const keyMemes = 'Memes'
const keyImgs = 'Imgs'

var gKeywords = {
    'happy': 12,
    'funny': 1,
    'celebrity': 7,
    'politic': 2,
    'cute': 12,
    'animal': 1,
    'books': 0,
    'comics': 6,
    'cartoon': 0,
    'baby': 1,
    'love': 7,
    'sport': 2,
    'kid': 12,
    'dog': 2,
    'cat': 2,
    'drinks': 0,
    'movie': 4,
    'tv': 7,
}

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
        id: 18,
        url: 'img/18.jpg',
        keywords: ['movie', 'cartoon']
    }, {
        id: 19,
        url: 'img/19.jpg',
        keywords: ['movie', 'cartoon']
    }, {
        id: 20,
        url: 'img/20.jpg',
        keywords: ['movie', 'cartoon']
    }, {
        id: 21,
        url: 'img/21.jpg',
        keywords: ['movie', 'cartoon']
    }, {
        id: 22,
        url: 'img/22.jpg',
        keywords: ['movie', 'cartoon']
    }, {
        id: 23,
        url: 'img/23.jpg',
        keywords: ['movie', 'cartoon']
    }, {
        id: 24,
        url: 'img/24.jpg',
        keywords: ['movie', 'cartoon']
    }, {
        id: 25,
        url: 'img/25.jpg',
        keywords: ['movie', 'cartoon']
    }
]

var gStickers = [
    {
        id: 1,
        url: 'stickers/1.png',
        positionX: 225,
        positionY: 225,
        isDragging: false,
        height: 32,
        width: 85

    }, {
        id: 2,
        url: 'stickers/2.png',
        positionX: 225,
        positionY: 225,
        isDragging: false,
        height: 42,
        width: 103
    }, {
        id: 3,
        url: 'stickers/3.png',
        positionX: 225,
        positionY: 225,
        isDragging: false,
        height: 71,
        width: 74
    }, {
        id: 4,
        url: 'stickers/4.png',
        positionX: 225,
        positionY: 225,
        isDragging: false,
        height: 102,
        width: 102
    }, {
        id: 5,
        url: 'stickers/5.png',
        positionX: 225,
        positionY: 225,
        isDragging: false,
        height: 74,
        width: 82
    }, {
        id: 6,
        url: 'stickers/6.png',
        positionX: 225,
        positionY: 225,
        isDragging: false,
        height: 92,
        width: 62
    }, {
        id: 7,
        url: 'stickers/7.png',
        positionX: 225,
        positionY: 225,
        isDragging: false,
        height: 85,
        width: 49
    }, {
        id: 8,
        url: 'stickers/8.png',
        positionX: 225,
        positionY: 225,
        isDragging: false,
        height: 68,
        width: 77
    }, {
        id: 9,
        url: 'stickers/9.png',
        positionX: 225,
        positionY: 225,
        isDragging: false,
        height: 68,
        width: 70
    }, {
        id: 10,
        url: 'stickers/10.png',
        positionX: 225,
        positionY: 225,
        isDragging: false,
        height: 71,
        width: 75
    }, {
        id: 11,
        url: 'stickers/11.png',
        positionX: 225,
        positionY: 225,
        isDragging: false,
        height: 53,
        width: 75
    }, {
        id: 12,
        url: 'stickers/12.png',
        positionX: 225,
        positionY: 225,
        isDragging: false,
        height: 58,
        width: 64
    }
]

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    selectedStickerIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        font: 'impact',
        size: 40,
        align: 'center',
        OutlineColor: 'black',
        fillColor: 'white',
        positionX: 250,
        positionY: 50,
        isDragging: false
    }, {
        txt: 'I love Falafel',
        font: 'impact',
        size: 40,
        align: 'center',
        OutlineColor: 'black',
        fillColor: 'white',
        positionX: 250,
        positionY: 430,
        isDragging: false
    }],
    stickers: []
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

function getStickers() {
    return gStickers
}

function getKeywords() {
    return gKeywords
}

function updateMemeImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getSelectedImg() {
    return gMeme.selectedImgId
}

function editMeme(key, value) {
    if (gMeme.lines.length === 0) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx][key] = value
}

// function changeText(txt) {
//     if (gMeme.lines.length === 0) return
//     const lineIdx = gMeme.selectedLineIdx
//     gMeme.lines[lineIdx].txt = txt
// }

// function changeAlign(align) {
//     if (gMeme.lines.length === 0) return
//     const lineIdx = gMeme.selectedLineIdx
//     gMeme.lines[lineIdx].align = align
// }

// function changeOutlineColor(color) {
//     if (gMeme.lines.length === 0) return
//     const lineIdx = gMeme.selectedLineIdx
//     gMeme.lines[lineIdx].OutlineColor = color
// }

// function changeFillColor(color) {
//     if (gMeme.lines.length === 0) return
//     const lineIdx = gMeme.selectedLineIdx
//     gMeme.lines[lineIdx].fillColor = color
// }

// function changeFont(font) {
//     if (gMeme.lines.length === 0) return
//     const lineIdx = gMeme.selectedLineIdx
//     gMeme.lines[lineIdx].font = font
// }

function changeSize(num) {
    if (gFocustxt) {
        if (gMeme.lines.length === 0) return
        const lineIdx = gMeme.selectedLineIdx
        gMeme.lines[lineIdx].size += num
    }
    if (gFocusSticker) {
        if (gMeme.stickers.length === 0) return
        const stickersIdx = gMeme.selectedStickerIdx
        gMeme.stickers[stickersIdx].height += num
        gMeme.stickers[stickersIdx].width += num
    }
}

function changePosTexts(width, height) {
    gMeme.lines.forEach(line => {
        line.positionX = (width / 2)
        if (line.positionY > height) line.positionY = (height - 20)
    })
}

function changePosForMobile(pos) {
    gMeme.lines.forEach(line => {
        line.positionX = (pos / 2)
        if (line.positionY > pos - 20) line.positionY = (pos - 20)
    })
}

function changePositionY(num) {
    if (gFocustxt) {
        if (gMeme.lines.length === 0) return
        const lineIdx = gMeme.selectedLineIdx
        gMeme.lines[lineIdx].positionY += num
    }
    if (gFocusSticker) {
        if (gMeme.stickers.length === 0) return
        const stickerIdx = gMeme.selectedStickerIdx
        gMeme.stickers[stickerIdx].positionY += num
    }
}

function changePositionX(num) {
    if (gFocustxt) {
        if (gMeme.lines.length === 0) return
        const lineIdx = gMeme.selectedLineIdx
        gMeme.lines[lineIdx].positionX += num
    }
    if (gFocusSticker) {
        if (gMeme.stickers.length === 0) return
        const stickerIdx = gMeme.selectedStickerIdx
        gMeme.stickers[stickerIdx].positionX += num
    }
}

function switchLines() {
    if (gMeme.lines.length === 0) return
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

function switchLinesDrogDrop(idx) {
    gMeme.selectedLineIdx = idx
}

function switchStickers(id) {
    var focusSticker = gMeme.stickers.findIndex(sticker => sticker.id === id)
    gMeme.selectedStickerIdx = focusSticker
}

function switchStickersDrogDrop(idx) {
    gMeme.selectedStickerIdx = idx
}

function deleteLine() {
    if (gMeme.lines.length === 0) return
    if (gFocusSticker) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.selectedLineIdx = 0
    gMeme.lines.splice(lineIdx, 1)
}

function updateDragging(idx, type, bool) {
    if (type === 'lines') gMeme.lines[idx].isDragging = bool
    if (type === 'stickers') gMeme.stickers[idx].isDragging = bool
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

function addSticker(sticker) {
    gMeme.stickers.push(sticker)
    gMeme.selectedStickerIdx = gMeme.stickers.length - 1
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
        selectedStickerIdx: 0,
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
        stickers: []
    }
}

function editCurrMeme(idx) {
    gMeme = gSavedMemes[idx]
}

function addClickToKeyword(txt) {
    gKeywords[txt]++
}