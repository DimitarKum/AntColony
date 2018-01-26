"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.MouseSpaceBinder = function(params){
    AntColony.validateParams(params, "canvas");

    this.canvas = params.canvas;
    this.clickId = 0;
    this.clickHandlers = []
};

/*
* Used for bounding a region of space on a canvas to a function(eventHandler) which executes for a mouse eventType.
* Returns a uniqueId which can be used with unbindRegion.
*/
AntColony.MouseSpaceBinder.prototype.bindRegionToEvent = function(params){
    AntColony.validateParams(params, "region", "eventType", "eventHandler");
    // AntColony.validateParams(params.region, "x", "y", "width", "height");
    // if(params.eventType !== "click"){
    //     throw new Error("[" + params.eventType "] event type is not currently supported. Event can only be click.");
    // }

    this.clickHandlers[this.clickId++] = {
        region: params.region,
        handler: params.eventHandler
    };

    const that = this;
    switch(params.eventType){
        case "click":
            that.canvas.removeEventListener("click", that.clickFunction, false);
            that.clickFunction = function(event){
                // TODO: If this is slow, precompute these at new MouseSpaceBinder() object creation time.
                const rect = that.canvas.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(that.canvas, null);
                const x = event.clientX - rect.left - parseInt(computedStyle.getPropertyValue("border-left-width"), 10),
                    y = event.clientY - rect.top - parseInt(computedStyle.getPropertyValue("border-top-width"), 10);
                that.clickHandlers.forEach(function(clickHandler){
                    if(AntColony.isPointInRegion({
                        point: {x: x, y: y},
                        region: clickHandler.region
                    })){
                        clickHandler.handler(event);
                    }
                });
            };
            this.canvas.addEventListener("click", this.clickFunction, false);
            break;
        default:
            break;
    }
    return this.clickId;
};

AntColony.MouseSpaceBinder.prototype.unbindRegion = function(params){
    AntColony.validateParams(params, "id");
};


// TODO: Find a better spot for this function
AntColony.isPointInRegion = function(params){
    // AntColony.validateParams(params, "point", "region");
    // AntColony.validateParams(params.region, "x", "y", "width", "height");
    // AntColony.validateParams(params.point, "x", "y");

    return params.point.x > params.region.x &&
        params.point.y > params.region.y &&
        params.point.x < params.region.x + params.region.width && 
        params.point.y < params.region.y + params.region.height;
};


// function(){
//     let toggle = true;
//     this.clickHandlers[this.clickId++] = {
//         region: {
//             x: 10,
//             y: 10,
//             width: 50,
//             height: 50
//         },
//         handler: function(event){
//             const x = that.clickHandlers[0].region.x,
//                 y = that.clickHandlers[0].region.y,
//                 width = that.clickHandlers[0].region.width,
//                 height = that.clickHandlers[0].region.height;
//             // console.log("x = " + x + ", y = " + y + ", width = " + width + ", height = " + height + " clicked!");
//             toggle = !toggle;
//             if(toggle){
//                 that.canvas.getContext("2d").strokeStyle = "white";
//             }else{
//                 that.canvas.getContext("2d").strokeStyle = "red";
//             }
//             that.canvas.getContext("2d").rect(10, 10, 50, 50);
//             that.canvas.getContext("2d").stroke();
//         }
//     }
// }