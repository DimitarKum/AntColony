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
    AntColony.assetManager.queueDownload("./assets/MoundMovementTinted.png");
    AntColony.assetManager.queueDownload("./assets/moundIcon.png");
    AntColony.assetManager.queueDownload("./assets/redX.png");
};

AntColony.init = function(){
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
    AntColony.displayInformation({
        context: interfaceCanvasBottom.getContext("2d"),//interfaceCanvasBottom.getContext("2d"),
        scale: scale
    });


    // interfaceCanvasBottom.getContext("2d").font = "30px Comic Sans";
    // interfaceCanvasBottom.getContext("2d").textAlign = "center";
    // interfaceCanvasBottom.getContext("2d").fillStyle = "red";
    // interfaceCanvasBottom.getContext("2d").strokeText("Interface Panel",0,0);


    const camera = new AntColony.Camera({
        viewingWidth: viewingWidth,
        viewingHeight: viewingHeight,
        gridWidth: gridWidth,
        gridHeight: gridHeight,
        scale: scale
    });

    AntColony.Camera.instance = camera;
    // TODO: Refactor Animation to use .instance singleton instead of .getCamera()
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

    const player = new AntColony.Player({
        board: board,
        gameWorld: canvas
    });
    const mouseBinder = new AntColony.MouseSpaceBinder({canvas: interfaceCanvasSide});
    const buildingPanel = new AntColony.BuildingPanel({
        scale: scale,
        canvas: interfaceCanvasSide,
        mouseBinder: mouseBinder,
        player: player
    });
    buildingPanel.init();

    const engine = new AntColony.Engine({
        canvas: canvas,
        context: ctx,
        board: board,
        gameSpeed: 1,
        frameRate: 28
        // userInterface: userInterface
    });


    engine.start();

    const controlMapper = new AntColony.ControlMapper();

    const screenMoveController = new AntColony.ScreenMoveController({
        board: board,
        camera: camera,
        scale: scale
    });

    screenMoveController.registerKeys(controlMapper);

    const playerBoardController = new AntColony.PlayerBoardController({
        board: board,
        player: player,
        canvas: canvas,
        buildingPanel: buildingPanel,
        scale: scale
    });

    playerBoardController.start();
};



function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    const borderWidth = 10, borderHeight = 10;
    return {
      x: evt.clientX - rect.left - borderWidth,
      y: evt.clientY - rect.top - borderHeight
    };
};

AntColony.displayInformation = function(params){
    AntColony.validateParams(params, "context", "scale");

    const drawText = function(context){
        // ctx.save();
        // ctx.beginPath();
        context.font = params.scale + "px Times New Roman";
        context.fillStyle = "white";
        context.fillText("Use key arrows to move camera in the world.", params.scale, params.scale);
        context.fillText("You can build an AntMound or demolish an AntMound", params.scale, params.scale * 2);
        context.fillText("using the icons on the right side.", params.scale, params.scale * 3);

        // ctx.closePath();
        // ctx.restore();
    };
    window.requestAnimationFrame(function(timestamp){
        drawText(params.context);
    });
    // window.setInterval(function(){
    //     drawText(params.context);
    // }, 5);
};