"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

// Camera keeps track of the current viewing window.
AntColony.Camera = function(params){
    AntColony.validateParams(params, "viewingWidth", "viewingHeight" ,"gridWidth", "gridHeight", "scale");

    this.x = 0;
    this.y = 0;

    this.viewingWidth = params.viewingWidth;
    this.viewingHeight = params.viewingHeight;
    this.maxX = params.gridWidth * params.scale - params.viewingWidth;
    this.maxY = params.gridHeight * params.scale - params.viewingWidth;
};


// entity is expected to have .x, .y, .width, .height
AntColony.Camera.prototype.isOnScreen = function(entity){
    return entity.x < this.x + this.viewingWidth && entity.x + entity.width > this.x &&
        entity.y < this.y + this.viewingHeight && entity.y + entity.height > this.y;
};


AntColony.Camera.prototype.getMousePosition = function(params) {
    AntColony.validateParams(params, "canvas", "event")
    const rect = params.canvas.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(params.canvas, null);
    const x = event.clientX - rect.left - parseInt(computedStyle.getPropertyValue("border-left-width"), 10),
        y = event.clientY - rect.top - parseInt(computedStyle.getPropertyValue("border-top-width"), 10);
    return {
        x: x + this.x,
        y: y + this.y
    };

    // const rect = canvas.getBoundingClientRect();
    // const borderWidth = 10, borderHeight = 10;
    // return {
    //   x: evt.clientX - rect.left - borderWidth,
    //   y: evt.clientY - rect.top - borderHeight
    // };
};