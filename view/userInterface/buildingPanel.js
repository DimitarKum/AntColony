"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.BuildingPanel = function(params) {
    AntColony.validateParams(params, "scale", "canvas", "mouseBinder", "player", "descriptionsCanvas");
    this.scale = params.scale;
    this.menuItems = [];
    this.canvas = params.canvas;
    this.mouseBinder = params.mouseBinder;
    this.player = params.player;
    
    this.startX = params.scale * 1;
    this.startY = params.scale * 0.5;

    this.descriptionsCanvas = params.descriptionsCanvas;
};

AntColony.BuildingPanel.prototype.init = function(){
    const that = this;

        // Instructions
    const instructionsMenuItem = new AntColony.InstructionsMenuItem({
        scale: this.scale
    });
    this.addBuildingMenuItem({
        buildingMenuItem: instructionsMenuItem,
        clickHandler: function(){
                // height: 100px;
    
            $("#dialog").dialog({
                width: 800,
                resizable: false,
                modal: true,
                dialogClass: 'no-close'
            });
            $("#dialog").css({height:"500px", overflow: "auto"});
        }
    });

    // TODO: Refactor menuItems so their "clickHandler" function
    // does the work, not the buildingPanel.init method setting EVERYTHING up.

    // AntMound
    const antMoundMenuItem = new AntColony.AntMoundMenuItem({
        scale: this.scale
    });
    this.addBuildableMenuItem({buildingMenuItem: antMoundMenuItem});
    const pebbleQuarryMenuItem = new AntColony.PebbleQuarryMenuItem({
        scale: this.scale
    });
    this.addBuildableMenuItem({buildingMenuItem: pebbleQuarryMenuItem});
    const treeInfestationMenuItem = new AntColony.TreeInfestationMenuItem({
        scale: this.scale
    });
    this.addBuildableMenuItem({buildingMenuItem: treeInfestationMenuItem});
    const antTrailMenuItem = new AntColony.AntTrailMenuItem({
        scale: this.scale
    });
    this.addBuildingMenuItem({
        buildingMenuItem: antTrailMenuItem,
        clickHandler: function(){
            if(antTrailMenuItem.isSelected()){
                that.deselectBuildings();
                // antTrailMenuItem.deselect();
            }else{
                that.deselectBuildings();
                that.player.setState(AntColony.Player.State.START_TRAIL);
                antTrailMenuItem.select();
                antTrailMenuItem.drawIcon({context: that.canvas.getContext("2d")});
                const ctx = that.descriptionsCanvas.getContext("2d");
                const startX = that.scale * 21.25;
                ctx.beginPath();
                ctx.save();
                ctx.clearRect(
                    startX,
                    0,
                    that.scale * 8,
                    that.scale * 8
                    );
                const fontSize = Math.floor(that.scale * 0.30);
                // ctx.font = "bold " + Math.floor(AntColony.Globals.Scale * 2.0) + "px Arial";
                ctx.font = fontSize + "px Consolas";
                ctx.fillStyle = "#F0A000";
                ctx.fillText(
                    "Costs:",
                    startX,
                    fontSize
                );
                ctx.fillText(
                    "1 Population",
                    startX,
                    fontSize * 2.05
                );
                ctx.fillText(
                    "Effect:",
                    startX,
                    fontSize * 3.50
                );
                ctx.fillText(
                    "Tranports a resource between",
                    startX,
                    fontSize * 4.55
                );
                ctx.fillText(
                    "2 buildings.",
                    startX,
                    fontSize * 5.60
                );
                ctx.restore();
                ctx.closePath();
            }
        }
    });

    const wellMenuItem = new AntColony.WellMenuItem({
        scale: this.scale
    });
    this.addBuildableMenuItem({buildingMenuItem: wellMenuItem});

    const beetleFarmMenuItem = new AntColony.BeetleFarmMenuItem({
        scale: this.scale
    });
    this.addBuildableMenuItem({buildingMenuItem: beetleFarmMenuItem});

    const raspberryFarmMenuItem = new AntColony.RaspberryFarmMenuItem({
        scale: this.scale
    });
    this.addBuildableMenuItem({buildingMenuItem: raspberryFarmMenuItem});

    // Demolish
    const demolishMenuItem = new AntColony.DemolishMenuItem({
        scale: this.scale
    });
    this.addBuildingMenuItem({
        buildingMenuItem: demolishMenuItem,
        clickHandler: function(){
            if(demolishMenuItem.isSelected()){
                that.deselectBuildings();
                // demolishMenuItem.deselect();
            }else{
                that.deselectBuildings();
                that.player.setState(AntColony.Player.State.DEMOLISH);
                demolishMenuItem.select();
                demolishMenuItem.drawIcon({context: that.canvas.getContext("2d")});
                const ctx = that.descriptionsCanvas.getContext("2d");
                const startX = that.scale * 21.25;
                ctx.beginPath();
                ctx.save();
                ctx.clearRect(
                    startX,
                    0,
                    that.scale * 8,
                    that.scale * 8
                    );
                const fontSize = Math.floor(that.scale * 0.30);
                // ctx.font = "bold " + Math.floor(AntColony.Globals.Scale * 2.0) + "px Arial";
                ctx.font = fontSize + "px Consolas";
                ctx.fillStyle = "#F0A000";
                ctx.fillText(
                    "Effect:",
                    startX,
                    fontSize
                );
                ctx.fillText(
                    "Demolish a building.",
                    startX,
                    fontSize * 3.05
                );
                ctx.fillText(
                    "All resources are refunded.",
                    startX,
                    fontSize * 4.10
                );
                ctx.fillText(
                    "Any connected trails are also",
                    startX,
                    fontSize * 5.15
                );
                ctx.fillText(
                    "demolished and refunded.",
                    startX,
                    fontSize * 6.20
                );
                ctx.restore();
                ctx.closePath();
            }
        }
    });
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
    AntColony.validateParams(params, "buildingMenuItem", "clickHandler");
    const rows = 5;
    params.buildingMenuItem.iconX = this.startX + Math.floor(this.menuItems.length / rows) * (params.buildingMenuItem.width + this.scale * 1.55);
    params.buildingMenuItem.iconY = this.startY + (this.menuItems.length % rows) * (params.buildingMenuItem.height + this.scale); //TODO: + .count *.... 

    const that = this;
    this.mouseBinder.bindRegionToEvent({
        region: {
            x: params.buildingMenuItem.iconX,
            y: params.buildingMenuItem.iconY,
            width: params.buildingMenuItem.width,
            height: params.buildingMenuItem.height,
        },
        eventType: "click",
        eventHandler: function(){
            params.clickHandler();
        }
    });

    this.menuItems.push(params.buildingMenuItem);
};

