Titanium.include('Appstatus.js');
Titanium.include('validationAndErrors.js');
Titanium.include('ProgressDialog.js');

//Titanium.UI.setBackgroundColor('#000');

var appStatus=new AppStatus();
var authcode=appStatus.getAuthKey();

var resetkey='';

var objvalerrors=new ValidationAndErrors();

var win_setPwd =  Ti.UI.currentWindow;

if (appStatus.isOnline() == true) {
	//show_dialog('Login','App is online!');
} else {
	show_dialog('SetPassword','Please check you internet connection!!');
};
 
try {
	resetkey=win_setPwd.reset_key;
	
} catch(E) {
	Ti.API.info(E.toString());
}
 
var scrollView = Ti.UI.createScrollView({
	contentHeight:'auto',
	contentWidth:'auto',
	left:35,
	// top:0,
	// showVerticalScrollIndicator:true,
	// showHorizontalScrollIndicator:false
});

//win_setPwd.add(scrollView);



/*win_setPwd.orientationModes = [
	Titanium.UI.PORTRAIT,
	
]; */

var progrssBar=new ProgresDialog(); 

var imagev_signup = Titanium.UI.createImageView({
   image:'bhej_de_logo.png',
	top:200,
	width:100,
	//height:70
	
	});
//scrollView.add(imagev_signup);



var label_setPwd = Titanium.UI.createLabel({
	color:'#000',
	text:'Set your password',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
    top: 250, // vertical postion of label on the screen w.r.t screen top
   
    
});
//scrollView.add(label_setPwd);

var tx_pwd_pwd = Titanium.UI.createTextField({
    color:'#FFF',
    top:280,
     passwordMask:true,
    width:250,
    height:35,
    hintText:'Password',
    backgroundImage:'bhej_de_textfield_middle.png',
    paddingLeft:8,
    paddingRight:8,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_NEXT,
    suppressReturn:false,
    borderColor:'#FFF',
    borderWidth:1,
     font: {fontSize: 15}
     
});
//scrollView.add(tx_pwd_pwd);

var tx_con_pwd = Titanium.UI.createTextField({
    color:'#FFF',
    top:320,
     passwordMask:true,
    width:250,
    height:35,
    hintText:'Confirm Password',
    backgroundImage:'bhej_de_textfield_middle.png',
    paddingLeft:8,
    paddingRight:8,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_NEXT,
    suppressReturn:false,
     borderColor:'#FFF',
    borderWidth:1,
     font: {fontSize: 15}
});
//scrollView.add(tx_con_pwd);

var button_forP_setP = Titanium.UI.createButton({
    title: 'Set Password',
    color:'#FFF',
   top:360,
    width:250,
    height:35,
    backgroundImage:'bhej_de_button_middle.png',
    
});
button_forP_setP.addEventListener('click', function() { 
	
    var pairData={
    	reset_key:resetkey,
    	password:tx_pwd_pwd.value
    	};
    	
    	var parametrs='/users/reset_password?reset_key='+resetkey+'&password='+tx_pwd_pwd.value;
 
    	if (false == checkError())
    	 {
    	 	
    	 	if(Ti.Platform.osname== 'android') {
			doApiCall('/users/reset_password','GET','auth_key',pairData);
		} else if(Ti.Platform.osname== 'iphone') {
			doApiCall(parametrs,'GET','auth_key',pairData);
		}
    	 	//doApiCall('/users/reset_password','GET','auth_key',pairData);
    	    progrssBar.showProgrss();
    	 }; 
    
 });
 
//scrollView.add(button_forP_setP);

