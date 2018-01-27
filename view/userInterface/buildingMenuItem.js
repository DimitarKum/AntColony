"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.BuildingMenuItem = function(params){
    AntColony.validateParams(params, "icon", "scale");

    this.icon = params.icon;
    this.scale = params.scale;
    this.iconDX = this.scale * 3;
    this.iconDY = this.scale * 3;
    this.selectionState = AntColony.BuildingMenuItem.States.DESELECTED;

    const that = this;

    this.drawDeselectedBorder = function(params){
        // AntColony.validateParams(params, "context", "iconX", "iconY");
        params.context.save();
        params.context.beginPath();
        let iconBorderWidth = 6;
        params.context.strokeStyle = "#FFFFFF";
        params.context.lineWidth = iconBorderWidth;
        params.context.rect(
            params.iconX - 1 * iconBorderWidth,
            params.iconY - 1 * iconBorderWidth,
            that.iconDX + 2 * iconBorderWidth,
            that.iconDY + 2 * iconBorderWidth
        );
        params.context.closePath();
        params.context.stroke();
        params.context.restore();
    };

    this.drawSelectedBorder = function(params){
        // AntColony.validateParams(params, "context", "iconX", "iconY");
        params.context.save();
        params.context.beginPath();
        const iconBorderWidth = 6;
        params.context.strokeStyle = "#F0A000";
        params.context.lineWidth = iconBorderWidth;
        params.context.rect(
            params.iconX - iconBorderWidth,
            params.iconY - iconBorderWidth, that.iconDX + 2 * iconBorderWidth,
            that.iconDY + 2 * iconBorderWidth
            );
        params.context.closePath();
        params.context.stroke();
        params.context.restore();
    };

    this.drawIcon = function(params){
        AntColony.validateParams(params, "context", "iconX", "iconY");

        // that.drawBorderForState[that.selectionState](params);
        if(that.selectionState === AntColony.BuildingMenuItem.States.SELECTED){
            window.requestAnimationFrame(function(timestamp){
                that.drawSelectedBorder(params);
                params.context.drawImage(that.icon, params.iconX, params.iconY, that.iconDX, that.iconDY);
            });
        }else if(that.selectionState === AntColony.BuildingMenuItem.States.DESELECTED){
                // window.setTimeout(function(){
            window.requestAnimationFrame(function(timestamp){
                that.drawDeselectedBorder(params);
                params.context.drawImage(that.icon, params.iconX, params.iconY, that.iconDX, that.iconDY);
            });
        }

    };

    this.select = function(){
        that.selectionState = AntColony.BuildingMenuItem.States.SELECTED;
    };

    this.deselect = function(){
        that.selectionState = AntColony.BuildingMenuItem.States.DESELECTED;
    };

    this.isSelected = function(){
        return that.selectionState === AntColony.BuildingMenuItem.States.SELECTED;
    };

};

AntColony.BuildingMenuItem.States = {SELECTED: 0, DESELECTED: 1};