AntColony.BuildingPanel.prototype.addBuildableMenuItem = function(params){
    AntColony.validateParams(params, "buildingMenuItem");
    const that = this;
    const menuItem = params.buildingMenuItem;
    params.clickHandler = function(){
        if(menuItem.isSelected()){
            that.deselectBuildings();
        }else{
            that.selectBuilding({
                buildingType: menuItem.buildingType
            });
            menuItem.select();
            menuItem.drawIcon({context: that.canvas.getContext("2d")});
        }
    };
    this.addBuildingMenuItem(params);
};
AntColony.BuildingPanel.prototype.selectBuilding = function(params){
    AntColony.validateParams(params, "buildingType");
    this.deselectBuildings();

    // params.buildingToSelect.select();
    this.player.selectBuilding({
        buildingType: params.buildingType,
    });

    const ctx = this.descriptionsCanvas.getContext("2d");
    const startX = this.scale * 21.25;
    const building = AntColony.BuildingTypes.getBuildingForType({buildingType: params.buildingType, scale: 1});
    ctx.beginPath();
    ctx.save();
    ctx.clearRect(
        startX,
        0,
        this.scale * 8,
        this.scale * 8
        );
    const fontSize = Math.floor(this.scale * 0.30);
    // ctx.font = "bold " + Math.floor(AntColony.Globals.Scale * 2.0) + "px Arial";
    ctx.font = fontSize + "px Consolas";
    ctx.fillStyle = "#F0A000";
    ctx.fillText(
        "Costs:",
        startX,
        fontSize
    );
    ctx.fillText(
        building.cost,
        startX,
        fontSize * 2.05
    );
    ctx.fillText(
        "Bonus On Build:",
        startX,
        fontSize * 3.50
    );
    ctx.fillText(
        building.bonusOnBuild,
        startX,
        fontSize * 4.55
    );
    if(params.buildingType === AntColony.BuildingTypes.AntMound){
        ctx.fillStyle = "#FF2010";
        ctx.fillText(
            "Collects & accumulates",
            startX,
            fontSize * 6.00
        );
        ctx.fillText(
            "resources to global bank.",
            startX,
            fontSize * 7.05
        );
        ctx.fillStyle = "#F0A000";
    }else{
        ctx.fillText(
            "Production Requires:",
            startX,
            fontSize * 6.00
        );
        ctx.fillText(
            building.upkeep,
            startX,
            fontSize * 7.05
        );
    }
    
    ctx.fillText(
        "Produces:",
        startX,
        fontSize * 8.50
    );
    ctx.fillText(
        building.production,
        startX,
        fontSize * 9.55
    );
    ctx.restore();
    ctx.closePath();

    // params.buildingToSelect.drawIcon({context: this.canvas.getContext("2d")});
};

AntColony.BuildingPanel.prototype.deselectBuildings = function(){
    this.menuItems.forEach(function(building){
        building.deselect();
    });
    this.player.resetSelectionState();
    this.drawIcons({context: this.canvas.getContext("2d")});
    const ctx = this.descriptionsCanvas.getContext("2d");
    const startX = this.scale * 21.25;
    ctx.beginPath();
    ctx.save();
    ctx.clearRect(
        startX,
        0,
        this.scale * 8,
        this.scale * 8
    );
    ctx.restore();
    ctx.closePath();
};


