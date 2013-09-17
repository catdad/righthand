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
	
	window.debug = function debug(){
		if (console && console.log)
			console.log.apply(console, arguments);
	}
	//end helpers
	
	//init menu
	//global menu -- allow only one in page
	var menu = divver();
	menu.className = "menu";
	//hidden by default
	menu.classList.add("hidden");
	
	//place menu in document
	document.body.appendChild(menu);
	
	//init menu function
	var Constructor = function(options){
		//reset menu
		menu.innerHTML = "";
		
		//creates menu entry
		//TODO cross browser
		if (options.items){
			for (i in options.items){
				menu.store.add(options.items[i]);
			}
		}
		
		//activate menu and event listeners
		//TODO crossbrowser
		document.addEventListener("mousedown", function mouseDown(ev){
			//righClick
			if (ev.which === 3) showMenu(ev);
			else if (ev.target.className === "item") console.log('menu item clicked');
			else hideMenu(ev);
		});
		
		//kill contectmenu events
		document.oncontextmenu = kill;
	}
		
	//menu.trigger = null;
	
	//add menu store
	menu.store = {
		items: [],
		add: function addMenuExtension(item){
			//parse string as DOM selector
			var parse = function(c){
				return function(){ return true; }
			}
			
			//create conditional function
			switch (typeof item.condition){
				case "function":
					item.active = item.condition;
					break;
				case "string":
					item.active = parse(item.condition);
					break;
				default:
					item.active = function always(){ return true; };
					break;
			}
			
			//test for premade items
			if (item.display == menuItems.divider){
				//display is the actual DOM
				item.DOM = item.display;
			}
			else{
				//create DOM element for item
				item.DOM = divver();
				item.DOM.className = "item";
				item.DOM.innerHTML = item.display;
				//create onclick handler
				item.DOM.onclick = function(ev){
					//make sure to close menu
					menu.hide();
					//execute item event
					if (item.event && typeof item.event === "function")
						item.event.call(menu.trigger, ev);
					else debug(item.display + " event not set");
				}
			}
			
			this.items.push(item);
			
			//TODO temp
			return item;
		},
		//TODO remove function
		remove: function removeMenuExtension(condition){
			if (condition in this.items) return true;
			else return false;
		},
		//TODO find function
		find: function findMenuExtention(){
			
		},
		each: function eachItem(callback, scope){
			//TODO use GitHub each function
			for (i in this.items){
				callback.call(scope, this.items[i], i, this.items);
			}
		}
	}
	
	//devtools
	window.store = menu.store;
	
	//add menu methods
	menu.create = function createMenu(ev){
		//clear previous
		menu.innerHTML = "";
		
		//adds view to menu
		function appendItem(item){
			//add div to the menu
			if ( item.active() )
				menu.appendChild(item.DOM);
		}
		
		menu.store.each(appendItem);
		
		return this;
	}
	menu.show = function show(ev){
		//set global event target
		menu.trigger = ev;
		
		this.classList.remove('hidden');
		
		//correctly position menu
		(function positionMenu(){
			var e = window.event;
			//click location
			var y = e.y || e.pageY || e.offsetY;
			var x = e.x || e.pageX || e.offsetX;
			console.log({x:x, y:y});
			
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
		})();
		
		return this;
	}
	menu.hide = function hide(ev){
		this.classList.add('hidden');
		return this;
	}
	
	//wrapper functions -- makes it easier to do more than one thing
	function showMenu(ev){
		//kill event
		kill(ev);
		menu.create(ev).show(ev);
	}
	function hideMenu(){ menu.hide(); }

	//attach Constructor to global scope
	window.menu = Constructor;
	//helper menu items
	var menuItems = window.menu.items = {
		divider: function(){
			var div = divver();
			div.className = "divider";
			div.innerHTML = "&nbsp;";
			return div;
		}()
	}
	
	console.log(menuItems);
})();