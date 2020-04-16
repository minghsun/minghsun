// $(function(){
// 	var isHandHeld=false, isRetina=false, isCardExpended=false,
// 	currentIndex = 0, lastIndex = 0, slideDir = 0,
// 	cardWidth = $('.card').width(), totalCards = $('.card').length,
// 	cardsSlider = Flipsnap('.cards-slider'),
// 	colorCodes = ['#684DFD', '#00b3ff', '#0082E3','#272C2C', '#FFB616', '#FF2121', '#FF0290',],
// 	springSystems = [], springs = [];
// 	const cardWidthExpended = 600;
// 	const card__expended_bottom = 100;
// 	const windowsHeight = $(window).outerHeight();
// 	const card__expended_topY=window.outerWidth<cardWidthExpended?0:30;

// 	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
// 		$('body').addClass('handheld');
// 		isHandHeld=true;
// 	}

// 	if (window.devicePixelRatio>1)
// 	  isRetina=true;

// 	init()

//   for (var i = 0 ; i < totalCards; i++) {
// 		var _el = document.getElementsByClassName('card')[i]
//     _el.style.zIndex = 100-i

//   	springSystems.push(new rebound.SpringSystem());
//   	springSystems[i].springIndex=i;
//   	springs.push(springSystems[i].createSpring(55,8));
//   	springs[i].springIndex=i;

//     springs[i].addListener({
//     	onSpringUpdate: function(spring) {
// 		    var val = spring.getCurrentValue();
// 	      val = rebound.MathUtil.mapValueInRange(val, 0, 1, 0, 1);
// 	      if(Math.abs(lastIndex-currentIndex)>=2 && currentIndex !== spring.springIndex && lastIndex !== spring.springIndex)
//       		animateCard(spring.springIndex, val, 'rotate');
// 	    	else
// 	      	animateCard(spring.springIndex, val, 'all');
//     	}
// 	  });

//   	if(i===0)
//   		springs[i].setCurrentValue(0);
//   	else
//   		springs[i].setCurrentValue(-1);
// 	}


//   function animateCard(el_i, val, type) {
//   	var val_r = val, val_s, val_tx, val_transform='';
//   	var el = document.getElementsByClassName('card')[el_i];
//   	const deg_card = 12, scl_min=.3, scl_comp=.7, card_br=16;

// 		val_s = (1 - Math.abs(val)*scl_comp);
//   	if(el_i>currentIndex){
//   		val_r = val_r * -deg_card
//   	}else if(el_i<currentIndex){
// 	  	val_r = val_r * -deg_card
//   	}else if(el_i===currentIndex){
//   		if( (slideDir === 1 && val_r>0) || (slideDir === -1 && val_r<0) ){
// 				val_r = val_r * -deg_card
//   		}else if( (slideDir === 1 && val_r<=0) || (slideDir === -1 && val_r<=0) ){
// 				val_r = val_r * deg_card
//   		}
//   	}
  	
//   	val_tx = 0;
//   	val_r=0;

//   	if(type==='all'){
// 			val_transform='translateX(' + val_tx + '%) rotate('+ val_r + 'deg)' + ' scale(' + val_s + ',' + val_s + ')';
//   		el.style.borderRadius = card_br / val_s +'px';
//   	}else{
//   		//if slide over 2 cards, the passing by card need to rotate only
//   		val_transform='translateX(' + val_tx + '%) rotate('+ val_r + 'deg)' + ' scale('+scl_min+','+scl_min+')';
//   		el.style.borderRadius = card_br / (1-scl_comp) +'px';
//   	}
  	
//     el.style.mozTransform =
//     el.style.msTransform =
//     el.style.webkitTransform =
//     el.style.transform = val_transform;
//   }

//   //handling dragging events
//   function cardsAjust(ev){
// 		var slide_pos=0;
//     if($('.cards-slider').css('transform') !== 'none') {
//       slide_pos = parseInt($('.cards-slider').css('transform').split(',')[4].trim());
//     }
//     var slide_ratio = (slide_pos + currentIndex * cardWidth) / cardWidth
//     slide_ratio = slide_ratio>1?1:slide_ratio
//     slide_ratio = slide_ratio<-1?-1:slide_ratio

