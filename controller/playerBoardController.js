"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

// Used for selecting buildings
AntColony.PlayerBoardController = function(params) {
    AntColony.validateParams(params, "board", "player", "canvas", "buildingPanel");

    this.board = params.board;
    this.canvas = params.canvas;
    this.player = params.player;
    this.buildingPanel = params.buildingPanel;
};

AntColony.PlayerBoardController.prototype.start = function() {
    const that = this;
    this.canvas.addEventListener("mousemove", function(event){
        switch(that.player.state){
            case AntColony.Player.State.SELECT:
                break;
            case AntColony.Player.State.BUILD:
                const mousePosition = AntColony.Camera.instance.getMousePosition({
                    canvas: that.canvas,
                    event: event
                });

                const buildingShadow = that.board.getBuildingShadow();

                buildingShadow.changePosition({
                    x: mousePosition.x - Math.floor(buildingShadow.width / 2),
                    y: mousePosition.y - Math.floor(buildingShadow.height / 2)
                });
                // that.board.getBuildingShadow().changePosition({
                //     x: event.clientX + AntColony.Camera.instance.x,
                //     y: event.clientY + AntColony.Camera.instance.y
                // });
                break;
            case AntColony.Player.State.DEMOLISH:
                break;
            default:
                that.buildingPanel.deselectBuildings();
                break;
        }
    }, false);

    this.canvas.addEventListener("click", function(event){
        switch(that.player.state){
            case AntColony.Player.State.SELECT:
                break;
            case AntColony.Player.State.BUILD:
                that.buildingPanel.deselectBuildings();
                break;
            case AntColony.Player.State.DEMOLISH:
                break;
            default:
                that.buildingPanel.deselectBuildings();
                break;
        }
    }, false);
};