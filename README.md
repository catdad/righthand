Right Hand JS
=======

Right Hand is a JavaScript library for creating app-wide context menus.

_Note: This project is still in the very early stages. At this point, I reserve the right to break any and all parts of this API without notice. I will update this README as I make changes, and remove this message when I reach a stable version._

##TL;DR

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
	
##Initialization

The takes one argument, an array of menu items. It is initialized like this:

	menu(itemsArray);
	
_Note: an array is used so that the order of the menu items is preserved. They will appear in the menu in the same order that they are placed inside the array._
	
##Menu Items

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
- Leaving this out causes the item to always show on the menu.

####Full item object

	var item = {
		condition: function(ev){
			return (ev.target.style.backgroundColor === "yellow")
				? true:false;
		},
		display: "Change yellow to orange",
		event: function(ev){
			//do some things
			this.target.style.backgroundColor = "orange";
		}
	}

##License

This project is licensed under the MIT X11 License. Please use, adapt, and modify this project to your heart's content. Link back to this page wherever you can.
