jquery-inputdetect
==================

This jQuery plugin determines the method used to change an input field (mouse or keyboard), and performs some given action based on that. Especially useful for HTML5 inputs.

### Example usage

```javascript
$('input[type=number]').inputDetect({
	keyChange: function() {
		console.log('User entered value.');
	},
	clickChange: function() {
		console.log('User clicked to change value.');
	},
	change: function() {
		// Runs every time a change occurs, if given.
		console.log('Value was changed by either method.');
	}
});
```
