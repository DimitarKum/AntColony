"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.BuildingPanel = function(params) {
    AntColony.validateParams(params, "scale", "canvas", "mouseBinder", "player");
    this.scale = params.scale;
    this.buildings = [];
    this.canvas = params.canvas;
    this.mouseBinder = params.mouseBinder;
    this.player = params.player;
    
    this.startX = params.scale * 2.5;
    this.startY = params.scale * 1;
    this.iconWidth = params.scale * 3;
    this.iconHeight = params.scale * 3;
};

AntColony.BuildingPanel.prototype.init = function(){
    this.addBuildingMenuItem({
        buildingMenuItem: new AntColony.AntMoundMenuItem({
            scale: this.scale
        }),
        buildingShadow: new AntColony.AntMoundShadow({
            scale: this.scale
        })
    });
    this.drawIcons({
        context: this.canvas.getContext("2d")
    });
};


AntColony.BuildingPanel.prototype.drawIcons = function(params){
    AntColony.validateParams(params, "context");

    this.buildings.forEach(function(building){
        building.drawIcon(params);
    });
};


AntColony.BuildingPanel.prototype.addBuildingMenuItem = function(params){
    AntColony.validateParams(params, "buildingMenuItem", "buildingShadow");
    params.buildingMenuItem.iconX = this.startX;
    params.buildingMenuItem.iconY = this.startY; //TODO: + .count *.... 

    const that = this;
    this.mouseBinder.bindRegionToEvent({
        region: {
            x: params.buildingMenuItem.iconX,
            y: params.buildingMenuItem.iconY,
            width: this.iconWidth,
            height: this.iconHeight
        },
        eventType: "click",
        eventHandler: function(){
            if(params.buildingMenuItem.isSelected()){
                that.deselectBuildings();
            }else{
                that.selectBuilding({
                    buildingToSelect: params.buildingMenuItem,
                    buildingShadow: params.buildingShadow
                });
            }
        }
    });

    this.buildings.push(params.buildingMenuItem);
};

AntColony.BuildingPanel.prototype.selectBuilding = function(params){
    AntColony.validateParams(params, "buildingToSelect", "buildingShadow");

    this.buildings.forEach(function(building){
        building.deselect();
    });

    params.buildingToSelect.select();
    this.player.selectBuilding({
        buildingToSelect: params.buildingToSelect.buildingType,
        buildingShadow: params.buildingShadow
    });

    params.buildingShadow.changePosition({
        x: -10 * this.scale,
        y: -10 * this.scale
    });
    params.buildingToSelect.drawIcon({context: this.canvas.getContext("2d")});
};

AntColony.BuildingPanel.prototype.deselectBuildings = function(){
    this.buildings.forEach(function(building){
        building.deselect();
    });
    this.player.resetSelectionState();
    this.drawIcons({context: this.canvas.getContext("2d")});
};


