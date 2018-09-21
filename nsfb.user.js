// ==UserScript==
// @name         nsfb
// @namespace    none
// @version      1.2
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
        localStorage.setItem("nsfb_zoom", "true");
    }
    if(localStorage.getItem("nsfb_active") === "true") {
        p.View.Stream.Item.prototype.template =
            p.View.Stream.Item.prototype.template.replace('<div class="item-comments"></div> </div> ', '<div class="item-comments"></div> </div> <script>on();</script>');
    }
} else {
    // No Web Storage support
}

unsafeWindow.nsfb_opensettings = function() {
    const overlay = `<div id="overlay-box"><div class="overlay-content" id="nsfb_settings"> <h2>Ambipr0 Einstellungen</h2> </div> <div class="overlay-content"> <div class="form-row"> <p>Hier kannst du die Einstellungen für Ambipr0 anpassen, falls du Fragen haben solltest, kannst du dich an <a href="https://pr0gramm.com/user/5yn74x">5yn74x</a> wenden.</p>               <label> <input name="nsfb_active" type="radio" value="Verstoß in den Tags"> AMBIPR0 aktivieren</label> <label> <input name="nsfb_active" type="radio" value="Ich habe diesen Beitrag selbst erstellt und möchte ihn gelöscht haben"> AMBIPR0 deaktivieren</label> </div> <div class="form-row"> </div> <div class="form-row">   <input value="Schließen" id="nsfb_save" type="submit" onclick="nsfb_closeSettings();"> </div> </div> </div>`;
    $('.overlay-content').remove();
    $('#overlay-box').append(overlay);
    $('#overlay').attr("style", "display: block;");
};

unsafeWindow.nsfb_closeSettings = function() {
    $('#overlay').attr('style', 'display: none;');
    $('#nsfb_settings').remove();
    var meta = document.createElement('meta');
    meta.httpEquiv = "Expires";
    meta.content = "-1";
    document.getElementsByTagName('head')[0].appendChild(meta);
    location.reload(true);
};
function createSetting() {
    p.View.Stream.Item.prototype.template =
        p.View.Stream.Item.prototype.template.replace('melden</span>] <?js } ?>', 'melden</span>] <?js } ?> [<a onclick="nsfb_opensettings();">Ambipr0</a>]');
}

(function() {
    'use strict';

    createSetting();
    p.user.Admin = true;
    unsafeWindow.on = function() {
        if(localStorage.getItem('nsfb_active') == "false") return;
        const bgCanvas = document.createElement("canvas");
        bgCanvas.className = "bg-canvas";
        const s = bgCanvas.style;
        document.body.insertBefore(bgCanvas, document.body.firstChild);

        const ctx = bgCanvas.getContext("2d");

        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
        })();

        function getImage() {
            const imgs = document.getElementsByClassName("item-image");
            return !!imgs && imgs.length == 1 ? imgs[0] : undefined;
        }

        const css = `
.bg-canvas {
position: fixed;
top: 0; bottom: 0; left: 0; right: 0;
width: 100%;
height: 100%;
filter: blur(30px);
transform: translate3d(0, 0, 0);
transition: opacity 0.15s;
opacity: 1.0;
}
.item-container {
background: transparent !important;
}
.item-info, .item-comments {
background: rgba(22, 22, 24, .5) !important;
}
.vote-up, .vote-down {
color: #555;
}
`;

        const cw = bgCanvas.width = bgCanvas.clientWidth | 0;
        const ch = bgCanvas.height = bgCanvas.clientHeight | 0;

        function updateBg() {
            const img = getImage();
            if (img) {
                s.opacity = 1.0;
                ctx.drawImage(img, 0, 0, cw, ch);
            } else {
                s.opacity = 0.0;
            }
            requestAnimFrame(updateBg);
        }

        const cssElement = document.createElement("style");
        cssElement.textContent = css;
        document.body.appendChild(cssElement);
        updateBg();
    };


})();
