// ==UserScript==
// @name         nsfb
// @namespace    none
// @version      0.1
// @description  adds nice video background
// @author       5yn74x
// @match        https://pr0gramm.com/*
// @grant        unsafeWindow
// ==/UserScript==

unsafeWindow.sync =  function syncbg() {
    var e=document.getElementsByClassName("item-image");
    var x=document.getElementById("video-background");
    e[0].addEventListener("seeking",function(){
        x.currentTime=e[0].currentTime;
    });
    x.addEventListener("canplay",function(){
        x.currentTime=e[0].currentTime;
    });
};
unsafeWindow.hide = function hide() {
    var x=document.getElementById("video-background");
    if(!x.style.display) {
        x.style.display = "none";
    } else {
        x.style.display = "";
    }
};

(function() {
    'use strict';

    $(function() {
        $('body').append(`<style>body{margin:0;padding:0;background:rgba(22,22,24,.01);background-attachment:fixed;background-size:cover}div.item-container{background:rgba(1,1,0,0)!important}#video-background{position:fixed;right:0;bottom:0;min-width:100%;min-height:100%;width:auto;height:auto;z-index:-100;-moz-transform:scale(1.5);-webkit-transform:scale(1.5);-o-transform:scale(1.5);-ms-transform:scale(1.5);transform:scale(1.5);-webkit-filter:blur(50px);-moz-filter:blur(50px);-o-filter:blur(50px);-ms-filter:blur(50px);filter:blur(50px)}</style>`);
        p.View.Stream.Item.prototype.template =
		p.View.Stream.Item.prototype.template
			.replace('<div class="item-comments"></div> </div>',
					 '<div class="item-comments"></div> </div> <?js if( item.video ) {?> <video autoplay loop id="video-background" muted><source src="{item.image}" type="video/mp4"></video><script>sync();</script> <?js  }  ?>')
            .replace('<span class="item-source">',
					 '<span class="item-source"> <a title="Schaltet den Video-Hintergrund ein oder aus." onclick="hide()">BG</a>');
    });

})();
