"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};


// fork in a branch called gh-pagess

$('document').ready(function(){
    AntColony.assetManager = new AssetManager();
    // const assetManager = new AssetManager();

    AntColony.queueAllAssets();
    AntColony.assetManager.downloadAll(function(){
        AntColony.init();
    }); 
});

AntColony.queueAllAssets = function(){
    AntColony.assetManager.queueDownload("./assets/Tiles.png");
    AntColony.assetManager.queueDownload("./assets/MoundMovement.png");
};

AntColony.init = function(assetManager){

    const canvas = $("#gameWorld")[0];
    const ctx = canvas.getContext("2d");

    const gridWidth = 128, gridHeight = 128, scale = 32,
        viewingWidth = 22 * scale, viewingHeight = 18 * scale;

    canvas.width = viewingWidth ;
    canvas.height = viewingHeight;

    


    const interfaceCanvasSide = $("#interfaceCanvasSide")[0];
    interfaceCanvasSide.width = 8 * scale;
    interfaceCanvasSide.height = viewingHeight;

    const interfaceCanvasBottom = $("#interfaceCanvasBottom")[0];
    interfaceCanvasBottom.width = viewingWidth + 8 * scale;
    interfaceCanvasBottom.height = 4 * scale;


    const camera = new AntColony.Camera({
        viewingWidth: viewingWidth,
        viewingHeight: viewingHeight,
        gridWidth: gridWidth,
        gridHeight: gridHeight,
        scale: scale
    });

    AntColony.Animation.prototype.getCamera = function(){
        return camera;
    };

    const board = new AntColony.Board({
        width: gridWidth,
        height: gridHeight,
        scale: scale,
        camera: camera
        // canvas: canvas
    });

    const userInterface = new AntColony.BuildingPanel({});

    const engine = new AntColony.Engine({
        canvas: canvas,
        context: ctx,
        board: board,
        gameSpeed: 1,
        frameRate: 28,
        userInterface: userInterface
    });

    const antMound = new AntMound(scale * 2, camera);
    board.addBuilding(antMound);
    antMound.changePosition(30 * scale, 10 * scale);

    engine.start();

    const controlMapper = new AntColony.ControlMapper();

    const screenMoveController = new AntColony.ScreenMoveController({
        board: board,
        camera: camera,
        scale: scale
    });

    screenMoveController.registerKeys(controlMapper);
};

function AntMound(scale){
    this.x = 0;
    this.y = 0;
    this.width = scale;
    this.height = scale;

    const animation = new AntColony.Animation({
        entity: this,
        spriteSheet: "./assets/MoundMovement.png",
        frameStartX: 0,
        frameStartY: 0,
        frameWidth: 32,
        frameHeight: 32,
        sheetWidth: 32 * 6,
        frameCount: 31,
        framesPerSecond: 5,
        isTower: true
    });

    this.draw = function(params){return animation.draw(params);};
    this.advanceFrame = function(timestamp){
        if(animation.advanceFrame(timestamp)){
            this.hasChanged();
        }
    };
    this.update = function(){};
};






function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    const borderWidth = 10, borderHeight = 10;
    return {
      x: evt.clientX - rect.left - borderWidth,
      y: evt.clientY - rect.top - borderHeight
    };
};


// Temporary object showcasing animation.
function leTower(scale, camera){
    this.curFrame = 1;

    this.x = 0;
    this.y = 0;
    this.width = scale;
    this.height = scale;

    // TODO: remove this boolean
    this.isTower = true;

    this.frameRefresher = new AntColony.FrameRefresher({
        startFrame: 1,
        endFrame: 29,
        framesPerSecond: 24
    });

    this.advanceFrame = function(params){
        // TODO: This should have to manually check the frame difference
        // const before = this.frameRefresher.currentFrame;
        // this.frameRefresher.updateTimestamp(params.timestamp);
        // if(this.frameRefresher.currentFrame - before != 0){
        //     this.hasChanged();
        // }
    };

    const that = this;
    this.draw = function(params){
        params.context.drawImage(
            AntColony.assetManager.getAsset("./assets/" + this.frameRefresher.getFrame() + ".png"),
            this.x - camera.x,
            this.y - camera.y,
            scale,
            scale
            );
    };

    // this.drawSame = function(ctx){
    //     ctx.drawImage(AntColony.assetManager.getAsset("./assets/" + this.curFrame + ".png"), this.x, this.y, 32, 32);
    // }

    this.update = function(){
        ;
    };
};
