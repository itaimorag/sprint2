'use strict'


function onInitGallery(){
    var imgs=getgImgs()
    var strHtml=''
    for(var i=0;i<imgs.length;i++){
        strHtml+=`<img value="${imgs[i].id}" class="img${imgs[i].id}" onclick="onInit(this)" src="${imgs[i].url}" alt="">`
    }
    document.querySelector('.grid-container').innerHTML=strHtml
}

function showGallery(){
    document.querySelector(".main-meme-generator").classList.add("hide")
    document.querySelector(".gallery").classList.add("active")
    document.querySelector(".main-gallery").classList.remove("hide")
}