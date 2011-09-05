Titanium.include('Appstatus.js');
Titanium.include('validationAndErrors.js');
Titanium.include('ProgressDialog.js');

var appStatus=new AppStatus();
var authcode=appStatus.getAuthKey();

var resetkey='Empty';

var objvalerrors=new ValidationAndErrors();

var win_login =  Ti.UI.currentWindow;

if (appStatus.isOnline() == true) {
	//show_dialog('Login','App is online!');
	if(appStatus.isRegistered() == true) {
		
		//show_dialog('Login','You are registered!');	
		Ti.Api.info('Login*************'+'You are registered!');
	
		var showWin = Titanium.UI.createWindow({
			url:"Home.js",
			title:'Bhej.de'
		});
		
		showWin.FLAG='NO';
		showWin.open();
		//win_home.close();
		win_home.hide();
	}
} else {
	show_dialog('Login','Please check you internet connection!!');
};
 
var progrssBar=new ProgresDialog(); 

var scrollView = Ti.UI.createScrollView({
	contentHeight:'auto',
	contentWidth:'auto',
	left:35,
	// top:0,
	// showVerticalScrollIndicator:true,
	// showHorizontalScrollIndicator:false
});

win_login.add(scrollView);



var imagev = Titanium.UI.createImageView({
   image:'bhej_de_logo.png',
	top:170,
	width:100,
	heigh:70
	
	});
scrollView.add(imagev);

var label_login = Titanium.UI.createLabel({
	color:'#000',
	text:'Login',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
    top: 220, // vertical postion of label on the screen w.r.t screen top
   
    
});
scrollView.add(label_login);

