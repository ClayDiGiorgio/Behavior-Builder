/*                                            *
 * ========================================== *
 *                                            * 
 *              Setup                         *
 *                                            *
 * ========================================== *
 *                                            */

/*
 * From NeonPaul via https://stackoverflow.com/questions/26283661/drag-drop-with-handle
 * 
 * Code directly from https://jsfiddle.net/a6tgy9so/1/
 */
var draggables = document.getElementsByClassName('draggable');
var handles = document.getElementsByClassName('handle');
var target = false;

for (i = 0; i < handles.length; i++) {
    handle = handles[i];
    
    handle.onmousedown = function(e) {
        e.target.parentNode.setAttribute('draggable', 'true')
    };

    handle.onmouseup = function(e) {
        e.target.parentNode.setAttribute('draggable', 'false')
    };
}

for (i = 0; i < draggables.length; i++) {
    draggable = draggables[i];
    
    draggable.ondragstart = function(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    };

    draggable.ondragend = function(e) {
        e.target.setAttribute('draggable', 'false')
    };
    
    draggable.ondrop = function(e) {
        const draggableElement = document.getElementById(id);
        const dropzone = event.target;
        dropzone.insertAdjacentHTML("afterend", draggableElement.html);
        
        event.dataTransfer.clearData();
    };
}

/*                                            *
 * ========================================== *
 *                                            * 
 *              Attribute functions           *
 *                                            *
 * ========================================== *
 *                                            */

/*
 * Code modified from https://alligator.io/js/drag-and-drop-vanilla-js/
 */

function onDragOver(event) {
  event.preventDefault();
}

function onDragStart(event) {
    event
        .dataTransfer
        .setData('text/plain', event.target.id);
    
    event
        .currentTarget
        .style
        .backgroundColor = 'darkGrey';
}

function onDrop(event) {
    const id = event
        .dataTransfer
        .getData('text');

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
  
  //dropzone.appendChild(draggableElement);
    dropzone.insertAdjacentHTML("afterend", "This is my caption.");
    
    event
        .dataTransfer
        .clearData();
}

