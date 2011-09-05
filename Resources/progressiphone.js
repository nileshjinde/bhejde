var win_progress = Ti.UI.currentWindow;
win_progress.backgroundImage='bhej_de_screen2_bg.png';


var label_login = Titanium.UI.createLabel({
	color:'#000',
	text:'Loading please wait....',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
    top: -180, // vertical postion of label on the screen w.r.t screen top
   
    
});
win_progress.add(label_login);

var webview = Ti.UI.createWebView({
    html:'<html><body><img src="ajax-loader.gif"></body></html>',
    backgroundColor:'#54affe',
    top:160,
    width:50,
    height:50
});
win_progress.add(webview);

var button_cancel = Ti.UI.createButton({
    title:  'Cancel',
    width:  200,
    height:  35,
    top:240,
  
    });
 
button_cancel.addEventListener('click', function() {
 
   var showWin = Titanium.UI.createWindow({
			url:"Home.js",
			title:'Bhej.de'
		});
		showWin.FLAG='NO';
		showWin.open();
		
		win_progress.hide();	
});
 win_progress.add(button_cancel);



win_progress.open();





