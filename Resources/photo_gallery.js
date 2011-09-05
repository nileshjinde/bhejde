var win_gallery = Ti.UI.currentWindow;
win_gallery.backgroundImage='bhej_de_screen2_bg.png';





var imageView = Titanium.UI.createImageView({
	height:200,
	width:200,
	top:20,
	left:10,
    backgroundColor:'#999'
});

imageView.addEventListener('click', function(e)
{
	
	 Titanium.UI.createAlertDialog({title:'browse',message:e.index}).show();
	
});

//win_gallery.add(imageView);


/*

var popoverView;
var arrowDirection;

if (Titanium.Platform.osname == 'ipad')
{
	// photogallery displays in a popover on the ipad and we
	// want to make it relative to our image with a left arrow
	arrowDirection = Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT;
	popoverView = imageView;
}


Titanium.Media.openPhotoGallery({

	success:function(event)
	{
		var cropRect = event.cropRect;
		var image = event.media;
       
		// set image view
		Ti.API.info('Our type was: '+event.mediaType);
		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
		{
		  // Titanium.UI.createAlertDialog({title:'image',message:'event.mediaType'}).show();
			imageView.image = image;
			
		}
		 else{
			// // is this necessary?
			Titanium.UI.createAlertDialog({title:'All',message:event.mediaType}).show();
		 };
		 var f = Titanium.Filesystem.getFile(image.nativePath);
		 
		 Titanium.UI.createAlertDialog({title:'browse',message:'f.name'}).show();
		 
       //Titanium.UI.createAlertDialog({title:'browse',message:f.name}).show();
		Titanium.API.info('PHOTO GALLERY SUCCESS cropRect.x ' + cropRect.x + ' cropRect.y ' + cropRect.y  + ' cropRect.height ' + cropRect.height + ' cropRect.width ' + cropRect.width);
       
  
			var showWin = Titanium.UI.createWindow({
			url:"Home.js",
			title:'Bhej.de'
		});
		showWin.FLAG='BROWSE';
		showWin.filePath=image.nativePath;
		showWin.filetitle=f.name;
		showWin.open();
		
		win.hide();
		//win.close();
       
	},
	cancel:function()
	{

	},
	error:function(error)
	{
	},
	allowEditing:true,
	popoverView:popoverView,
	arrowDirection:arrowDirection,
	
	//mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO,Ti.Media.MUSIC_MEDIA_TYPE_ALL]
});*/

var button_photo = Ti.UI.createButton({
    title:  'open photo gallery',
    width:  200,
    height:  35,
    top:200
    });
 
button_photo.addEventListener('click', function() {
 
    Ti.Media.openPhotoGallery({
        success:function(event) {
            var image = event.media;
          //  alert('picture was selected');
           imageView.image = event.media;
           
            // create file and write image
        var fileName = new Date().getTime() + "image.jpg"; // unique name
        var file = Titanium.Filesystem.applicationDataDirectory + "/"+fileName;
        var savedFile = Titanium.Filesystem.getFile(file);
        savedFile.write(event.media);
 
      Titanium.API.info('FilePath *****'+savedFile.nativePath);
         
          // save location of file in property 
          //Ti.App.Properties.setString("filename", savedFile.nativePath);
          
          var showWin = Titanium.UI.createWindow({
			url:"Home.js",
			title:'Bhej.de'
		});
		showWin.FLAG='BROWSE';
		showWin.filePath=savedFile.nativePath;
		showWin.filetitle=savedFile.name;
		showWin.open();
		
		win_gallery.hide();
		//win_gallery.close();
          
        },
        cancel:function() { 
        	//alert('canceled');
        	},
        error:function(error) {
            alert(error);
        },
        //arrowDirection:  Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UP,
        popoverView:button_photo
    });
});
 
win_gallery.add(button_photo);


var button_video = Ti.UI.createButton({
    title:  'open video gallery',
    width:  200,
    height:  35,
    top:240,
    visible:false
    });
 
button_video.addEventListener('click', function() {
 
    Ti.Media.openPhotoGallery({
        success:function(event) {
            var image = event.media;
            alert('video was selected');
        },
        cancel:function() {
        	 //alert('canceled');
        	 },
        error:function(error) {
            alert(error);
        },
        //arrowDirection:  Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UP,
        popoverView:button_photo,
        mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO]
    });
});
 win_gallery.add(button_video);
 
 
 var button_other = Ti.UI.createButton({
    title:  'other files',
    width:  200,
    height:  35,
    top:240,
  
    });
 
button_other.addEventListener('click', function() {
 
   var showWin = Titanium.UI.createWindow({
			url:"Filebrowse_iphone.js",
			title:'Bhej.de'
		});
		showWin.FLAG='APP';
		showWin.open();
		
		win_gallery.hide();	
});
 win_gallery.add(button_other);
 
 var button_cancel = Ti.UI.createButton({
    title:  'Back',
    width:  200,
    height:  35,
    bottom: 50
    });
 
button_cancel.addEventListener('click', function() {
 
  var showWin = Titanium.UI.createWindow({
			url:"Home.js",
			title:'Bhej.de'
		});
		//showWin.FLAG='BROWSE';
		showWin.open();
		
		win_gallery.hide();
 
});
win_gallery.add(button_cancel);
 


win_gallery.open();
