function ProgresDialog()
{
	var interval;
	
	 var proDialog = Titanium.UI.createAlertDialog({
	 title: 'FileUpload',
	 message: 'Uploading please wait....',
	 
 });

	
	if (Ti.Platform.osname == 'android') 
	{
		 var ind = Titanium.UI.createActivityIndicator({
		location:Titanium.UI.ActivityIndicator.DIALOG,
		type:Titanium.UI.ActivityIndicator.DETERMINANT,
		message:'Loading please wait....',
		min:0,
		max:100,
		value:0
	});
	
	 this.showProgrss=function()
     {
	  ind.show();
      }
     
     this.stopProgrss= function() {
		
		 ind.value=100;
		 ind.hide();
	}
	
	this.setValtoProgrss=function(iVar)
		{
			iVar=iVar*100;
		ind.value = iVar;
			
		Ti.API.info('INTERVAL FIRED value ' + iVar);	
			
		}
		
		Ti.UI.currentWindow.add(ind);
	
	} 
	else if (Ti.Platform.osname == 'iphone') 
	{
		var showWin_login = Titanium.UI.createWindow({
				url:"progressiphone.js",
				
				title:'Bhej.de'
			});
		
		this.showProgrss= function() {
			
			showWin_login.open();
		
		}
		this.stopProgrss= function() {
        
			
			showWin_login.close();
			
		}
		this.setValtoProgrss= function(iVar) {
			
		}
		
		
	};
	
	
	
	
	
	 
	
	
}
