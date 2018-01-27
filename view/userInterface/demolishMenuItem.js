"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.DemolishMenuItem = function(params) {
    AntColony.validateParams(params, "scale");

    this.scale = params.scale;

    const demolishMenuItem = new AntColony.BuildingMenuItem({
        icon: AntColony.assetManager.getAsset("./assets/redX.png"),
        scale: params.scale
    });

    const that = this;

    this.drawIcon = function(params){
        // AntColony.validateParams(params, "context");
        demolishMenuItem.drawIcon({
            context: params.context,
            iconX: that.iconX,
            iconY: that.iconY,
        });
    };

    this.select = function(){
        demolishMenuItem.select();
    };

    this.deselect = function(){
        demolishMenuItem.deselect();
    };

    this.isSelected = function() {
        return demolishMenuItem.isSelected();
    }
};