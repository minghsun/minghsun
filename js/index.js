$(function(){

	var isHandHeld=false;

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('body').addClass('handheld');
		isHandHeld=true;
	}

	if(window.devicePixelRatio<=1)
		unRetina()
	
	function unRetina(){
		$('img').each(function(){
			$(this).attr('src',$(this).attr('src').replace('@2x',''))
		})
	}

});
