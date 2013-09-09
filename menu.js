(function(){
	//helpers
	function divver(){ return document.createElement('div'); }
	
	function kill(ev){
		if(ev) {
			if (ev.stopPropagation) ev.stopPropagation();
			if (ev.preventDefault) ev.preventDefault();
			if (ev.preventCapture) ev.preventCapture();
			if (ev.preventBubble) ev.preventBubble();
			
			// just in case
			return false;
		}
	}
	//end helpers
	
	//global menu -- allow only one in page
	var menu = divver();
	menu.className = "menu";
	//hidden by default
	menu.classList.add("hidden");
	
	//place menu in document
	document.body.appendChild(menu);
	
	var Constructor = function(options){
		//reset menu
		menu.innerHTML = "";
		
		function appendItem(item){
			var div = divver();
			div.className = "item";
			div.innerHTML = item.display;
			//add event action
			div.onclick = function(ev){
				c.log('menu item event');
				//make sure to close menu
				menu.hide();
				//execute item event
				item.event(ev);
			}
			//add div to the menu
			menu.appendChild(div);
		}
		
		if (options.items){
			for (i in options.items){ appendItem(options.items[i]); }
		}
		
		
		//activate menu and event listeners
		document.addEventListener("mousedown", function mouseDown(ev){
			//righClick
			if (ev.which === 3) showMenu(ev);
			else if (ev.target.className === "item") c.log('menu item clicked');
			else hideMenu(ev);
		});
		//document.onmousedown = mouseDown;
		document.oncontextmenu = kill;
		
	}
	
	menu.show = function show(){
		this.classList.remove('hidden');
		
		var position = function(){
			var e = window.event;
			//click location
			var y = e.y || e.pageY || e.offsetY;
			var x = e.x || e.pageX || e.offsetX;
			c.log({x:x, y:y});
			
			//window frame
			var frameX = window.innerWidth;
			var frameY = window.innerHeight;
			
			//menu dimensions
			var menuY = menu.offsetHeight || menu.clientHeight;
			var menuX = menu.offsetWidth || menu.clientWidth;
			
			//check that menu does not go off screen
			if ((x+menuX) > frameX) x = frameX - menuX;
			if ((y+menuY) > frameY) y = y - menuY;
			
			//set menu position
			menu.style.left = x + 'px';
			menu.style.top = y + 'px';
		}
		position();
	}
	menu.hide = function hide(ev){
		this.classList.add('hidden');
	}

	function showMenu(ev){
		//kill event
		kill(ev);
		menu.show();
	}

	function hideMenu(){ menu.hide(); }

	window.menu = Constructor;
})();