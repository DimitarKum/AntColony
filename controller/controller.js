"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.Controller = function(params) {
    AntColony.validateParams(params, "board", "camera", "scale");

    this.board = params.board;
    this.camera = params.camera;
    this.scale = params.scale;

    this.moveLeftTimeoutId = 0;
    this.moveRightTimeoutId = 0;
    this.moveUpTimeoutId = 0;
    this.moveDownTimeoutId = 0;

    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
};

AntColony.Controller.prototype.start = function(){
    const LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40;
    const that = this;
    const timeoutDelay = 50;

    $(document).keydown(function (event) {
        const keyCode = event.keyCode ? event.keyCode : event.which;
        switch(keyCode){
            case LEFT: //LEFT key
                if(!that.isMovingLeft){
                    that.isMovingLeft = true;
                    that.moveLeft(timeoutDelay);
                }
                break;
            case RIGHT: //RIGHT key
                if(!that.isMovingRight){
                    that.isMovingRight = true;
                    that.moveRight(timeoutDelay);
                }
                break;
            case UP: //UP key
                if(!that.isMovingUp){
                    that.isMovingUp = true;
                    that.moveUp(timeoutDelay);
                }
                break;
            case DOWN: //DOWN key
                if(!that.isMovingDown){
                    that.isMovingDown = true;
                    that.moveDown(timeoutDelay);
                }
                break;
        }
    });

    $(document).keyup(function (event) {
        const keyCode = event.keyCode ? event.keyCode : event.which;
        switch(keyCode){
            case LEFT: //LEFT key
                that.stopMovingLeft();
                break;
            case RIGHT: //RIGHT key
                that.stopMovingRight();
                break;
            case UP: //UP key
                that.stopMovingUp();
                break;
            case DOWN: //DOWN key
                that.stopMovingDown();
                break;
        }
    });
};

AntColony.Controller.prototype.moveRight = function(timeoutDelay){
    const that = this;
    if (this.camera.x <= this.camera.maxX - this.scale) {
        this.camera.x += this.scale;
        this.board.setAllRegionsChanged();
        this.moveRightTimeoutId = setTimeout(function(){
            that.moveRight(timeoutDelay);
        }, timeoutDelay);
    }else{
        this.stopMovingRight();
    }
};

AntColony.Controller.prototype.moveLeft = function(timeoutDelay){
    const that = this;
    if(this.camera.x >= this.scale) {
        this.camera.x -= this.scale;
        this.board.setAllRegionsChanged();
        this.moveLeftTimeoutId = setTimeout(function(){
            that.moveLeft(timeoutDelay);
        }, timeoutDelay);
    }else{
        this.stopMovingLeft();
    }
};

AntColony.Controller.prototype.moveUp = function(timeoutDelay){
    const that = this;
    if(this.camera.y >= this.scale) {
        this.camera.y -= this.scale;
        this.board.setAllRegionsChanged();
        this.moveUpTimeoutId = setTimeout(function(){
            that.moveUp(timeoutDelay);
        }, timeoutDelay);
    }else{
        this.stopMovingUp();
    }
};

AntColony.Controller.prototype.moveDown = function(timeoutDelay){
    const that = this;
    if (this.camera.y <= this.camera.maxY - this.scale) {
        this.camera.y += this.scale;
        this.board.setAllRegionsChanged();
        this.moveDownTimeoutId = setTimeout(function(){
            that.moveDown(timeoutDelay);
        }, timeoutDelay);
    }else{
        this.stopMovingDown();
    }
};

AntColony.Controller.prototype.stopMovingLeft = function(){
    clearTimeout(this.moveLeftTimeoutId);
    this.isMovingLeft = false;
};

AntColony.Controller.prototype.stopMovingRight = function(){
    clearTimeout(this.moveRightTimeoutId);
    this.isMovingRight = false;
};

AntColony.Controller.prototype.stopMovingUp = function(){
    clearTimeout(this.moveUpTimeoutId);
    this.isMovingUp = false;
};

AntColony.Controller.prototype.stopMovingDown = function(){
    clearTimeout(this.moveDownTimeoutId);
    this.isMovingDown = false;
};