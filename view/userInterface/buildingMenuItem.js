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
};

AntColony.BuildingMenuItem.States = {SELECTED: 0, DESELECTED: 1};

AntColony.BuildingMenuItem.prototype.drawDeselectedBorder = function(params){
    // AntColony.validateParams(params, "context", "iconX", "iconY");
    params.context.save();
    let iconBorderWidth = 6;
    params.context.strokeStyle = "#FFFFFF";
    params.context.lineWidth = iconBorderWidth;
    params.context.rect(
        params.iconX - 1 * iconBorderWidth,
        params.iconY - 1 * iconBorderWidth,
        this.iconDX + 2 * iconBorderWidth,
        this.iconDY + 2 * iconBorderWidth
        );
    // TODO: Figure out why 3 strokes are needed to draw properly.
    params.context.stroke();
    params.context.stroke();
    params.context.stroke();
    params.context.restore();
};

AntColony.BuildingMenuItem.prototype.drawSelectedBorder = function(params){
    params.context.save();
    const iconBorderWidth = 8;
    params.context.stroke
    params.context.strokeStyle = "#F0A000";
    params.context.rect(
        params.iconX - iconBorderWidth,
        params.iconY - iconBorderWidth, this.iconDX + 2 * iconBorderWidth,
        this.iconDY + 2 * iconBorderWidth
        );
    // TODO: Figure out why 3 strokes are needed to draw properly.
    params.context.stroke();
    params.context.stroke();
    params.context.stroke();
    params.context.restore();
};

AntColony.BuildingMenuItem.prototype.drawIcon = function(params){
    AntColony.validateParams(params, "context", "iconX", "iconY");

    params.context.drawImage(this.icon, params.iconX, params.iconY, this.iconDX, this.iconDY);
    // this.drawBorderForState[this.selectionState](params);
    if(this.selectionState === AntColony.BuildingMenuItem.States.SELECTED){
        const that = this;
        window.requestAnimationFrame(function(timestamp){
            that.drawSelectedBorder(params);
        });
    }else if(this.selectionState === AntColony.BuildingMenuItem.States.DESELECTED){
        const that = this;
            // window.setTimeout(function(){
        window.requestAnimationFrame(function(timestamp){
            that.drawDeselectedBorder(params);
        });
    }
};

AntColony.BuildingMenuItem.prototype.select = function(){
    this.selectionState = AntColony.BuildingMenuItem.States.SELECTED;
};

AntColony.BuildingMenuItem.prototype.deselect = function(){
    this.selectionState = AntColony.BuildingMenuItem.States.DESELECTED;
};

AntColony.BuildingMenuItem.prototype.isSelected = function(){
    return this.selectionState === AntColony.BuildingMenuItem.States.SELECTED;
};