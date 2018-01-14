"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

$('document').ready(function(){
    AntColony.assetManager = new AssetManager();
    // const assetManager = new AssetManager();

    AntColony.queueAllAssets();
    AntColony.assetManager.downloadAll(function(){
        AntColony.init();
    }); 
});

AntColony.queueAllAssets = function(){
    for(let i = 1; i <= 29;++i){
        AntColony.assetManager.queueDownload("./assets/" + i + ".png");
    }
    AntColony.assetManager.queueDownload("./assets/Tiles.png");
};

AntColony.init = function(assetManager){
    const canvas = $("#gameWorld")[0];
    const ctx = canvas.getContext("2d");

    const gridWidth = 128, gridHeight = 128, scale = 22,
        viewingWidth = 32 * scale, viewingHeight = 32 * scale;

    canvas.width = viewingWidth;
    canvas.height = viewingHeight;

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

    const engine = new AntColony.Engine({
        canvas: canvas,
        context: ctx,
        board: board,
        gameSpeed: 1,
        frameRate: 28
    });

    const t = new leTower(scale * 2);
    canvas.addEventListener("mousemove", function (e) {
        let pos = getMousePos(canvas, e);
        t.changePosition(pos.x - scale / 2, pos.y - scale / 2);
    }, false);
    board.addBuilding(t);

    engine.start();

    (new AntColony.Controller({
        board: board,
        camera: camera,
        scale: scale
    })).start();
    
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
function leTower(scale){
    this.curFrame = 1;

    this.x = 0;
    this.y = 0;

    this.frameRefresher = new AntColony.FrameRefresher({
        startFrame: 1,
        endFrame: 29,
        framesPerSecond: 24
    });

    this.advanceFrame = function(params){
        // TODO: This should have to manually check the frame difference
        const before = this.frameRefresher.currentFrame;
        this.frameRefresher.updateTimestamp(params.timestamp);
        if(this.frameRefresher.currentFrame - before != 0){
            this.hasChanged();
        }
    };

    this.draw = function(params){
        params.context.drawImage(
            AntColony.assetManager.getAsset("./assets/" + this.frameRefresher.getFrame() + ".png"),
            this.x,
            this.y,
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
