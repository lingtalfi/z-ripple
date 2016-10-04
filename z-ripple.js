(function () {
    function onAnimationEnd(e) {
        if ('ripple-animation' === e.animationName) {
            // e.target.style.opacity = 0;
            e.target.parentNode.removeChild(e.target);
        }
    }

    ZquerySet.prototype.ripple = function (options) {

        if ('undefined' === typeof this.els.alreadyCalled) {

            options = options || {};
            options.dynamic = options.dynamic || false;

            
            // queuing the instantiation code for the next browser's event iteration...
            // (i.e. it's a setup code, we don't want to block the main thread...)
            setTimeout(function () {

                this.els.forEach(function (element) {


                    element.bcr = null;

                    // by default, we assume that the container doesn't morph/move,
                    // so we store its bcr once
                    if (false === options.dynamic) {
                        // https://github.com/lingtalfi/browsers-behaviours/blob/master/get-bounding-client-rect/bcr-icon.md
                        // https://bugs.chromium.org/p/chromium/issues/detail?id=652626&can=2&q=getBoundingClientRect&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified
                        element.bcr = element.getBoundingClientRect();
                    }


                    element.keydowned = false;


                    // for keyboard users
                    // we want the ink to be positioned at the center of the container.
                    // https://github.com/lingtalfi/browsers-behaviours/blob/master/button-keypress-click/button-keypress-click.md
                    element.addEventListener("keydown", function (e) {
                        if (32 === e.keyCode || 13 === e.keyCode) {
                            element.keydowned = true;
                        }
                    });


                    element.addEventListener('click', function (e) {


                        // if the container morphs or moves, recompute the bcr...
                        if (true === options.dynamic) {
                            element.bcr = element.getBoundingClientRect();
                        }


                        var el = e.currentTarget; // element?
                        var xPos, yPos;


                        // mouse behavior
                        if (false === element.keydowned) {
                            xPos = e.pageX - element.bcr.left; // pos of the mouse relative to the (ripple) container's origin
                            yPos = e.pageY - element.bcr.top;
                        }
                        else {
                            // keyboard touches the ink exactly at the center of the container
                            xPos = element.bcr.width / 2;
                            yPos = element.bcr.height / 2;
                        }


                        // create and position the ink div
                        var div = document.createElement('div');
                        div.classList.add('ink');
                        div.style.top = (yPos - 6) + 'px'; // 6 = 12 / 2 = ripple.width / 2 
                        div.style.left = (xPos - 6) + 'px';


                        var color = options.color || el.getAttribute('data-ripple-color');
                        if (color) {
                            div.style.background = color;
                        }
                        el.appendChild(div);


                        // reset for the next keydown event
                        element.keydowned = false;

                    });


                    // when the ripple effect ends, we remove the ink div
                    element.addEventListener('animationend', onAnimationEnd);

                });
                this.els.alreadyCalled = true;
            }.bind(this), 0);
        }
    };
})();