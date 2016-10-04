z-ripple
==============
2016-09-24


A zquery plugin for the ripple (aka wave) effect.



- v1.1.0: is currently baking...
- (v1.0.0: http://codepen.io/lingtalfi/pen/QKpQXo)


Dependency
------------

z-ripple depends on [zquery](https://github.com/lingtalfi/zquery).





Example code 
-------------------

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>z-ripple demo</title>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

	<script src="https://rawgit.com/lingtalfi/zquery/master/zquery.js"></script>

	<link rel="stylesheet" href="z-ripple.css">
	<script src="z-ripple.js"></script>
	
	

	<style>
		
		
		button {
			position: relative; /* you need this property: the wave origin depends on it */
			overflow: hidden; /* remove this property for fun... */
			border: none;
			outline: none;
			cursor: pointer;
			background: #89669b;
			color: white;
			padding: 18px 60px;
			border-radius: 2px;
			font-size: 24px;

		}
		
		
		.circle{
			padding:0;
			width: 64px;
			height: 64px;
			border-radius: 50%;
		}
		
		
		
		*:focus{
			outline: 5px solid red;
		}
	</style>
</head>

<body>

<h1>z-Ripple</h1>
<p>
	z-ripple is a <a href="https://github.com/lingtalfi/zquery" target="_blank">zquery</a> plugin
	that creates a wave effect inside a container element.<br>
	The z-ripple plugin was created with accessibility and performances in mind.<br>
	More comments about this specific demo in the source code.
	
</p>
<hr>
<button class="ripple">
	<i class="material-icons">favorite</i>
</button>

<button class="ripple" data-ripple-color="red">
	Red ripple
</button>

<button class="ripple circle" data-ripple-color="blue">B</button>

<hr>


<button class="dynamicRipple">Dynamic</button>
<button class="lazyRipple">Lazy</button>


<script>

	
	

		document.addEventListener('DOMContentLoaded', function(){			
			
			// default call
			zz('.ripple').ripple();
			
			
			// dynamic mode: the computation of the effect
			// is re-computed every time.
			zz('.dynamicRipple').ripple({dynamic: true, color: "black"});


			/**
			 * This snippet demonstrates the default lazy behaviour
			 * of the ripple plugin.
			 * The ripple effect is initialized once,
			 * and subsequent calls to the ripple method
			 * are ignored (you can think of the ZQuery set to 
			 * be frozen after the first call).
			 * 
			 * Note: you need to reference your ZQuery set object 
			 * into a variable (zset in the example below) in order
			 * to do it => you can't re-use the zz function because
			 * the zz function recreates a NEW set every time.
			 * 
			 */
			var zset = zz('.lazyRipple');
			setInterval(function(){
				zset.ripple({color: 'orange'});	
			}, 1000);
			
			
			
		});
	

</script>


</body>
</html>

```



How does it work?
-------------------------

Use the double z (zz)'s zquery method to select all the elements on which 
you want to apply the ripple effect, then chain that to the ripple method, like so:

```js
zz(".ripple").ripple();
```

Note: the ripple css class is defined in the ripple.css, and some of its properties are required for the ripple effect
to work properly.

If you don't want to use the ripple css class, make sure that you copy/paste the css properties of the ripple css class
in the css class of your choosing.




### special html attributes

To change the wave color, set the data-ripple-color attribute on your ripple element.
The value of that argument can be anything that the css background-color property accepts.


### Options

The ripple method accepts a configuration object with the following key/value pairs:

- color: the color of the ink (ripple), defaults to white (or whatever is defined in the ripple.css file)
```js
zz(".ripple").ripple({color: "red"});
```			
- dynamic: when set to true, recomputes the position of the ink's center on every click
			


Nomenclature
-----------------
When the "ripple container" is clicked, the "ink" scales up in concentric circles, 
contained within the boundaries of the ripple container.
It's a little bit like when a stone falls into the water and the waves propagate. 





Synopsis
-----------

To create the ripple effect, one has to compute the location of the center of the "ink".
This computation can be relatively heavy (in the scope of an animation), and therefore
it should be ideally done once only (to optimize our chances for a smooth animation).


Therefore, we have 2 modes for initializing the ripple effect on the candidate elements: one that cares about performances, 
and one that doesn't.


 
The 2 modes for initializing the ripple effect are:

- the default mode
- the dynamic mode


### The default mode

```js
zz(".ripple").ripple();
```

No options is passed.
This will do the computation immediately (but in a non blocking way), and once for each element in the set.
The coordinates of the center of the "ink" are then memorized (for each element) for subsequent calls.

This means that if you call the ripple method multiple times for a given set, the first call only will be processed,
and the other will be ignored. See an example of this in the source code of the demo code at the top of this page 
 (the lazy button's comments in the source code).


### The dynamic call

```js
zz(".ripple").ripple({dynamic: true});
```

The dynamic option is set to true.

This will do the computation every time the "ripple container" is clicked, but in a lazy manner, which means that
the computation is not performed unless an actual click event is triggered on a ripple element.

This eases the setup, but might not be the best solution performance wise.



### A characteristic to be aware of

Again, if you call the ripple method multiple times (in your js code), only the first call is taken in account,
and the subsequent calls are ignored (not to confound with multiple click on a given ripple element).

This was actually implemented to solve a specific problem, which is explained below.

If you are implementing a nav drawer (side nav) component with rippled items, you will be faced
with the problem that the nav drawer starts first off the screen (and only enters the screen
if a menu button is activated for instance).

In this case, if you care about performances, you want to instantiate the ripple only once just
after the drawer opens.

But the drawer might opened/closed multiple times, and therefore your instantiation code
would naturally be called multiple times.

Thanks to this characteristics of the ripple method, the logic of calling the ripple effect only
once is already handled for us.




Developer random notes
-------------------


Order of events with mousedown:
http://www.html5rocks.com/en/mobile/touchandmouse/


- 1. touchstart
- 2. touchmove
- 3. touchend
- 4. mouseover
- 5. mousemove
- 6. mousedown
- 7. mouseup
- 8. click 




Known issues
----------

- in chrome53, when triggering the ink from the keyboard on a container containing an icon,
    the ink center is positioned next to the icon rather than right at the center of it.
    Probably related to this bug: https://bugs.chromium.org/p/chromium/issues/detail?id=652626&can=2&q=getBoundingClientRect&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified




History Log
------------------
    
- 1.1.0 -- 2016-10-04

    - color can now be set programmatically
    - ink is now contained within a circular container 
    - the touch target area is smaller: crisper ripple effect 
    - dynamic mode allows for morphing/moving elements to have the ripple effect as well 
    - lazy mode freezes the ZQuery set after the first call by default 
    - keyboard support: enter/space triggers the ink from the center of the container 
    - removed events option: now only the ripple is fired on click (more pragmatic)
    
    
- 1.0.0 -- 2016-09-24

    - initial commit
    















