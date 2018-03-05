"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.BuildingMenuItem = function(params){
    AntColony.validateParams(params, "icon", "scale", "name");

    this.icon = params.icon;
    this.scale = params.scale;
    
    this.iconDX = this.scale * 1.05;
    this.iconDY = this.scale * 1.05;
    this.width = this.iconDX * 0.9;
    this.height = this.iconDY * 0.9;
    this.selectionState = AntColony.BuildingMenuItem.States.DESELECTED;

    const that = this;
    const name = params.name;

    this.drawDeselectedBorder = function(params){
        // AntColony.validateParams(params, "context", "iconX", "iconY");
        params.context.save();
        params.context.beginPath();
        const iconBorderWidth = Math.floor(that.iconDX / 12);
        params.context.strokeStyle = "#FFFFFF";
        params.context.lineWidth = iconBorderWidth;
        params.context.rect(
            that.iconX - 1 * iconBorderWidth,
            that.iconY - 1 * iconBorderWidth,
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
        const iconBorderWidth = Math.floor(that.iconDX / 12);
        params.context.strokeStyle = "#F0A000";
        params.context.lineWidth = iconBorderWidth;
        params.context.rect(
            that.iconX - 1 * iconBorderWidth,
            that.iconY - 1 * iconBorderWidth,
            that.iconDX + 2 * iconBorderWidth,
            that.iconDY + 2 * iconBorderWidth
            );
        params.context.closePath();
        params.context.stroke();
        params.context.restore();
    };

    this.drawIcon = function(params){
        // AntColony.validateParams(params, "context", "iconX", "iconY");
        AntColony.validateParams(params, "context");
        // that.drawBorderForState[that.selectionState](params);
        if(that.selectionState === AntColony.BuildingMenuItem.States.SELECTED){
            window.requestAnimationFrame(function(timestamp){
                that.drawSelectedBorder(params);
                params.context.drawImage(that.icon, that.iconX, that.iconY, that.iconDX, that.iconDY);

            });
        }else if(that.selectionState === AntColony.BuildingMenuItem.States.DESELECTED){
                // window.setTimeout(function(){
            window.requestAnimationFrame(function(timestamp){
                that.drawDeselectedBorder(params);
                params.context.drawImage(that.icon, that.iconX, that.iconY, that.iconDX, that.iconDY);
                const ctx = params.context;
                ctx.beginPath();
                ctx.save();
                // ctx.font = "bold " + Math.floor(AntColony.Globals.Scale * 2.0) + "px Arial";
                ctx.font = Math.floor(that.scale * 0.30) + "px Consolas";
                ctx.fillStyle = "#F0A000";
                ctx.fillText(
                    name,
                    that.iconX + that.width / 2.0 - name.length * 0.5 * that.scale * 0.16,
                    that.iconY + that.height + that.scale * 0.5
                );
                ctx.restore();
                ctx.closePath();
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




