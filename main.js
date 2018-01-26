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
        board: board
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

    const antMound = new AntColony.AntMound({
        scale: scale
    });
    board.addBuilding(antMound);
    antMound.changePosition({
        x: 30 * scale,
        y: 10 * scale
    });



    const antMound2 = new AntColony.AntMound({
        scale: scale
    });
    board.addBuilding(antMound2);
    antMound2.changePosition({
        x: 26 * scale,
        y: 8 * scale
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
        buildingPanel: buildingPanel
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