Right Hand JS
=======

Right Hand is a JavaScript library for creating app-wide context menus.

#TL;DR

	menu({
		{
			display: "First item",
			event: function(ev){
				console.log("First Item ", ev);
			}
		},{
			display: "Second item",
			event: function(ev){
				console.log("Second Item ", ev);
			}
		}
	]);
	
#Initialization

The takes one argument, an array of menu items. It is initialized like this:

	menu(itemsArray);
	
#Menu Items

Menu items require a `display` -- the string seen in the menu -- and `event` -- the function to execute -- properties.

	var item = {
		display: "My Option",
		event: function(ev){
			//do some things
		}
	}
	
The event function has access to both its own click event, and the click event triggered by the right-click that opened the context menu.

	...
	event: function(ev){
		this; //righ-click event, contains target DOM node
		ev;   //left-click on menu event
	}
	...
	
Menu items have the optional `condition` variable, for menu items that are only needed at specific times. Three different options are available.
- A string containing a CSS selector will only show that menu option when right-clicking on a matching element.
- A function, return `true` or `false`. This function gets the right-click event as an argument.