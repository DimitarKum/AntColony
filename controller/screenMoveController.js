AntColony.ScreenMoveController = function(params){
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

    const timeoutDelay = 50;
    const that = this;
    this.handleKeyDown_Left = function(event){
        if(!that.isMovingLeft){
            that.isMovingLeft = true;
            that.moveLeft(timeoutDelay);
        }
    };

    this.handleKeyDown_Right = function(event){
        if(!that.isMovingRight){
            that.isMovingRight = true;
            that.moveRight(timeoutDelay);
        }
    };

    this.handleKeyDown_Up = function(event){
        if(!that.isMovingUp){
            that.isMovingUp = true;
            that.moveUp(timeoutDelay);
        }
    };

    this.handleKeyDown_Down = function(event){
        if(!that.isMovingDown){
            that.isMovingDown = true;
            that.moveDown(timeoutDelay);
        }
    };

    this.handleKeyUp_Left = function(event){
        that.stopMovingLeft();
    };

    this.handleKeyUp_Right = function(event){
        that.stopMovingRight();
    };

    this.handleKeyUp_Up = function(event){
        that.stopMovingUp();
    };

    this.handleKeyUp_Down = function(event){
        that.stopMovingDown();
    };

    this.moveRight = function(timeoutDelay){
        if (that.camera.x <= that.camera.maxX - that.scale) {
            that.camera.x += that.scale;
            that.board.setAllRegionsChanged();
            that.moveRightTimeoutId = setTimeout(function(){
                that.moveRight(timeoutDelay);
            }, timeoutDelay);
        }else{
            that.stopMovingRight();
        }
    };

    this.moveLeft = function(timeoutDelay){
        if(that.camera.x >= that.scale) {
            that.camera.x -= that.scale;
            that.board.setAllRegionsChanged();
            that.moveLeftTimeoutId = setTimeout(function(){
                that.moveLeft(timeoutDelay);
            }, timeoutDelay);
        }else{
            that.stopMovingLeft();
        }
    };

    this.moveUp = function(timeoutDelay){
        if(that.camera.y >= that.scale) {
            that.camera.y -= that.scale;
            that.board.setAllRegionsChanged();
            that.moveUpTimeoutId = setTimeout(function(){
                that.moveUp(timeoutDelay);
            }, timeoutDelay);
        }else{
            that.stopMovingUp();
        }
    };

    this.moveDown = function(timeoutDelay){
        if (that.camera.y <= that.camera.maxY - that.scale) {
            that.camera.y += that.scale;
            that.board.setAllRegionsChanged();
            that.moveDownTimeoutId = setTimeout(function(){
                that.moveDown(timeoutDelay);
            }, timeoutDelay);
        }else{
            that.stopMovingDown();
        }
    };

    this.stopMovingLeft = function(){
        clearTimeout(that.moveLeftTimeoutId);
        that.isMovingLeft = false;
    };

    this.stopMovingRight = function(){
        clearTimeout(that.moveRightTimeoutId);
        that.isMovingRight = false;
    };

    this.stopMovingUp = function(){
        clearTimeout(that.moveUpTimeoutId);
        that.isMovingUp = false;
    };

    this.stopMovingDown = function(){
        clearTimeout(that.moveDownTimeoutId);
        that.isMovingDown = false;
    };
};

AntColony.ScreenMoveController.prototype.registerKeys = function(controlMapper){
    const LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40;
    const that = this;

    controlMapper.registerKey({
        keyCode: LEFT,
        eventType: "keydown",
        eventHandler: that.handleKeyDown_Left
    });
    controlMapper.registerKey({
        keyCode: RIGHT,
        eventType: "keydown",
        eventHandler: that.handleKeyDown_Right
    });
    controlMapper.registerKey({
        keyCode: UP,
        eventType: "keydown",
        eventHandler: that.handleKeyDown_Up
    });
    controlMapper.registerKey({
        keyCode: DOWN,
        eventType: "keydown",
        eventHandler: that.handleKeyDown_Down
    });

    controlMapper.registerKey({
        keyCode: LEFT,
        eventType: "keyup",
        eventHandler: that.handleKeyUp_Left
    });
    controlMapper.registerKey({
        keyCode: RIGHT,
        eventType: "keyup",
        eventHandler: that.handleKeyUp_Right
    });
    controlMapper.registerKey({
        keyCode: UP,
        eventType: "keyup",
        eventHandler: that.handleKeyUp_Up
    });
    controlMapper.registerKey({
        keyCode: DOWN,
        eventType: "keyup",
        eventHandler: that.handleKeyUp_Down
    });
};