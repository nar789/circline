module.exports=function (app) {
	var list=[];
	var game={};
	game.title="timingGame";
	game.package="circline.games.timing";
	game.bootimgurl="../games/timing/boot_img.png";
	game.connectimgurl="../games/timing/connect_btn.png";
	list.push(game);
	app.gamelist=list;
	return list;
}