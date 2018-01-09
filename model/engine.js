function Engine(params){
    validateParams(params, "canvas", "context", "gameSpeed", "frameRate")
    this.canvas = params.canvas;
    this.ctx = params.context;
    this.gameSpeed = params.gameSpeed;
    this.frameRate = params.frameRate;

    this.trails = [];
    this.buildings = [];
    this.items = [];

    this.setInterval(function(){
        this.update();
        this.draw();
    }, 50);
}

Engine.prototype.update = function(){
    this.buildings.forEach(function(building){
        building.update();
    });
    this.items.forEach(function(item){
        item.update();
    });
};

Engine.prototype.draw = function(){
    this.drawTiles();

    this.buildings.forEach(function(building){
        building.draw(this.ctx);
    });

    this.items.forEach(function(item){
        this.item.draw(this.ctx);
    });
};

Engine.prototype.drawTiles = function(){
    //Not implemented
};