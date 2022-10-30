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
var gIsTextMoving = false

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
            drawText(line.txt, line.align, line.area.yStart, line.size, line.color, line.area.xStart, line.isStroked)

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
                drawText(line.txt, line.align, line.area.yStart, line.size, line.color, line.area.xStart, line.isStroked)
                document.getElementById('line-placeholder').value = currMeme.lines[currMeme.selectedLineIdx].txt

            });
        }

    }
    else {
        gCtx.drawImage(gImportedImgSrc, 0, 0, gElCanvas.width, gElCanvas.height)
        currMeme.lines.map((line, index) => {
            drawText(line.txt, line.align, line.area.yStart, line.size, line.color, line.area.xStart, line.isStroked)
            document.getElementById('line-placeholder').value = currMeme.lines[0].txt
        });

    }
    setgCounterLine()
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
        renderMeme()
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
    const pos = getEvPos(ev)
    if (!checkIfOnText(pos)) return
    gIsTextMoving = true
    //Save the pos we start from 
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    if (!gIsTextMoving) return
    const pos = getEvPos(ev)
    //Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)
    gStartPos = pos
    renderMeme()

}

function onUp() {
    gIsTextMoving = false
    document.body.style.cursor = 'grab'
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
function drawText(text, xPref, y, sizeFont, color, xStart, isStroked) {
    var x
    var area
    gCtx.beginPath()
    gCtx.font = `${sizeFont}px Arial`
    if (!xStart) {
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
    }
    else x = xStart

    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    area = {
        xStart: x,
        xFinish: x + gCtx.measureText(text).width,
        yStart: y,
        yFinish: y - sizeFont
    }

    updateLine(area)
    // gCtx.textBaseline = "hanging"
    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    if(isStroked){
        gCtx.lineWidth   = 1;
        gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
    }
    gCtx.closePath()
    // gCtx.beginPath()
    // gCtx.strokeStyle = color
    // gCtx.strokeText(text, x, y)
}

function toggleMenu() {
    document.querySelector('.close-nav-il').classList.toggle('hide')
    document.querySelector('.hamburger-btn').classList.toggle('hide')
    document.querySelector('.main-menu').classList.toggle('hide')
}

function renderLine() {

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

function onStroke(){
    changeStroke()
    renderMeme()
}