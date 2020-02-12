var gKeywords = {
    'happy': 12,
    'funny puk': 1
}

var gImgs = [
    {
        id: 1,
        url: '../img/1.jpg',
        // keywords: ['happy']
    }, {
        id: 2,
        url: '../img/2.jpg',
        // keywords: ['happy']
    }, {
        id: 3,
        url: '../img/3.jpg',
        // keywords: ['happy']
    }, {
        id: 4,
        url: '../img/4.jpg',
        // keywords: ['happy']
    }, {
        id: 5,
        url: '../img/5.jpg',
        // keywords: ['happy']
    }, {
        id: 6,
        url: '../img/6.jpg',
        // keywords: ['happy']
    }, {
        id: 7,
        url: '../img/7.jpg',
        // keywords: ['happy']
    }, {
        id: 8,
        url: '../img/8.jpg',
        // keywords: ['happy']
    }, {
        id: 9,
        url: '../img/9.jpg',
        // keywords: ['happy']
    }, {
        id: 10,
        url: '../img/10.jpg',
        // keywords: ['happy']
    }, {
        id: 11,
        url: '../img/11.jpg',
        // keywords: ['happy']
    }, {
        id: 12,
        url: '../img/12.jpg',
        // keywords: ['happy']
    }, {
        id: 13,
        url: '../img/13.jpg',
        // keywords: ['happy']
    }, {
        id: 14,
        url: '../img/14.jpg',
        // keywords: ['happy']
    }, {
        id: 15,
        url: '../img/15.jpg',
        // keywords: ['happy']
    }, {
        id: 16,
        url: '../img/16.jpg',
        // keywords: ['happy']
    }, {
        id: 17,
        url: '../img/17.jpg',
        // keywords: ['happy']
    }, {
        id: 19,
        url: '../img/18.jpg',
        // keywords: ['happy']
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
        OutlineColor: 'white',
        fillColor: 'white',
        positonY: 50
    }, {
        txt: 'I love Falafel',
        font: 'impact',
        size: 40,
        align: 'center',
        OutlineColor: 'white',
        fillColor: 'white',
        positonY: 400
    }]
}

function getMeme() {
    return gMeme
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
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = txt
}

function changeAlign(align) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].align = align
}

function changeOutlineColor(color) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].OutlineColor = color
}

function changeFillColor(color) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].fillColor = color
}

function changeSize(num) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size += num
}

function changeFont(font) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].font = font
}

function changePosition() {

}

    // var selectedImg = gImgs.find(img => img.id === gMeme.selectedImgId)
    // console.log(selectedImg)
    // return selectedImg
