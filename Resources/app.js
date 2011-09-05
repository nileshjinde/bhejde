var win_main = Titanium.UI.createWindow({  
    title:'Bhej.de',
    backgroundImage:'bhej_de_bg.jpg'
});

win_main.open();

var showWin = Titanium.UI.createWindow({
	url:"Home.js",
	title:'Bhej.de'
});

showWin.FLAG='APP';
showWin.open();  
 