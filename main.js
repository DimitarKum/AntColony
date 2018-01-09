const assetManager = new AssetManager();
$('document').ready(function(){
	for(let i = 1; i <= 29;++i){
		assetManager.queueDownload("./assets/" + i + ".png");
	}

	assetManager.downloadAll(function(){
		init(assetManager);
	});	
});

function init(){
	const canvas = document.getElementById('gameWorld');
    const ctx = canvas.getContext('2d');

    const t = new leTower(assetManager);
    setInterval(function(){t.draw(ctx);}, 30);
}

function leTower(assetManager){
	this.curFrame = 1;

	this.draw = function(ctx){
		ctx.drawImage(assetManager.getAsset("./assets/" + this.curFrame + ".png"), 10 + this.curFrame, 10 + this.curFrame);
		++this.curFrame;
		if(this.curFrame >= 30){
			this.curFrame = 1;
		}
	}
}
