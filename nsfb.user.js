// ==UserScript==
// @name         nsfb
// @namespace    none
// @version      0.1
// @description  adds nice video background
// @author       5yn74x
// @match        https://pr0gramm.com/*
// @grant        unsafeWindow
// ==/UserScript==


if (typeof(Storage) !== "undefined") {
    if (!localStorage.getItem("nsfb_active")) {
        localStorage.setItem("nsfb_active", "true");
        localStorage.setItem("nsfb_canvas", "true");
        localStorage.setItem("nsfb_comment", "rgba(22, 22, 24, .5)");
    }
} else {
    // No Web Storage support
}

unsafeWindow.nsfbv = function() {
    var v = document.getElementsByClassName('item-image')[0];
    var canvas = document.getElementById('video-background');
    var context = canvas.getContext('2d');

    var cw = Math.floor(canvas.clientWidth / 80);
    var ch = Math.floor(canvas.clientHeight / 80);
    canvas.width = cw;
    canvas.height = ch;

    v.addEventListener('play', function(){
        draw(this,context,cw,ch);
    },false);


    function draw(v,c,w,h) {
        if(v.paused || v.ended)	return false;
        c.drawImage(v,0,0,w,h);
        setTimeout(draw,20,v,c,w,h);
    }
};

unsafeWindow.nsfbi = function() {
    var v = document.getElementsByClassName('item-image')[0];
    var canvas = document.getElementById('video-background');
    var context = canvas.getContext('2d');

    var cw = Math.floor(canvas.clientWidth / 10);
    var ch = Math.floor(canvas.clientHeight / 10);
    canvas.width = cw;
    canvas.height = ch;
    context.drawImage(v, 0, 0);
};


//(localStorage.getItem('nsfb_active') === "true") ? 'checked="checked"' : '';
var get_active = function() {
 if(localStorage.getItem('nsfb_active') == "true") {
     return 'checked="checked"';
 } else return '';
};

(function() {
    'use strict';
        p.View.Settings.prototype.template =
            p.View.Settings.prototype.template
            .replace('Bookmarklet</a>', `Extras</a>`)
            .replace(`<?js if(tab == 'bookmarklet') { ?> <div class="bookmarklet-frame"> <p> Mit dem <em>+pr0g</em> Bookmarklet kannst du direkt von jeder Website Bilder auf pr0gramm hochladen. </p> <p> <a class="bookmarklet" title="Ziehe diesen Link in deine Bookmarks!" href="{CONFIG.BOOKMARKLET}"> <img src="/media/pr0gramm-favicon.png" class="bookmarklet-icon"/> +pr0g </a> &nbsp;« Ziehe diesen Link in deine Bookmarks! </p> <img src="/media/bookmarklet-instruction.gif" class="bookmarklet-instruction"/> </div>`,
                     `<?js if(tab == 'bookmarklet') { ?><h2>Extras</h2><h3>NSFB / Ambipr0</h3><div class="form-section"> <input type="checkbox" class="box-from-label" name="a" id="a" ${get_active()} /> <label class="checkbox" for="a">Aktiv</label><label>Kommentarfeldfarbe CSS</label> <input type="colorcomments" name="colorcomments" id="colorcomments" class="text-line" value="${localStorage.getItem('nsfb_comment')}"/> <input type="submit" value="Farbe übernehmen" class="settings-save" onclick="setcolor();" /></div> <script>const checkbox=document.getElementById('a');checkbox.addEventListener('change',(event)=>{if(event.target.checked){localStorage.setItem("nsfb_active",true);window.location="https://pr0gramm.com/";}else{localStorage.setItem("nsfb_active",false);window.location="https://pr0gramm.com/";}});function setcolor(){let x=document.getElementById('colorcomments');localStorage.setItem("nsfb_comment",x.value);window.location="https://pr0gramm.com/";}</script> <h3>Bookmarklet</h3><div class="bookmarklet-frame"> <p> Mit dem <em>+pr0g</em> Bookmarklet kannst du direkt von jeder Website Bilder auf pr0gramm hochladen. </p> <p> <a class="bookmarklet" title="Ziehe diesen Link in deine Bookmarks!" href="{CONFIG.BOOKMARKLET}"> <img src="/media/pr0gramm-favicon.png" class="bookmarklet-icon"/> +pr0g </a> &nbsp;« Ziehe diesen Link in deine Bookmarks! </p> <img src="/media/bookmarklet-instruction.gif" class="bookmarklet-instruction"/> </div>`);

        if(localStorage.getItem('nsfb_active') == "true") {
            const css = `<style > body{margin:0;padding:0;background:rgba(22, 22, 24, .01);background-attachment:fixed;background-size:cover}div.item-container{background:rgba(1, 1, 0, .0)!important}div.item-comments{background:${localStorage.getItem("nsfb_comment")}!important}#video-background{position:fixed;right:0;bottom:0;min-width:100%;min-height:100%;width:auto;height:auto;z-index:-100;-webkit-filter: blur(15px);-moz-filter: blur(15px);-o-filter: blur(15px);-ms-filter: blur(15px);filter: blur(15px)}</style>`;
            $('body').append(css);
            $('body').append(`<canvas id="video-background"></canvas>`);
            p.View.Stream.Item.prototype.template =
                p.View.Stream.Item.prototype.template
                .replace('<div class="item-comments"></div> </div>',
                         '<div class="item-comments"></div> </div> <?js if( item.video ) {?><script>nsfbv();</script> <?js  }  else { ?><script>nsfbi();</script><?js } ?>');
        }
})();
