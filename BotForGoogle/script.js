// ==UserScript==
// @name         Bot for google
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==
let keywords = ["Гобой","Флейта","Как звучить флейта","Фагот","Кларнет"];
let keyword = keywords[Math.floor(Math.random()*keywords.length)];
let btnK = document.getElementsByName('btnK')[1];
if(btnK!=undefined){ // Главная страница google или нет
    document.getElementsByName('q')[0].value = keyword;
    btnK.click();
}else{ // Если не на гланвой
    let links = document.links;
    let goToTheNextPage = true;
    let currentPage = document.getElementsByClassName("YyVfkd")[0].innerText;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf('xn----7sbab5aqcbiddtdj1e1g.xn--p1ai') != -1){
            link.click();
            goToTheNextPage = false;
            break;
        }
    }
    if(currentPage>10) location.href = "https://www.google.com/";
    else if (goToTheNextPage) pnnext.click();
}
