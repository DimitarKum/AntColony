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
            case AntColony.Player.State.START_TRAIL:
                break;
            case AntColony.Player.State.FINISH_TRAIL:
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
                let buildingOverlaps = false, correctTileType = false;
                const buildingToAdd = AntColony.BuildingTypes.getBuildingForType({
                    buildingType: that.player.getSelectedBuildingType(),
                    scale: that.scale
                });
                const buildingShadow = that.board.getBuildingShadow();
                let tileType = "";
                buildingShadow.regionsOccupied.forEach(function(region){
                    // TODO: Also check if all tiles are correct type for the building type.
                    if(region.containsABuilding()){
                        buildingOverlaps = true;
                    }
                    buildingToAdd.buildTerrain.forEach(function(tile){
                        if(tile === region.tile.terrainType){
                            correctTileType = true;
                        }
                    });
                });

                if(!that.player.hasResources({cost: buildingToAdd.cost})){
                    AntColony.Globals.Board.addTextEffect({
                        text: "Cannot build " + AntColony.BuildingNames[that.player.getSelectedBuildingType()] +"; not enough resources!",
                        duration: 300
                    });
                }
                else if(buildingOverlaps){
                    AntColony.Globals.Board.addTextEffect({
                        text: "Cannot build " + AntColony.BuildingNames[that.player.getSelectedBuildingType()] +"; tile already occupied by a building!",
                        duration: 300
                    });
                }else if(!correctTileType){
                    AntColony.Globals.Board.addTextEffect({
                        text: "Cannot build " + AntColony.BuildingNames[that.player.getSelectedBuildingType()] +"; wrong terrain type!",
                        duration: 300
                    });
                }

                if(!buildingOverlaps && correctTileType){
                    const buildingCost = buildingToAdd.cost, bonusOnBuild = buildingToAdd.bonusOnBuild;
                    if(that.player.hasResources({cost: buildingCost})){
                        that.player.pay({cost: buildingCost});
                        that.player.addResources({resources: bonusOnBuild});
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
            {
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
                    if(optionalBuilding.isPresent() && that.player.hasResources({cost: optionalBuilding.getValue().bonusOnBuild})){
                        const building = optionalBuilding.getValue();
                        that.board.removeBuilding({
                            buildingToRemove: building
                        });
                        building.trails.forEach(function(trail){
                            that.player.addResources({resources: AntColony.AntTrail_Cost});
                        });
                        that.player.addResources({resources: building.cost});
                        that.player.dumpResourceBank({resourceBank: building.resourceBank});
                        that.player.pay({cost: building.bonusOnBuild});
                    }else if(optionalBuilding.isPresent()){
                        AntColony.Globals.Board.addTextEffect({
                            text: "Cannot demolish Ant Mound; population is in use!",
                            duration: 300
                        });
                    }
                }
            }
                break;
            case AntColony.Player.State.START_TRAIL:
            {
                if(that.player.hasResources({cost: AntColony.AntTrail_Cost})){
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
                            const building = optionalBuilding.getValue();
                            // console.log(building);
                            that.player.buildingTrailStart = building;
                            that.player.buildingTrailStart.select();
                            that.player.state = AntColony.Player.State.FINISH_TRAIL;
                        }
                    }
                }else{
                    AntColony.Globals.Board.addTextEffect({
                        text: "Not enough population to start an Ant Trail!",
                        duration: 150
                    });
                }
                
            }
                break;
            case AntColony.Player.State.FINISH_TRAIL:
            {
                that.player.pay({cost: AntColony.AntTrail_Cost});
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
                        that.player.buildingTrailStart.deselect();
                        const building = optionalBuilding.getValue();
    // AntColony.validateParams(params, "building1", "building1");
                        const consumerProducer = AntColony.getBuildingsConsumptionProduction({
                            building1: that.player.buildingTrailStart,
                            building2: building
                        });
                        if(consumerProducer.resourceType !== null){
                            const antTrail = new AntColony.AntTrail(consumerProducer);
                            that.board.addTrail(antTrail);
                        }
                        // console.log(building);
                        // that.player.buildingTrailStart = building;
                        that.player.state = AntColony.Player.State.START_TRAIL;
                        // that.buildingPanel.deselectBuildings();
                    }
                }
            }
                break;
            default:
                that.buildingPanel.deselectBuildings();
                break;
        }
    }, false);
};