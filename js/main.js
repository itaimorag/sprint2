'use strict'
let gElCanvas
let gCtx
let gIsClicked = false
let gStartPos
let gStartPosLine
let gImportedImgSrc
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
let gCurrShape = 'triangle'
let gColor

function onSelectImg(id) {
    document.querySelector(".main-meme-generator").classList.remove("hide")
    document.querySelector(".gallery").classList.remove("active")
    document.querySelector(".main-gallery").classList.add("hide")
    document.querySelector('.canvas-container').innerHTML = ` <canvas
    id="my-canvas"
    height="500"
    width="500"
    ></canvas>`
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    addListeners()
    renderCanvas()
    showCanvas(id)
}

function showCanvas(id) {
    updategMeme(id)
    var imgs = getgImgs()
    var currMeme = getgMeme()
    const img = new Image()
    img.src = `${imgs.find(element => element.id === currMeme.selectedImgId).url}`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xEnd,yEnd
        currMeme.lines.map((line, index) => {
            drawText(line.txt, line.align, line.size + 30 + line.area.yStart, line.size, line.color)

            document.getElementById('line-placeholder').value = currMeme.lines[currMeme.selectedLineIdx].txt
        });
    }
}

function renderMeme() {
    var currMeme = getgMeme()
    if (currMeme.selectedImgId !== 0) {
        const img = new Image()
        img.src = `img/meme-imgs(square)/${currMeme.selectedImgId}.jpg`
        img.onload = () => {
            gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
            currMeme.lines.map((line, index) => {
                drawText(line.txt, line.align, line.size + 30 + line.area.yStart, line.size, line.color)
                document.getElementById('line-placeholder').value = currMeme.lines[currMeme.selectedLineIdx].txt

            });
        }
    }
    else {
        gCtx.drawImage(gImportedImgSrc, 0, 0, gElCanvas.width, gElCanvas.height)
        currMeme.lines.map((line, index) => {
            drawText(line.txt, line.align, line.size + 30 + line.area.yStart, line.size, line.color)
            document.getElementById('line-placeholder').value = currMeme.lines[0].txt
        });

    }
}

function rowUpDown(symbol) {
    if (symbol === '↑') goUpOrDown(-10)
    else goUpOrDown(+10)
    renderMeme()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onDown(ev) {
    gIsClicked = true
    document.body.style.cursor = 'pointer'
    const pos = getEvPos(ev)
    gStartPos = pos
    gStartPosLine = pos
}

function onMove(ev) {
    if (!gIsClicked) return
    const pos = getEvPos(ev)
    draw(pos, gStartPosLine.x, gStartPosLine.y)
    gStartPosLine = pos

}

function onUp() {
    gIsClicked = false
    document.body.style.cursor = 'context-menu'
}
function onChangecolor(color) {
    changeColor(color)
}

function onSaveMeme() {
    saveMeme()
    document.querySelector('.main-menu .saved-meme-li').classList.remove('hide')
}

function onChangeTextSize(size) {
    changeTextSize(size)
    renderMeme()
}
function onChangePlace(place) {
    changePlace(place)
    renderMeme()
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}
function drawText(text, xPref, y, sizeFont, color) {
    var x
    gCtx.font = `${sizeFont}px Arial`
    switch (xPref) {
        case 'left':
            x = 20
            break;
        case 'right':
            x = (gElCanvas.width) - ((gCtx.measureText(text).width) + 20)
            break;
        case 'center':
            x = ((gElCanvas.width) / 2) - (((gCtx.measureText(text).width) / (2)))
            break;
        default:
            x = ((gElCanvas.width) / 2) - (((gCtx.measureText(text).width) / (2)))
    }

    gCtx.lineWidth = 2
    gCtx.strokeStyle = color
    gCtx.fillStyle = 'black'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function toggleMenu() {
    document.querySelector('.close-nav-il').classList.toggle('hide')
    document.querySelector('.hamburger-btn').classList.toggle('hide')
    document.querySelector('.main-menu').classList.toggle('hide')
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
function renderCanvas() {
    gCtx.fillStyle = "#ffffff"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}
function onImgInput(ev) {
    var currMeme = getgMeme()
    document.querySelector(".main-meme-generator").classList.remove("hide")
    document.querySelector(".gallery").classList.remove("active")
    document.querySelector(".main-gallery").classList.add("hide")
    document.querySelector('.canvas-container').innerHTML = ` <canvas
    id="my-canvas"
    height="500"
    width="500"
    ></canvas>`
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    addListeners()
    renderCanvas()
    loadImageFromInput(ev, renderImg)
    currMeme.lines.map((line, index) => {
        drawText(line.txt, line.align, line.size + 30 + line.area.yStart, line.size, line.color)
        document.getElementById('line-placeholder').value = currMeme.lines[0].txt
    });
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
        gImportedImgSrc = img
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}