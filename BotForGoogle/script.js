// ==UserScript==
// @name         Bot for google
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Флейта","Как звучить флейта","Фагот","Кларнет"],
    "crushdrummers.ru":["барабанное шоу crush","crushDrummers","шоу барабанщиков crush"]
}
let site = Object.keys(sites)[Math.floor(Math.random()*Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[Math.floor(Math.random()*keywords.length)];
let btnK = document.getElementsByName('btnK')[1];
let googleInput = document.getElementsByName('q')[0];
if(btnK!=undefined){ // Главная страница google или нет
    document.cookie = "site="+site;
    let i =0;
    let timerId = setInterval(function(){
        googleInput.value += keyword[i++]
        if(keyword.length == i){
            clearInterval(timerId);
            btnK.click();
        }
    },500);
}else if(location.hostname === "www.google.com"){ // Если не на гланвой, но всё ещё на сайте google
    let links = document.links;
    let goToTheNextPage = true;
    let currentPage = document.getElementsByClassName("YyVfkd")[0].innerText;
    site = getCookie("site");
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site) != -1){
            link.click();
            goToTheNextPage = false;
            break;
        }
    }
    if(currentPage>10) location.href = "https://www.google.com/";
    else if (goToTheNextPage) pnnext.click();
}else{
    if(Math.random() > 0.8) location.href = "https://www.google.com/";
    let links = document.links;
    setInterval(function(){
        let index = Math.floor(Math.random()*links.length)
        let link = links[index];
        if(link.href.includes(location.hostname)) link.click();
    },3000);
}
