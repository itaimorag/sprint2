'use strict'

const SAVED_MEMES_KEY = "savedMemesDB"
var gSavedMemes = ''
// loadFromStorage(SAVED_MEMES_KEY)
var gKeywordSearchCountMap = { 'funny': 12, 'animal': 16, 'men': 10 }
var gImgs = [
    { id: 1, url: 'img/meme-imgs(square)/1.jpg', keywords: ['men', 'funny'] },
    { id: 2, url: 'img/meme-imgs(square)/2.jpg', keywords: ['funny', 'animal'] },
    { id: 3, url: 'img/meme-imgs(square)/3.jpg', keywords: ['men', 'animal'] },
    { id: 4, url: 'img/meme-imgs(square)/4.jpg', keywords: ['animal'] },
    { id: 5, url: 'img/meme-imgs(square)/5.jpg', keywords: ['funny', 'men'] },
    { id: 6, url: 'img/meme-imgs(square)/6.jpg', keywords: ['funny', 'men', 'smile'] },
    { id: 7, url: 'img/meme-imgs(square)/7.jpg', keywords: ['funny', 'men', 'smile'] },
    { id: 8, url: 'img/meme-imgs(square)/8.jpg', keywords: ['funny', 'men', 'smile'] },
    { id: 9, url: 'img/meme-imgs(square)/9.jpg', keywords: ['funny', 'men', 'smile', 'women'] },
    { id: 10, url: 'img/meme-imgs(square)/10.jpg', keywords: ['funny', 'men', 'smile'] },
    { id: 11, url: 'img/meme-imgs(square)/11.jpg', keywords: ['funny', 'men'] },
    { id: 12, url: 'img/meme-imgs(square)/12.jpg', keywords: ['funny', 'men'] },
    { id: 13, url: 'img/meme-imgs(square)/13.jpg', keywords: ['funny', 'men', 'smile'] },
    { id: 14, url: 'img/meme-imgs(square)/14.jpg', keywords: ['men'] },
    { id: 15, url: 'img/meme-imgs(square)/15.jpg', keywords: ['funny', 'men'] },
    { id: 16, url: 'img/meme-imgs(square)/16.jpg', keywords: ['funny', 'men', 'smile'] },
    { id: 17, url: 'img/meme-imgs(square)/17.jpg', keywords: ['funny', 'men'] },
    { id: 18, url: 'img/meme-imgs(square)/18.jpg', keywords: ['funny', 'men', 'smile', 'comic'] },
];
var gImgsForDisplay
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'center',
            color: 'red',
            area: {
                xStart: 0,
                xFinish: 0,
                yStart: 0,
                yfinish: 0
            }
        },
        {
            txt: 'Hello world',
            size: 20,
            align: 'left',
            color: 'blue',
            area: {
                xStart: 0,
                xFinish: 0,
                yStart: 200,
                yfinish: 0
            }
        }
    ]
}


function goUpOrDown(value) {
    gMeme.lines[gMeme.selectedLineIdx].area.yStart += value
}

function getgKeywordSearchCountMap() {
    return gKeywordSearchCountMap
}
function updategKeywordSearchCountMap(KeywordSearchCountMap) {
    gKeywordSearchCountMap = KeywordSearchCountMap
}
function setFilterByTxt(input) {
    gImgsForDisplay = gImgs
    if (input) {
        gImgsForDisplay = gImgsForDisplay.filter(img => img.keywords.toString().toLowerCase().includes(input.toLowerCase()))
    }
    return gImgsForDisplay
}

function getImgsForDisplay() {
    if (!gImgsForDisplay)
        return gImgs
    else {
        return gImgsForDisplay
    }
}

function getgImgs() {
    return gImgs
}

function getgMeme() {
    return gMeme
}
function updategMeme(idx) {
    gMeme.selectedImgId = idx
}

function setLineTxt(input) {

    gMeme.lines[gMeme.selectedLineIdx].txt = input
    renderMeme()

}
function changeRow() {
    if ((gMeme.selectedLineIdx + 1) === gMeme.lines.length) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    renderMeme()
}
function changeTextSize(size) {
    gMeme.lines[gMeme.selectedLineIdx].size += +size
}
function changePlace(place) {
    gMeme.lines[gMeme.selectedLineIdx].align = place
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
    renderMeme()
}

function saveMeme() {
    gSavedMemes = loadFromStorage(SAVED_MEMES_KEY)
    if ((!gSavedMemes) || (!gSavedMemes[0])) { gSavedMemes = [] }
    gSavedMemes.push(gMeme)
    saveToStorage(SAVED_MEMES_KEY, gSavedMemes)
}
function getSavedMeme() {
    return loadFromStorage(SAVED_MEMES_KEY)
}

function checkIfHaveSavedMemes() {
    return getSavedMeme()
}

function addLine() {
    gMeme.lines.push(createLine())
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.selectedLineIdx !== 0) gMeme.selectedLineIdx--
}

function createLine() {
    return ({
        txt: 'Hello human',
        size: 20,
        align: 'center',
        color: 'black',
        area: {
            xStart: 0,
            xFinish: 0,
            yStart: 200,
            yfinish: 0
        }
    })
}

function setgMeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 20,
                align: 'center',
                color: 'red',
                area: {
                    xStart: 0,
                    xFinish: 0,
                    yStart: 0,
                    yfinish: 0
                }
            },
            {
                txt: 'Hello world',
                size: 20,
                align: 'left',
                color: 'blue',
                area: {
                    xStart: 0,
                    xFinish: 0,
                    yStart: 200,
                    yfinish: 0
                }
            }
        ]
    }
}