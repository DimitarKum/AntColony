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

    const board = new AntColony.Board({
        width: 36,
        height: 36,
        scale: 32,
        canvas: canvas
    });

    const engine = new AntColony.Engine({
        canvas: canvas,
        context: ctx,
        board: board,
        gameSpeed: 1,
        frameRate: 28
    });

    const t = new leTower();
    canvas.addEventListener("mousemove", function (e) {
        //console.log(getXandY(e));
        let pos = getMousePos(canvas, e);
        t.changePosition(pos.x - 24, pos.y - 24);
        // t.x = pos.x;
        // t.y = pos.y;
        // board.specialDraw(ctx);
        // ctx.drawImage(AntColony.assetManager.getAsset("./assets/" + t.curFrame + ".png"), t.x - 75, t.y - 75);
        // let curFrame = 1;
        // ctx.drawImage(AntColony.assetManager.getAsset("./assets/" + curFrame + ".png"), pos.x, pos.y);
    }, false);
    board.addBuilding(t);

    engine.start();
};

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
};


// Temporary object showcasing animation.
function leTower(){
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
        params.context.drawImage(AntColony.assetManager.getAsset("./assets/" + this.frameRefresher.getFrame() + ".png"), this.x, this.y, 32, 32);
    };

    // this.drawSame = function(ctx){
    //     ctx.drawImage(AntColony.assetManager.getAsset("./assets/" + this.curFrame + ".png"), this.x, this.y, 32, 32);
    // }

    this.update = function(){
        ;
    };
};
