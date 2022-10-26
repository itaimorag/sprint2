'use strict'


var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}
var gImgs = [
    {id: 1, url: './img/meme-imgs (square)/1.jpg', keywords: ['men', 'funny']},
    {id: 2, url: './img/meme-imgs (square)/2.jpg', keywords: ['funny']},
    {id: 3, url: './img/meme-imgs (square)/3.jpg', keywords: ['men', 'animal']},
    {id: 4, url: './img/meme-imgs (square)/4.jpg', keywords: ['animal']},
    {id: 5, url: './img/meme-imgs (square)/5.jpg', keywords: ['funny', 'men']},
    {id: 6, url: './img/meme-imgs (square)/6.jpg', keywords: ['funny', 'men','smile']},
    {id: 7, url: './img/meme-imgs (square)/7.jpg', keywords: ['funny', 'men','smile']},
    {id: 8, url: './img/meme-imgs (square)/8.jpg', keywords: ['funny', 'men','smile']},
    {id: 9, url: './img/meme-imgs (square)/9.jpg', keywords: ['funny', 'men','smile']},
    {id: 10, url: './img/meme-imgs (square)/10.jpg', keywords: ['funny', 'men','smile']},
    {id: 11, url: './img/meme-imgs (square)/11.jpg', keywords: ['funny', 'men']},
    {id: 12, url: './img/meme-imgs (square)/12.jpg', keywords: ['funny', 'men']},
    {id: 13, url: './img/meme-imgs (square)/13.jpg', keywords: ['funny', 'men','smile']},
    {id: 14, url: './img/meme-imgs (square)/14.jpg', keywords: ['men']},
    {id: 15, url: './img/meme-imgs (square)/15.jpg', keywords: ['funny', 'men']},
    {id: 16, url: './img/meme-imgs (square)/16.jpg', keywords: ['funny', 'men','smile']},
    {id: 17, url: './img/meme-imgs (square)/17.jpg', keywords: ['funny', 'men']},
    {id: 18, url: './img/meme-imgs (square)/18.jpg', keywords: ['funny', 'men','smile']},
];
var gMeme = {
 selectedImgId: 5,
 selectedLineIdx: 0,
 lines: [
 {
 txt: 'I sometimes eat Falafel',
 size: 20,
 align: 'center',
 color: 'red'
 }
 ]
}

function getgMeme(){
    return gMeme
}
