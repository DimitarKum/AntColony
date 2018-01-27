"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.BuildingPanel = function(params) {
    AntColony.validateParams(params, "scale", "canvas", "mouseBinder", "player");
    this.scale = params.scale;
    this.menuItems = [];
    this.canvas = params.canvas;
    this.mouseBinder = params.mouseBinder;
    this.player = params.player;
    
    this.startX = params.scale * 2.5;
    this.startY = params.scale * 1;
    this.iconWidth = params.scale * 3;
    this.iconHeight = params.scale * 3;

};

AntColony.BuildingPanel.prototype.init = function(){
    const that = this;

    // TODO: Refactor menuItems so their "selectFunction"(should be clickHandler function instead)
    // does the work, not the buildingPanel.init method setting EVERYTHING up.

    // AntMound
    const antMoundMenuItem = new AntColony.AntMoundMenuItem({
        scale: this.scale
    });
    const antMoundShadow = new AntColony.AntMoundShadow({
        scale: this.scale
    });
    this.addBuildingMenuItem({
        buildingMenuItem: antMoundMenuItem,
        selectFunction: function(){
            if(antMoundMenuItem.isSelected()){
                that.deselectBuildings();
            }else{
                that.selectBuilding({
                    buildingToSelect: antMoundMenuItem,
                    buildingShadow: antMoundShadow
                });
            }
        }
    });

    // Demolish
    const demolishMenuItem = new AntColony.DemolishMenuItem({
        scale: this.scale
    });
    this.addBuildingMenuItem({
        buildingMenuItem: demolishMenuItem,
        selectFunction: function(){
            if(demolishMenuItem.isSelected()){
                that.deselectBuildings();
                // demolishMenuItem.deselect();
            }else{
                that.deselectBuildings();
                that.player.setState(AntColony.Player.State.DEMOLISH);
                demolishMenuItem.select();
                demolishMenuItem.drawIcon({context: that.canvas.getContext("2d")});
                // that.drawIcons({
                //     context: that.canvas.getContext("2d")
                // });
            }
        }
    });
    // console.log(antMoundMenuItem);
    // console.log(demolishMenuItem);

    this.drawIcons({
        context: this.canvas.getContext("2d")
    });
};


AntColony.BuildingPanel.prototype.drawIcons = function(params){
    AntColony.validateParams(params, "context");

    this.menuItems.forEach(function(building){
        building.drawIcon(params);
    });
};


AntColony.BuildingPanel.prototype.addBuildingMenuItem = function(params){
    AntColony.validateParams(params, "buildingMenuItem", "selectFunction");
    params.buildingMenuItem.iconX = this.startX;
    params.buildingMenuItem.iconY = this.startY + this.menuItems.length * (this.iconHeight + this.scale); //TODO: + .count *.... 

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
            params.selectFunction();
        }
    });

    this.menuItems.push(params.buildingMenuItem);
};

AntColony.BuildingPanel.prototype.selectBuilding = function(params){
    AntColony.validateParams(params, "buildingToSelect", "buildingShadow");
    this.deselectBuildings();

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
    this.menuItems.forEach(function(building){
        building.deselect();
    });
    this.player.resetSelectionState();
    this.drawIcons({context: this.canvas.getContext("2d")});
};


