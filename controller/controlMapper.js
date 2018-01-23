"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.ControlMapper = function() {
    this.keyDownMap = {};
    this.keyUpMap = {};
    this.keyPressedMap = {};
};

// Registers params.eventHandler (function) to params.keyCode on params.eventType
// eventType = keydown/keyup/keypressed
AntColony.ControlMapper.prototype.registerKey = function(params){
    AntColony.validateParams(params, "keyCode", "eventType", "eventHandler");
    const that = this;
    switch(params.eventType){
        case "keydown":
            that.keyDownMap[params.keyCode] = params.eventHandler;
            $(document).off("keydown");
            $(document).on("keydown", function(event){
                const keyCode = event.keyCode ? event.keyCode : event.which;
                if(that.keyDownMap[keyCode]){
                    that.keyDownMap[keyCode](event);
                }
            });
            break;
        case "keyup":
            that.keyUpMap[params.keyCode] = params.eventHandler;
            $(document).off("keyup");
            $(document).on("keyup", function(event){
                const keyCode = event.keyCode ? event.keyCode : event.which;
                if(that.keyUpMap[keyCode]){
                    that.keyUpMap[keyCode](event);
                }
            });
            break;
        case "keypressed":
            that.keyPressedMap[params.keyCode] = params.eventHandler;
            $(document).off("keypressed");
            $(document).on("keypressed", function(event){
                const keyCode = event.keyCode ? event.keyCode : event.which;
                if(that.keyPressedMap[keyCode]){
                    that.keyPressedMap[keyCode](event);
                }
            });
            break;
        default:
            console.log("Attempted to register key[" + params.key + "] for unknown event type [" + params.eventType + "].");
            break;    
    }
};