// 		for (var i = 0; i < $('.card').length ; i++) {
// 			if(i === currentIndex){
// 				if(ev === 'transitionend'){
// 					//after touch end
// 					springs[currentIndex].setEndValue(0);
// 				}else if( ev.moved && ev.type === 'fstouchend' ) {
// 					if( ev.originalPoint > ev.newPoint ){
// 						springs[currentIndex].setEndValue(-1);
// 					}else{
// 						springs[currentIndex].setEndValue(1);
// 					}
// 				}else{
// 					springs[currentIndex].setEndValue( -slide_ratio );	
// 				}

// 			}else{
// 				if(ev.type === 'fstouchmove'){
// 					if(ev.direction===1){
// 						if(i === currentIndex+1){
// 							springs[i].setEndValue( -1 - slide_ratio );	
// 						}else if(i === currentIndex-1){
// 							springs[i].setEndValue( 1  );	
// 						}
// 					}else if(ev.direction===-1){
// 						if(i ===currentIndex-1){
// 							springs[i].setEndValue( 1- slide_ratio );	
// 						}else if(i ===currentIndex+1){
// 							springs[i].setEndValue( -1 );	
// 						}
// 					}

// 				}else if(ev.type === 'fstouchend'){
// 					if( i == ev.newPoint){
// 						gaEvent('card','browse_touch',currentIndex+'_to_'+ev.newPoint);
// 						springs[i].setEndValue(0);
// 					}else if(ev.newPoint===ev.originalPoint){ 
// 						if(i>ev.newPoint){
// 							springs[i].setEndValue(-1);
// 						}else if(i<ev.newPoint){
// 							springs[i].setEndValue(1);
// 						}
// 					}else if(Math.abs(ev.newPoint-ev.originalPoint)>1){ 
// 						//slide over more than 2 cards
// 						if( ev.moved && ev.type === 'fstouchend' ){
// 							if( i > ev.newPoint ){
// 								springs[i].setEndValue(-1);
// 							}else if( i < ev.newPoint ){
// 								springs[i].setEndValue(1);
// 							}
// 						}
// 					}
// 				}
// 			}
// 		};

// 		if( ev !== 'transitionend' && ev.newPoint !== undefined && ev.moved){
// 			lastIndex = currentIndex;
//   		currentIndex = ev.newPoint;
// 	    cardChanged();
// 	  }

//   }


//   function cardChanged(){
//     $('.card.selected').removeClass('selected');
//     $('.card').eq(currentIndex).addClass('selected');
//     $('.cards-pagination').children('.selected').removeClass('selected');
//     $('.cards-pagination').children('li').eq(currentIndex).addClass('selected');
//     if(currentIndex<=0){
// 			$('.cards-nav-prev').css('opacity',0)
// 			$('.cards-nav-prev__hint').css('opacity',0)
//     }else{
// 			$('.cards-nav-prev').css('opacity',1)
// 			$('.cards-nav-prev__hint').css('opacity',1)
//     }
//     if(currentIndex>=totalCards-1){
// 			$('.cards-nav-next').css('opacity',0)
// 			$('.cards-nav-next__hint').css('opacity',0)
//     }else{
// 			$('.cards-nav-next').css('opacity',1)
// 			$('.cards-nav-next__hint').css('opacity',1)
//     }
//   }

// 	cardsSlider.element.addEventListener('fstouchmove', function(ev) {
// 		slideDir = ev.direction;
// 		cardsAjust(ev);
// 		var slide_pos=0;
//     if($('.cards-slider').css('transform') !== 'none') {
//       slide_pos = parseInt($('.cards-slider').css('transform').split(',')[4].trim());
//     }
// 	}, false);
	
//   cardsSlider.element.addEventListener('fstouchend', function(ev) {
//   	cardsAjust(ev);
//   }, false);


// 	function toPrevCard(){
// 		if( currentIndex>0 ){
// 			cardsSlider.toPrev();
// 			lastIndex=currentIndex;
// 			currentIndex--;
// 			springs[currentIndex+1].setEndValue(-1);
// 			springs[currentIndex].setEndValue(0);
// 	    cardChanged();
// 	    $('.card.hover').removeClass('hover');
// 	    if( currentIndex>0 )
// 				$('.card').eq(currentIndex-1).addClass('hover');
// 			gaEvent('card','browse_prev',lastIndex+'_to_'+currentIndex);
// 		}
// 	}

