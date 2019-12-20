var draggable = document.getElementById('draggable');
var handle = document.getElementById('handle');
var target = false;
handle.onmousedown = function(e) {
    e.target.parentNode.setAttribute('draggable', 'true')
};

handle.onmouseup = function(e) {
    e.target.parentNode.setAttribute('draggable', 'false')
};

draggable.ondragstart = function(e) {
      e.dataTransfer.setData('text/plain', 'handle');
};

draggable.ondragend = function(e) {
      e.target.setAttribute('draggable', 'false')
};