var tx_email = Titanium.UI.createTextField({
    color:'#FFF',
    top:250,
    
    width:250,
    height:35,
    hintText:'Email',
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
scrollView.add(tx_email);



var tx_pwd = Titanium.UI.createTextField({
    color:'#FFF',
    top:290,
   
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
    passwordMask:true,
     font: {fontSize: 15}
});
scrollView.add(tx_pwd);

var tx_for_mob = Titanium.UI.createTextField({
    color:'#FFF',
    top:290,
   
    width:250,
    height:35,
    hintText:'MobileNo.',
    backgroundImage:'bhej_de_textfield_middle.png',
    paddingLeft:8,
    paddingRight:8,
   // keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_NEXT,
     keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
    suppressReturn:false,
     borderColor:'#FFF',
    borderWidth:1,
   
     font: {fontSize: 15},
     visible:false
});
scrollView.add(tx_for_mob);


 
var button_login = Titanium.UI.createButton({
    title: 'Login',
    color:'#FFF',
    top: 330, // vertical postion of label on the screen w.r.t screen top
    width: 250, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_button_middle.png',
    
});

if(Ti.Platform.osname=='iphone')
{
	//button_login.top=button_login.top-30;
}

button_login.addEventListener('click', function() {
	var pairData= {
		email:tx_email.value,
		password:tx_pwd.value
	};

	  // var pairData={email:'nilesh@weboniselab.com',password:'nilesh'};
	if (false == hasErrors(true)) {
		doApiCall('/users/login','POST','auth_key',pairData,0);
		progrssBar.showProgrss();
	};
	
});
scrollView.add(button_login);

var button_for_pwd = Titanium.UI.createButton({
    title: 'Forgot password',
    color:'#FFF',
    top: 330, // vertical postion of label on the screen w.r.t screen top
    width: 250, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_button_middle.png',
    visible:false
});
button_for_pwd.addEventListener('click', function() {
	
	var pairData= {
		email:tx_email.value,
		phone:tx_for_mob.value
	};
	
	var parametrs='/users/forgot_password?email='+tx_email.value+'&phone='+tx_for_mob.value;
	
	if (false == hasErrors(false))
	 {
	 	if(Ti.Platform.osname== 'android')
	 	{
	 		 doApiCall('/users/forgot_password','GET','auth_key',pairData,1);
	 	}
	 	else if(Ti.Platform.osname== 'iphone')
	 	{
	 		 doApiCall(parametrs,'GET','auth_key',pairData,1);
	 	}
	 	
	 progrssBar.showProgrss();
	};
	
});
scrollView.add(button_for_pwd);

var label_new_on = Titanium.UI.createLabel({
	color:'#000',
	text:'New on bhej.de?',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
    top: 380, // vertical postion of label on the screen w.r.t screen top
});

scrollView.add(label_new_on);

var button_signup = Titanium.UI.createButton({
    title: 'Sign up',
    color:'#FFF',
    top: 410, // vertical postion of label on the screen w.r.t screen top
    width: 250, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_button_middle.png',
    
});
button_signup.addEventListener('click', function() {
	var showWin = Titanium.UI.createWindow({
			url:"Signup.js",
			title:'Bhej.de'
		});
		showWin.open();
		//win_login.close();
		win_login.hide();
});
scrollView.add(button_signup);

var label_forgot_pwd = Titanium.UI.createLabel({
	color:'#003bb0',
	text:'Forgot passord?',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
    top: 440, // vertical postion of label on the screen w.r.t screen top 
});
label_forgot_pwd.addEventListener('click', function() {
	
	tx_pwd.visible=false;
	button_login.visible=false;
	label_new_on.visible=false;
	button_signup.visible=false;
	label_forgot_pwd.visible=false;
	
	button_for_pwd.visible=true;
	tx_for_mob.visible=true;
	
});
scrollView.add(label_forgot_pwd);


 function doApiCall(url,type,auth_key,dataArray,iFlg)
	{
	  var xhr = Titanium.Network.createHTTPClient();
	 // show_dialog('OnLoad',type.valueOf());
	  
	  if (type.valueOf() == 'POST') 
	  {
	  	  xhr.open('POST',base_url+url);
     
	  } 
	  else if (type.valueOf() == 'GET')
	  {
	  	 xhr.open('GET',base_url+url);
	  };
	
	// show_dialog('OnLoad_para',dataArray);
	
	xhr.onload = function()
	{
	try
	{
	  var result = JSON.parse(this.responseText);
	 // show_dialog('OnLoad_response',result);
	 
	 Ti.API.info('After *********************************');
	 
	  Titanium.API.info('Status: ' + this.status);
    Titanium.API.info('ResponseText: ' + this.responseText);
    Titanium.API.info('connectionType: ' + this.connectionType);
    Titanium.API.info('location: ' + this.location); 
	 
	 if (iFlg == 0)  // login
	   {
	     getLoginData(result);
	   }
	   else if (iFlg == 1) //forgotPwd
	   {
	    	getForgotPwd(result);
	   }; 
          
    }
	 catch(E)
	  {
	  	progrssBar.stopProgrss();
			show_dialog('OnLoad','Error');
			}
	}
	xhr.send(dataArray);
   }

  function getForgotPwd(JsonResult) {
	try {
		
		var success=JsonResult.success;
		if (success.valueOf().toString() == 'true') {
			
			resetkey=JsonResult.reset_key;
			progrssBar.stopProgrss();
			//show_dialog('ForgotPassword',resetkey);

			 var showWin = Titanium.UI.createWindow({
				 url:'Setpassword.js',
				 title:'Bhej.de'
			 });
			 showWin.reset_key=resetkey;
			 showWin.open();
			 //win_login.close();
			 win_login.hide();

		} else {
			progrssBar.stopProgrss();

			show_dialog('ForgotPassword','ForgotPassword Faild');
		};
	} catch(E) {
		progrssBar.stopProgrss();
		show_dialog('ForgotPassword','Error');
	}

}

function getLoginData(JsonResult) {
	try {
		var success=JsonResult.success;
		if (success.valueOf().toString() == 'true') {
			authcode=JsonResult.auth_code;
			appStatus.setAuthKey(authcode);

			progrssBar.stopProgrss();

			Ti.API.info('In *********************************');

			show_dialog('Login','Login Successful!');

			var showWin = Titanium.UI.createWindow({
				url:"Home.js",
				title:'Bhej.de'
			});
			showWin.FLAG='NO';
			showWin.open();
			//win_login.close();
             win_login.hide();
		} else {
			progrssBar.stopProgrss();

			show_dialog('Login','Login Faild');
		};
	} catch(E) {
		progrssBar.stopProgrss();
		show_dialog('Login','Error');
	}

}
 function show_dialog(title_msg,message_msg)
  {
   var alertDialog = Titanium.UI.createAlertDialog({
        	title: title_msg,
        	message: message_msg,
        	buttonNames: ['OK','CANCEL']
       		});
       		alertDialog.show();
       		
       

	// Ti.API.info(title_msg+'*************'+message_msg+'*******************************');   
 }
 
 
 function hasErrors(bFromLogin)
 {
 	Ti.API.info('In hasErrors********************************************');
	if(true == objvalerrors.validate_email(tx_email.value)) 
	{
		show_dialog('Login',objvalerrors.errorMsgString);
		return true;
	}
	if(true == bFromLogin) {
		if(true == objvalerrors.validate_password(tx_pwd.value)) {
			show_dialog('Login',objvalerrors.errorMsgString); 
			return true;
		}
	} else {
		if(true == objvalerrors.validate_Mobile_No(tx_for_mob.value))
		{
			show_dialog('ForgotPassword',objvalerrors.errorMsgString);
			return true;
		}
	}
	return false;
 }
 
 
 //----------------
if(Ti.Platform.osname=='iphone')
{
       win_login.addEventListener("click", function() {
		tx_email.blur();
		tx_pwd.blur();
		tx_for_mob.blur();
	});
	
	 /*scrollView.addEventListener("click", function() {
		tx_email.blur();
		tx_pwd.blur();
		tx_for_mob.blur();
	});*/
	
	
	scrollView.left=0;
	imagev.top=imagev.top-320;
	label_login.top=label_login.top-270;
	
	tx_email.top=tx_email.top-30;
	tx_pwd.top=tx_pwd.top-30;
	tx_for_mob.top=tx_for_mob.top-30;
	button_login.top=button_login.top-30;
	
	button_for_pwd.top=button_for_pwd.top-30;
	label_new_on.top=label_new_on.top-95;
	button_signup.top=button_signup.top-25;
	label_forgot_pwd.top=label_forgot_pwd.top-35;
}
//------------------
 
 
win_login.open();