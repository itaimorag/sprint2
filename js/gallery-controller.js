'use strict'


function onInitGallery() {
    var searchMap = getgKeywordSearchCountMap()
    var imgs = getImgsForDisplay()
    var strHtml = ''
    for (const property in searchMap) {
        document.querySelector(`.${property}-btn`).style.fontSize = searchMap[property] + 'px'
    }
    for (var i = 0; i < imgs.length; i++) {
        strHtml += `\n<img value="${imgs[i].id}" class="img${imgs[i].id}" onclick="onInit(this)" src="${imgs[i].url}" alt="">`
    }
    
    document.querySelector('.grid-container').innerHTML = strHtml
}

function showSavedMemes() {
var savedMemes=getSavedMeme()
var imgs=getgImgs()
var searchMap = getgKeywordSearchCountMap()
var strHtml = ''
    for (const property in searchMap) {
        document.querySelector(`.${property}-btn`).style.fontSize = searchMap[property] + 'px'
    }
    for (var i = 0; i < savedMemes.length; i++) {
        strHtml += `<img value="${savedMemes[i].selectedImgId}" class="img${savedMemes[i].selectedImgId}" onclick="onInit(this)" src="${imgs[(savedMemes[i].selectedImgId)-1].url}" alt="">`
    }
    document.querySelector(".gallery").classList.remove("active")
    document.querySelector(".saved-meme-btn").classList.add("active")
    document.querySelector('.grid-container').innerHTML = strHtml
    document.querySelector(".main-meme-generator").classList.add("hide")
    document.querySelector(".main-gallery").classList.remove("hide")


}

function addFontSize(btn) {
    onSetFilterByTxt(btn.innerText)
    var btnFontSize = btn.style.fontSize
    if (!btnFontSize) btnFontSize = '13px'
    if (btnFontSize >= 35) return
    var searchMap = getgKeywordSearchCountMap()
    if (!searchMap[`${btn.innerText.toLowerCase()}`]) searchMap[`${btn.innerText.toLowerCase()}`] = 13
    searchMap[`${btn.innerText.toLowerCase()}`]++
    updategKeywordSearchCountMap(searchMap)
    btnFontSize = +btnFontSize.slice(0, btnFontSize.indexOf('p'))
    btnFontSize = btnFontSize + 1 + 'px'
    btn.style.fontSize = btnFontSize
}

function onSetFilterByTxt(input, ev) {
    if (ev) {
        ev.preventDefault()
    }
    setFilterByTxt(input)
    onInitGallery()
}

function showMoreKeyWords() {

    document.querySelector('.key-words .hidden-words').style.display = 'flex'
    document.querySelector('.key-words').style.minHeight = 120 + 'px'
    document.querySelector('.hidden-words').classList.remove('hide')
}

function showGallery() {
    onInitGallery()
    document.querySelector(".gallery").classList.add("active")
    document.querySelector(".saved-meme-btn").classList.remove("active")
    document.querySelector(".main-meme-generator").classList.add("hide")
    document.querySelector(".main-gallery").classList.remove("hide")
}