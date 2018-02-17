"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

$('document').ready(function(){
    AntColony.assetManager = new AssetManager();

    AntColony.queueAllAssets();
    AntColony.assetManager.downloadAll(function(){
        AntColony.init();
    }); 
});

AntColony.queueAllAssets = function(){
    // Tiles:
    AntColony.assetManager.queueDownload("./assets/Tiles.png");

    // AntColony.assetManager.queueDownload("./assets/moundIcon.png");
    // AntColony.assetManager.queueDownload("./assets/BuildingAnimations/MoundMovementTinted.png");
    // AntColony.assetManager.queueDownload("./assets/BuildingIcons/AntTrail_Curves1.png");
    // AntColony.assetManager.queueDownload("./assets/BuildingAnimations/AntTrail_Curves1.png");
    // AntColony.assetManager.queueDownload("./assets/BuildingAnimations/AntTrail_Curves1Shadow.png");
    
    // AntColony.assetManager.queueDownload("./assets/BuildingAnimations/AntTrail_Curves2.png");


    // Building Animations:
    AntColony.assetManager.queueDownload("./assets/BuildingAnimations/moundMovement.png");
    AntColony.assetManager.queueDownload("./assets/BuildingAnimations/beetleFarm.png");
    AntColony.assetManager.queueDownload("./assets/BuildingAnimations/treeInfestation.png");
    AntColony.assetManager.queueDownload("./assets/BuildingAnimations/pebbleQuarry.png");
    AntColony.assetManager.queueDownload("./assets/BuildingAnimations/well.png");
    AntColony.assetManager.queueDownload("./assets/BuildingAnimations/raspberryFarm.png");
    AntColony.assetManager.queueDownload("./assets/BuildingAnimations/grasshopperMeadow.png");

    // Resource Icons:
    AntColony.assetManager.queueDownload("./assets/ResourceIcons/beetles.png");
    AntColony.assetManager.queueDownload("./assets/ResourceIcons/fertilizer.png");
    AntColony.assetManager.queueDownload("./assets/ResourceIcons/grazedGrass2.png");
    AntColony.assetManager.queueDownload("./assets/ResourceIcons/leaves.png");
    AntColony.assetManager.queueDownload("./assets/ResourceIcons/pebbles2.png");
    AntColony.assetManager.queueDownload("./assets/ResourceIcons/pebbles.png");
    AntColony.assetManager.queueDownload("./assets/ResourceIcons/population.png");
    AntColony.assetManager.queueDownload("./assets/ResourceIcons/raspberries.png");
    AntColony.assetManager.queueDownload("./assets/ResourceIcons/waterBuckets.png");
    AntColony.assetManager.queueDownload("./assets/ResourceIcons/woodChips2.png");
    AntColony.assetManager.queueDownload("./assets/ResourceIcons/woodChips.png");

    //Items:
    AntColony.assetManager.queueDownload("./assets/Items/fertilizer.png");
    AntColony.assetManager.queueDownload("./assets/Items/grazedGrass.png");
    AntColony.assetManager.queueDownload("./assets/Items/leaf.png");
    AntColony.assetManager.queueDownload("./assets/Items/pebbles.png");
    AntColony.assetManager.queueDownload("./assets/Items/raspberries.png");
    AntColony.assetManager.queueDownload("./assets/Items/beetle.png");
    AntColony.assetManager.queueDownload("./assets/Items/waterBucket.png");
    AntColony.assetManager.queueDownload("./assets/Items/woodChips.png");

    // Building Icons:
    AntColony.assetManager.queueDownload("./assets/BuildingIcons/redX.png");
    AntColony.assetManager.queueDownload("./assets/BuildingIcons/antMound.png");
    AntColony.assetManager.queueDownload("./assets/BuildingIcons/beetleFarm.png");
    AntColony.assetManager.queueDownload("./assets/BuildingIcons/grasshopperMeadow.png");
    AntColony.assetManager.queueDownload("./assets/BuildingIcons/pebbleQuarry.jpg");
    // AntColony.assetManager.queueDownload("./assets/BuildingIcons/pebbleQuarry.png");
    AntColony.assetManager.queueDownload("./assets/BuildingIcons/raspberryFarm.png");
    // AntColony.assetManager.queueDownload("./assets/BuildingIcons/treeInfestation.png");
    AntColony.assetManager.queueDownload("./assets/BuildingIcons/treeInfestation.jpg");
    AntColony.assetManager.queueDownload("./assets/BuildingIcons/well.jpg");
    // AntColony.assetManager.queueDownload("./assets/BuildingIcons/well.png");


    // Tiles:
    AntColony.assetManager.queueDownload("./assets/ProjectUtumno_full.png");
};

AntColony.init = function(){
    const canvas = $("#gameWorld")[0];
    const ctx = canvas.getContext("2d");
    const engine = new AntColony.Engine({});

    const gridWidth = 128, gridHeight = 128, scale = 54,
        viewingWidth = 21 * scale, viewingHeight = 10 * scale;
    AntColony.Globals.Scale = scale;

    canvas.width = viewingWidth ;
    canvas.height = viewingHeight;


    const interfaceCanvasSide = $("#interfaceCanvasSide")[0];
    interfaceCanvasSide.width = 6 * scale;
    interfaceCanvasSide.height = viewingHeight;

    const interfaceCanvasBottom = $("#interfaceCanvasBottom")[0];
    interfaceCanvasBottom.width = viewingWidth + interfaceCanvasSide.width;
    interfaceCanvasBottom.height = 3 * scale;


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
    });

    AntColony.Globals.Board = board;
    engine.registerComponent({
        component: board,
        context: ctx
    });

    const player = new AntColony.Player({
        board: board,
        gameWorld: canvas,
        scale: scale
    });
    AntColony.Globals.Player = player;
    const mouseBinder = new AntColony.MouseSpaceBinder({canvas: interfaceCanvasSide});
    const buildingPanel = new AntColony.BuildingPanel({
        scale: scale,
        canvas: interfaceCanvasSide,
        mouseBinder: mouseBinder,
        player: player,
        descriptionsCanvas: interfaceCanvasBottom
    });
    buildingPanel.init();

    const resourcePanel = new AntColony.ResourcePanel({
        scale: scale,
        player: player
    });
    engine.registerComponent({
        component: resourcePanel,
        context: interfaceCanvasBottom.getContext("2d")
    });
    player.addListener({listener: resourcePanel});





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
    engine.start();
};



function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    const borderWidth = 10, borderHeight = 10;
    return {
      x: evt.clientX - rect.left - borderWidth,
      y: evt.clientY - rect.top - borderHeight
    };
};

AntColony.Globals = {};