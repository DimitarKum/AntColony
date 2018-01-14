"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.Controller = function(params) {
    AntColony.validateParams(params, "board", "camera", "scale");

    this.board = params.board;
    this.camera = params.camera;
    this.scale = params.scale;
};

AntColony.Controller.prototype.start = function(){
    const LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40;
    const that = this;

    window.addEventListener("keydown", function (event) {
        const keyCode = event.keyCode ? event.keyCode : event.which;
        switch(keyCode){
            case LEFT: //LEFT key
                if(that.camera.x >= that.scale) { //up key
                    that.camera.x -= that.scale;
                    that.board.setAllRegionsChanged();
                }
                break;
            case RIGHT: //RIGHT key
                if (that.camera.x <= that.camera.maxX - that.scale) {
                    that.camera.x += that.scale;
                    that.board.setAllRegionsChanged();
                }
                break;
            case UP: //UP key
                if(that.camera.y >= that.scale) {
                    that.camera.y -= that.scale;
                    that.board.setAllRegionsChanged();
                }
                break;
            case DOWN: //DOWN key
                if (that.camera.y <= that.camera.maxY - that.scale) {
                    that.camera.y += that.scale;
                    that.board.setAllRegionsChanged();
                }
                break;
        }
    }, false);
};