'use strict'
let gElCanvas
let gCtx
let gIsClicked = false
let gStartPos
let gStartPosLine

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
let gCurrShape = 'triangle'
let gColor

function onInit(imgNumber) {
    document.querySelector(".main-meme-generator").classList.remove("hide")
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
    showCanvas(imgNumber)
}



function showCanvas(imgNumber) {
    const img = new Image()
    img.src = `${imgNumber.src.substring(22, imgNumber.src.length)}`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xEnd,yEnd
        var currMeme= getgMeme()
        console.log(`foo = `, gCtx.measureText(currMeme.lines[currMeme.selectedLineIdx].txt))
        drawText(currMeme.lines[currMeme.selectedLineIdx].txt, currMeme.lines[currMeme.selectedLineIdx].align,currMeme.lines[currMeme.selectedLineIdx].size+30,currMeme.lines[currMeme.selectedLineIdx].size,currMeme.lines[currMeme.selectedLineIdx].color)
    }

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

function onDown(ev) {
    // console.log('Im from onDown')
    //Get the ev pos from mouse or touch
    gIsClicked = true
    document.body.style.cursor = 'pointer'
    const pos = getEvPos(ev)
    gStartPos = pos
    gStartPosLine = pos
    //Save the pos we start from 

}

function onMove(ev) {
    if (!gIsClicked) return
    //   console.log('Im from onMove')
    const pos = getEvPos(ev)
    //Calc the delta , the diff we moved
    // draw(pos,gStartPos.x,gStartPos.y)
    draw(pos, gStartPosLine.x, gStartPosLine.y)
    // notStraightLine(pos,dx,dy)
    //Save the last pos , we remember where we`ve been and move accordingly
    gStartPosLine = pos
    //The canvas is render again after every move

}

function onUp() {
    // console.log('Im from onUp')
    gIsClicked = false
    document.body.style.cursor = 'context-menu'
}

function getEvPos(ev) {
    // console.log(`ev = `, ev)
    //Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}
function drawText(text, xPref, y,sizeFont,color) {
    var x
    switch(xPref) {
        case 'left':
          x=20
          break;
        case 'right':
            console.log(`right = `)
          x=(gElCanvas.width)- ((gCtx.measureText(text).width)+20)
          console.log(`x = `, x)
          break;
          case 'center':
            console.log(`center = `)
          x=((gElCanvas.width)/2)-((gCtx.measureText(text).width)/2)
          console.log(`x = `, x)
          break;
        default:
            x=((gElCanvas.width/2))-((gCtx.measureText(text).width)/2)
          // code block
      }

    gCtx.lineWidth = 2
    gCtx.strokeStyle = color
    gCtx.fillStyle = 'black'
  
    gCtx.font = `${sizeFont}px Arial`
    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
  }

//color
function changeColor(color) {
    gColor = color
}
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
function renderCanvas() {
    //Set the backgournd color to grey 
    gCtx.fillStyle = "#ffffff"
    //Clear the canvas,  fill it with grey background
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}