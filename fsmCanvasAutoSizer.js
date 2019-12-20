

var canvas = document.getElementById('FSM-Display-Canvas');
var parentStyle = getComputedStyle(canvas.parentNode);

var width = parseInt(parentStyle.getPropertyValue('width'), 10);
var height = parseInt(parentStyle.getPropertyValue('height'), 10);

canvas.width = width;
canvas.height = height;