// 	function toNextCard() {
// 		if( currentIndex < totalCards-1 ){
// 			cardsSlider.toNext();
// 			lastIndex=currentIndex;
// 			currentIndex++;
// 			springs[currentIndex-1].setEndValue(1);
// 			springs[currentIndex].setEndValue(0);
// 			cardChanged();
// 			$('.card.hover').removeClass('hover');
// 			if( currentIndex < totalCards-1 )
// 				$('.card').eq(currentIndex+1).addClass('hover');
// 			gaEvent('card','browse_next',lastIndex+'_to_'+currentIndex);
// 		}
// 	}
// 	$('.cards-nav-next').on('click',toNextCard)
// 	$('.cards-nav-prev').on('click',toPrevCard)

// 	$('.cards-pagination').children('li').each(function(_index){
// 		$(this).on('click',function(){
// 			cardsSlider.moveToPoint(_index);	
// 			lastIndex = currentIndex;
// 			currentIndex = _index;
// 			springs[lastIndex].setEndValue(1);
// 			springs[currentIndex].setEndValue(0);
// 			cardChanged();
// 			gaEvent('card','browse_pagination',lastIndex+'_to_'+currentIndex);
// 		})
		
// 	})

// 	$('.cards-nav-prev').on('mouseover',function(){
// 		if( currentIndex>0 )
// 			$('.card').eq(currentIndex-1).addClass('hover');
// 	})

// 	$('.cards-nav-prev').on('mouseout',function(){
// 		$('.card.hover').removeClass('hover');
// 	})

// 	$('.cards-nav-next').on('mouseover',function(){
// 		if( currentIndex < totalCards-1 )
// 			$('.card').eq(currentIndex+1).addClass('hover');
// 	})

// 	$('.cards-nav-next').on('mouseout',function(){
// 		$('.card.hover').removeClass('hover');
// 	})

//   $('.cards-slider').bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
//   	cardsAjust('transitionend');
//   });


//   $('.card').on('click',function(e){
//   		openCard(e)
//   });
//   $('.card__expended').on('click',function(e){
//   	e.stopPropagation();
//   })
//   $('.mask').on('click',function(){
//   	gaEvent('card','close','mask');
//   	closeCard();
//   });
//   $('.close-card').on('click', function(){
//   	gaEvent('card','close','icon');
//   	closeCard();
//   })
//   $('.back-to-project').on('click',function(){
//   	gaEvent('card','close','footer');
//   	closeCard();
//   });

//   $('body').keyup(function(e){
//   	if(isCardExpended && e.which == 27){
//   		gaEvent('card','close','keyboard');
//   		closeCard()	
//   	}
//   	else if(!isCardExpended){
//   		if(e.which == 39){
//   			toNextCard()
//   		}else if(e.which == 37){
//   			toPrevCard()
//   		}

//   	}
//   })

// 	springSystems_ce = new rebound.SpringSystem()
// 	spring_cs = springSystems_ce.createSpring(30,6);
//   spring_cs.addListener({
//   	onSpringUpdate: function(spring) {
//       val_cs = rebound.MathUtil.mapValueInRange(spring.getCurrentValue(), 0, 1, 0, 1);
//     	cardDisplay(val_cs)
//   	},
//   	onSpringAtRest: function(){
//   		if( $('.card__expended').css('transform') == "matrix(1, 0, 0, 1, 0, 0)"){
// 	  		$('.card__expended').css('transform', '');
// 	  		$('.card__expended').css('-ms-transform', '');
//   		}
//   	}
//   });
//   spring_cs.setCurrentValue(1);

