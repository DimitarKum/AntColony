"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.AntMoundMenuItem = function(params){
    AntColony.validateParams(params, "scale");

    this.scale = params.scale;
    this.buildingType = AntColony.Buildings.AntMound;

    const antMoundMenuItem = new AntColony.BuildingMenuItem({
        icon: AntColony.assetManager.getAsset("./assets/moundIcon.png"),
        scale: params.scale
    });

    const that = this;
    this.drawIcon = function(params){
        // AntColony.validateParams(params, "context");
        antMoundMenuItem.drawIcon({
            context: params.context,
            iconX: that.iconX,
            iconY: that.iconY,
        });
    };

    this.select = function(){
        antMoundMenuItem.select();
    };

    this.deselect = function(){
        antMoundMenuItem.deselect();
    };

    this.isSelected = function() {
        return antMoundMenuItem.isSelected();
    }
};



