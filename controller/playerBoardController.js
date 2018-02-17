"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

// Used for selecting buildings
AntColony.PlayerBoardController = function(params) {
    AntColony.validateParams(params, "board", "player", "canvas", "buildingPanel", "scale");

    this.board = params.board;
    this.canvas = params.canvas;
    this.player = params.player;
    this.buildingPanel = params.buildingPanel;
    this.scale = params.scale;
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
                const optionalRegion = that.board.getRegionForCoordinate({
                    x: mousePosition.x - that.scale,
                    y: mousePosition.y - that.scale 
                });
                if(optionalRegion.isPresent()){
                    const region = optionalRegion.getValue();
                    that.board.getBuildingShadow().changePosition({
                        x: region.x,
                        y: region.y
                    });
                }
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
                let buildingOverlaps = false;
                const buildingShadow = that.board.getBuildingShadow();
                buildingShadow.regionsOccupied.forEach(function(region){
                    // TODO: Also check if all tiles are correct type for the building type.
                    if(region.containsABuilding()){
                        buildingOverlaps = true;
                    }
                });
                
                if(!buildingOverlaps){
                    const buildingToAdd = AntColony.BuildingTypes.getBuildingForType({
                        buildingType: that.player.getSelectedBuildingType(),
                        scale: that.scale
                    });
                    const buildingCost = buildingToAdd.cost, bonusOnBuild = buildingToAdd.bonusOnBuild;
                    if(that.player.hasResources({cost: buildingCost})){
                        that.player.pay({cost: buildingCost});
                        that.player.addResources({resources: bonusOnBuild})
                        that.board.addBuilding(buildingToAdd);

                        // that.player.addResources({
                        //     resourceType: AntColony.ResourceTypes.Population,
                        //     quantity: 5
                        // });
                        buildingToAdd.changePosition({
                            x: buildingShadow.x,
                            y: buildingShadow.y
                        });
                    }
                    
                }
                break;
            case AntColony.Player.State.DEMOLISH:
                const mousePosition = AntColony.Camera.instance.getMousePosition({
                    canvas: that.canvas,
                    event: event
                });
                const optionalRegion = that.board.getRegionForCoordinate({
                    x: mousePosition.x,
                    y: mousePosition.y 
                });
                if(optionalRegion.isPresent()){
                    const region = optionalRegion.getValue();
                    const optionalBuilding = region.getBuilding();
                    if(optionalBuilding.isPresent()){
                        that.board.removeBuilding({
                            buildingToRemove: optionalBuilding.getValue()
                        });
                    }
                }
                break;
            default:
                that.buildingPanel.deselectBuildings();
                break;
        }
    }, false);
};