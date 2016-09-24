(function () {
    function onAnimationEnd(e) {
        if ('ripple-animation' === e.animationName) {
            // e.target.style.opacity = 0;
            e.target.parentNode.removeChild(e.target);
        }
    }

    ZquerySet.prototype.ripple = function (options) {
        options = options || {};
        var events = options.events || ['click'];

        this.els.forEach(function (element) {


            /**
             * Note that this expensive call to offset is called once per element, 
             * for performances reasons.
             * This also means that if the element is moving from its original position (which I didn't test)
             * it should not work. A fix for that particular case is to move this line inside at 
             * the beginning of the addEventListener block just below.
             */
            var offset = z.offset(element);

            element.hasListener = false;


            events.forEach(function (type) {
                element.addEventListener(type, function (e) {
                    e.preventDefault();


                    var el = e.currentTarget;


                    var div = document.createElement('div');
                    
                    
                    var xPos = e.pageX - offset.left;
                    var yPos = e.pageY - offset.top;

                    div.classList.add('ripple-effect');
                    div.style.top = (yPos - 25) + 'px'; // 25 = 50 / 2 = ripple.width / 2 
                    div.style.left = (xPos - 25) + 'px';


                    var color = el.getAttribute('data-ripple-color');
                    if (color) {
                        div.style.background = color;
                    }
                    el.appendChild(div);
                    
                    
                    if(false === element.hasListener){
                        el.addEventListener('animationend', onAnimationEnd);
                        element.hasListener = true;
                    }
                });
            });
        });
    };
})();