// 	function cardDisplay(val) {
// 		const dist = windowsHeight-card__expended_topY
// 		$('.card__expended').css('transform', 'translateY('+(card__expended_topY+val*dist)+'px)');
// 		$('.card__expended').css('-ms-transform', 'translateY('+(card__expended_topY+val*dist)+'px)');
// 	}
//   function openCard(e){
//   	if(!isCardExpended){
// 	  	const detailLink = $('li.selected').attr('data-detail');
// 	  	const cardIndex = $('li.selected').attr('data-index')
// 	  	const cardupdate = $('li.selected').attr('data-update')
// 	  	const cardColor = hexToRGBa(colorCodes[cardIndex],.9)
// 	  	if(detailLink !==undefined){
//   			isCardExpended=true;
// 	  		$('.mask').css('display','block').scrollTop(0)
// 	  		const maskAlpha = isHandHeld?0:1
// 	  		$('.mask').animate({
// 	  			'opacity':1,
// 	  		},function(){
// 	  			$(this).removeClass('hidden')
// 	  		})
// 	  		$('.loading-text').text('Loading...');
// 	  		$('.loading-tip').css('display','block').animate({opacity:1, color:'black'},300)
// 	  		$('.wrapper').css('filter','blur(10px)');
// 	  		$('.wrapper').css('-webkit-filter','blur(10px)');
// 	  		gaEvent('card','expend',detailLink);
// 	  		$('.card-content').load('project_details/'+detailLink+'.html?update='+cardupdate+'&time=20190916',function(response, status, xhr){
// 	  			if(status=='error'){
// 	  				$('.loading-text').text('Loading error, click to resume.');
// 	  			}else{
// 	  				history.pushState({}, "", "#"+detailLink);
// 	  				$('.loading-tip').animate({opacity:0, color:'white'},300,function(){
// 	  					$('.loading-tip').css('display','none')
// 	  					$('.loading-text').text('')
// 	  				});
// 	  				$('.card-hero__expended').attr('src','images/p/'+detailLink+'_cover@2x.jpg')
// 			  		$('.card__expended').css('display','block');
// 			  		// $('.card__expended').css('opacity',1);
// 			  		spring_cs.setEndValue(0);

// 	  			}
// 	  		})
// 	  	}
//   	}
//   }
//   function closeCard(){
//   	if(isCardExpended){
//   		history.pushState({}, 'Projects', '#');
//   		$('.wrapper').css('filter','');
//   		$('.wrapper').css('-webkit-filter','');
//   		isCardExpended=false;
// 	  	$('body, html').animate({
// 	  		scrollTop:0
// 	  	})
//   		spring_cs.setEndValue(1);
// 	  	$('.card__expended').animate({
// 	  		opacity : 1
// 	  	},500,'swing',function(){
// 	  		$(this).addClass('hidden');
// 	  		$(this).css('display','none');
// 	  		$('.card__expended').css('transform', '');
// 	  		$('.card__expended').css('-ms-transform', '');
// 	  	})
// 	  	$('.mask').animate({
// 	  		'opacity':0,
// 	  	},function(){
// 	  		$(this).addClass('hidden')
// 	  		$(this).css('display','none');
// 	  	})
// 	  }
//   }

// 	window.onhashchange = function() {
// 		closeCard()
// 		gaEvent('card','close','hashtag');
// 	}

// 	function init(){
// 		$('.mask__loading').animate({
// 			'opacity':0
// 		},400,function(){
// 			$(this).remove();
// 		})

// 		if(!isRetina)
// 			unRetina()
// 	}
	
// 	function unRetina(){
// 		$('img').each(function(){
// 			$(this).attr('src',$(this).attr('src').replace('@2x',''))

// 		})
// 	}

// });

let scroll_position=0
window.addEventListener('scroll', function(e) {
  if(scroll_position<window.scrollY){
	  if(window.scrollY>300){
		document.getElementById('logo').style.opacity = .8;
	  }else{
		document.getElementById('logo').style.opacity = 1;
	  }
  }else{
	document.getElementById('logo').style.opacity = 1;
  }
  scroll_position = window.scrollY;
});

function playVideo(){
	document.getElementById('scVideo').play(); 
	document.getElementById('scPlay').style.display='none';
	
}

function hexToRGBa(hex,alpha){
	var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
	var matches = patt.exec(hex);
	var rgba = "rgba("+parseInt(matches[1], 16)+","+parseInt(matches[2], 16)+","+parseInt(matches[3], 16)+","+alpha+")";
	return rgba
}





// var svgContainer = document.getElementsByClassName('loadingAnimationContainer');
// var animItem1 = bodymovin.loadAnimation({
// wrapper: svgContainer[0],
// animType: 'svg',
// loop: true,
// path: 'images/loading.json'
// });
// var animItem2 = bodymovin.loadAnimation({
// wrapper: svgContainer[1],
// animType: 'svg',
// loop: true,
// path: 'images/loading.json'
// });