var label_AlreadyhaveAcc_forP = Titanium.UI.createLabel({
	color:'#000',
	text:'Already have account?',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
    top: 400, // vertical postion of label on the screen w.r.t screen top
  
    
});
//scrollView.add(label_AlreadyhaveAcc_forP);

 var button_forp_login = Titanium.UI.createButton({
    title: 'Login',
    color:'#FFF',
    top: 450, // vertical postion of label on the screen w.r.t screen top
    width: 250, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_button_middle.png',
    
});
button_forp_login.addEventListener('click', function() {
	var showWin = Titanium.UI.createWindow({
			url:"Login.js",
			title:'Bhej.de'
		});
		showWin.open();
		//win_setPwd.close();
		win_setPwd.hide();
});
//scrollView.add(button_forp_login);
 

function doApiCall(url,type,auth_key,dataArray)
	{
	  var xhr = Titanium.Network.createHTTPClient();
	  if (type.valueOf() == 'POST') 
	  {
	  	  xhr.open('POST',base_url+url);
     
	  } 
	  else if (type.valueOf() == 'GET')
	  {
	  	 xhr.open('GET',base_url+url);
	  };
	
	 //show_dialog('OnLoad',dataArray);
	
	xhr.onload = function()
	{
	try
	{
	  var result = JSON.parse(this.responseText);
	  Ti.API.info('OnLoad '+result);
      getForPData(result);     
    }
	 catch(E)
	  {
	    progrssBar.stopProgrss();
	 	show_dialog('OnLoad','Error');
	  }
	}
	xhr.send(dataArray);
   }

 function getForPData(JsonResult)
 {
 	try{
 		var success=JsonResult.success;
		if (success.valueOf().toString() == 'true') {
			progrssBar.stopProgrss();
			show_dialog('SetPassword','Password sets successfuly!');

			 var showWin = Titanium.UI.createWindow({
				 url:'Login.js',
				 title:'Bhej.de'
			 });
			 showWin.open();
			// win_setPwd.close();
           win_setPwd.hide();
		} else {
			progrssBar.stopProgrss();

			show_dialog('SetPassword','SetPassword Faild');
		};
 	}
 	catch(E)
 	{
 		progrssBar.stopProgrss();
 		show_dialog('Signup','Error');
 	}

 }

function show_dialog(title_msg,message_msg) {
	var alertDialog = Titanium.UI.createAlertDialog({
		title: title_msg,
		message: message_msg,
		buttonNames: ['OK','CANCEL']
		
	});
	alertDialog.show();
}

function checkError() 
	{		
		Ti.API.info("checkError");
		if(true == objvalerrors.validate_password(tx_pwd_pwd.value))
		{
			show_dialog('SetPassword',objvalerrors.errorMsgString);
			return true;
		}
	   if(true == objvalerrors.validate_password(tx_con_pwd.value))
		{
			show_dialog('SetPassword',objvalerrors.errorMsgString);
			return true;
		}
		return false;
	}

 //----------------
if(Ti.Platform.osname=='iphone')
{
       win_setPwd.addEventListener("click", function() {
		tx_pwd_pwd.blur();
		tx_con_pwd.blur();
	});
	
	 scrollView.addEventListener("click", function() {
		tx_pwd_pwd.blur();
		tx_con_pwd.blur();
	});
	
	
	scrollView.left=0;
	imagev_signup.top=imagev_signup.top-320;
	label_setPwd.top=label_setPwd.top-270;
	
	tx_pwd_pwd.top=tx_pwd_pwd.top-30;
	tx_con_pwd.top=tx_con_pwd.top-30;

	button_forP_setP.top=button_forP_setP.top-30;
	label_AlreadyhaveAcc_forP.top=label_AlreadyhaveAcc_forP.top-95;
	
	button_forp_login.top=button_forp_login.top-50;
	
	win_setPwd.add(scrollView);
	scrollView.add(imagev_signup);
	scrollView.add(label_setPwd);
	scrollView.add(tx_pwd_pwd);
	scrollView.add(tx_con_pwd);
	scrollView.add(button_forP_setP);
	scrollView.add(label_AlreadyhaveAcc_forP);
	scrollView.add(button_forp_login);
}
//------------------
win_setPwd.open();