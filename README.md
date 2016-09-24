z-ripple
==============
2016-09-24


A zquery plugin for the ripple (aka wave) effect.



http://codepen.io/lingtalfi/pen/QKpQXo


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
	<title>Ripple effect</title>
	<style>
		body {
			text-align: center;
		}

		button {
			position: relative; /* you need this property: the wave origin depends on it */
			border: none;
			outline: none;
			cursor: pointer;
			background: #89669b;
			color: white;
			padding: 18px 60px;
			border-radius: 2px;
			font-size: 22px;
		}

		
		button:focus{
			outline: 5px solid red;
		}
		
	
	</style>
	<script src="https://rawgit.com/lingtalfi/zquery/master/zquery.js"></script>
	<script src="https://rawgit.com/lingtalfi/z-ripple/master/z-ripple.js"></script>
	<link rel="stylesheet" href="https://rawgit.com/lingtalfi/z-ripple/master/z-ripple.css">

</head>

<body>

<h1>z-ripple</h1>
<p>
	z-ripple is a <a href="https://github.com/lingtalfi/zquery">zquery</a> plugin for the ripple effect (wave effect).<br>
	Click a button below to see what it does.<br>
	The good news is that it works with buttons elements, so it's accessible friendly.<br>
	This code is an adaptation of <a href="https://codepen.io/Craigtut/full/dIfzv/" aria-label="codepen demo of the ripple effect">this demo</a>,
	but I removed the jquery dependency.<br>
	I used a z-query dependency because I like the one liner call, but it's very easy to get rid off and have a vanilla javascript with no dependencies at all.<br>
	Performances are ok in the browsers I tested: chrome, safari, firefox 49 (firefox 48 was janky with fast repeated clicks).<br>
</p>

<button class="ripple">Bla</button>
<button data-ripple-color="blue" class="ripple">Bla</button>
<button data-ripple-color="red" class="ripple">Bla</button>



<script>
	
	zz(".ripple").ripple();
//	zz(".ripple").ripple({events: ['touchstart']});
	
</script>
</body>
</html>




```



How does it work?
-------------------------


Use the double z (zz)'s zquery method to grab all the elements on which 
you want to apply the ripple effect, then chain that to the ripple method, like so:

```js
zz(".ripple").ripple();
```

### Ripple Color

To change the wave color, set the data-ripple-color attribute on your ripple element.
The value of that argument can be anything that the css background-color property accepts.


### Options

The ripple method accepts a configuration object with the following key/value pairs:

- events: an array containing the events type to which the ripple effect will respond.
			The default value is click.<br>
			Example:<br>
```js
zz(".ripple").ripple({events: ["touchstart"]});
```			
			







Caveats
----------

If you the element on which you apply the z-ripple effect is moving inside your document,
then it shouldn't work right away, but you can tweak the source code to make it work.
I left some comments in the source code to guide you on how to do that.

That's an extra feature because my guess is that most of the time this plugin will be used on
non moving elements, and so we can leverage this to save some "layout" calculations (performance wise).





History Log
------------------
    
- 1.0.0 -- 2016-09-24

    - initial commit
    















