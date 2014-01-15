(function($){

// focus img change // start

$.fn.changeImg=function(obj){
	var thisObj=this;
	var defaults={
			drt:"top",
			transition:false,
			time:2000,
			path:"",
			auto:true,
			nav:false,moveVal:0
		}
	var obj=$.extend(defaults,obj);//alert(obj.drt)
	var auto=obj.auto;
	var drt=obj.drt;
	var atime=600;
	var tOut=obj.time;
	var tId,moveVal=-obj.moveVal,it=1; //alert(moveVal);
	var loop=false;
	var chgT=false;
	//////
	var nav=thisObj.children('.js_numNav');
	var title=thisObj.children('.js_title').children('a').get()[0]; //alert(title);
	var navA=nav.children('a');
	var total=navA.length;
	if(obj.navOpacity){nav.css('opacity',obj.navOpacity);}
	var imglst=thisObj.children('.js_imgLst');
	if(loop){ imglst.children('a:first').clone().appendTo(imglst); }
	switch(drt){
		case "top":
			cssName='margin-top';
			if(!moveVal)moveVal=-thisObj.innerHeight();
		break;
		case "left":
			cssName='margin-left';
			if(!moveVal)moveVal=-thisObj.innerWidth();
		break;
	}

	function ctl(){
		clearTout();
		//$('#msg').html("total "+total+" it: "+it);
		if(!loop){it=(it<total)?++it:1;}
		else{it=(it!=total+1)?++it:0;}
		addCur(it);
		change(it);
		autoPlay();
	}
	function change(num){
		//change img
		clearAnimate();
		if(drt=='top'||drt=='bottom'){
			if(num==total+1){
					addCur(1);
					imglst.animate({marginTop:((num-1)*moveVal)},atime,"",function(){ if(loop){ init(); } });
			}else{
					imglst.animate({marginTop:((num-1)*moveVal)},atime,"",function(){ it=num; });
			}
		
		}else{
			if(num==total+1){
					addCur(1);
					imglst.animate({marginLeft:((num-1)*moveVal)},atime,"",function(){ if(loop){ init(); } });
			}else{
					imglst.animate({marginLeft:((num-1)*moveVal)},atime,"",function(){ it=num; });
			}
		
		}
	}
	//event
	function init(){
		imglst.css(cssName,0+'px');
		it=1;		
	}
	function addCur(n){	
			var curA=navA.removeClass('cur').eq(n-1).get()[0];
			curA.className='cur';
			if(!title)return;
			title.title=curA.title;
			title.innerHTML=curA.title;
			title.href=imglst.children('a').eq(n-1).attr('href');
		}
	function clearAnimate(){ imglst.stop(true,chgT); }
	function clearTout(){ if(tId){clearTimeout(tId);} }
	function autoPlay(){ if(auto){ clearTout; tId=setTimeout(ctl,tOut); } }	
	thisObj.hover(function(){ clearTout(); },function(){ autoPlay(); })
	navA.bind('mouseenter',function(){
		clearAnimate();
		addCur(this.name);
		change(this.name);
	})
	addCur(1);
	autoPlay();

}

// focus img change // end

})(jQuery);(function($){

// srcoll change
$.fn.srcollChange=function(obj){
	var thisObj=this;
	var thisId=thisObj.attr("id");
	var preBtn=$('#'+thisId+'_pBtn');
	var nextBtn=$('#'+thisId+'_nBtn');
	var way=0; //0表示横向移动 1表示为纵向移动
	var it=1; // 切换到第it个
	var timeID; //定时器ID
	var defaults={
			direction:"left",
			time:3000,
			auto:false, //auto change
			navHoverImgChange:false,
			width:thisObj.width(),
			height:thisObj.height()
		}	
	
	var obj=$.extend(defaults,obj);
	
	var ObjW=obj.width;
	var ObjH=obj.height;
	var moveVal,intAttr;
	var Objcontent=thisObj.children(".j_ct"); //sub total
	var subLst=Objcontent.children(".j_sub");	
	
	if(obj.direction!='top'){
		intAttr="margin-left";
		moveVal=-ObjW;
		
	}else{
		way=1;
		intAttr="margin-top";
		moveVal=-subLst.outerHeight();
	}
	//alert(moveVal);
	var total=subLst.length; //sub total	

	var eq_arr=new Array();
	
	//clone init 
	var cloneNum=Math.ceil(ObjH/Math.abs(moveVal)) // first and last clone num
	if(cloneNum<total){
		subLst.map(function(i,n){
			if(i<cloneNum){return n;}
		}).clone().addClass('_f_').appendTo(Objcontent);
		subLst.map(function(i,n){
			if(i>(total-1-cloneNum)){return n;}
		}).clone().addClass('_l_').prependTo(Objcontent);

	}else{
		subLst.clone().addClass('_l_').appendTo(Objcontent).end().end().clone().addClass('_f_').prependTo(Objcontent);
	}
	
	total++;
	for(var i=0;i<=total;i++){
		eq_arr.push(i);
		}

	var arrFirst=eq_arr[0]; // 第一个 sub 
	var arrLast=eq_arr[total];	// 最后一个 sub 
	
	function cssInit(){
			it=1;
			Objcontent.css(intAttr,""+eq_arr[it]*moveVal+"px");
			//$("#msg5").html("1 init: "+it);
		}
	cssInit();
	
	function cssInit0(){
			it=total-1;
			Objcontent.css(intAttr,""+eq_arr[it]*moveVal+"px");
			//$("#msg5").html("end it: "+it);
		}
	
function change(num){
	unbindEvent();
	Objcontent.stop(true,false);
	if(!way){
		if(num==arrLast){
			Objcontent.animate({marginLeft:(eq_arr[it]*moveVal)},600,"",function(){ cssInit(); bindEvent(); }); 
		}else if(num==0){
			Objcontent.animate({marginLeft:0},600,"",function(){ cssInit0(); bindEvent(); });	
		}else{		
			Objcontent.animate({marginLeft:(it)*moveVal},600,"",function(){ bindEvent(); });
		}			
	}else{
		if(num==arrLast){
			Objcontent.animate({marginTop:(eq_arr[it]*moveVal)},600,"",function(){ cssInit(); bindEvent(); });
		}else if(num==0){
			Objcontent.animate({marginTop:0},600,"",function(){ cssInit0(); bindEvent(); });
		}else{		
			Objcontent.animate({marginTop:(it)*moveVal},600,"",function(){ bindEvent(); });		
		}	
	}
	
	//$("#msg4").html("change it: "+it);
}

//按钮事件
function unbindEvent(){
		preBtn.unbind('click');
		nextBtn.unbind('click');		
}

function bindEvent(){
		 // 在切换过程中 不接受 点击事件
		preBtn.bind("click",function(){ unbindEvent(); //alert(1);
										play("pre");
									  });
		nextBtn.bind("click",function(){ unbindEvent(); //alert(2);
										 play("next"); 
									   });
}

	bindEvent();
	
function prev(){
	it=(it!=total)?++it:1;
	change(eq_arr[it]);
}

function next(){
	if(it>1){
		change(eq_arr[--it]);
	}else{
		change(0);
	}
}

function play(dst){

	switch(dst){
		case "pre": // <- move or move ↑
			prev();
		break;
		case "next": // move -> or move ↓
			next();
		break;
		default:
			return false;
		}
	
	//$("#msg").html("click it: "+it);
}	
	
//	auto change
	function ctl(){
		it=(it!=total)?++it:1;
		change(eq_arr[it]);
		$("#msg2").html("auto it: "+it);
		autoPlay();
	}
	
	function autoPlay(){
		timeID=setTimeout(ctl,obj.time);
	}
	function clearPlay(){
		if(timeID){clearTimeout(timeID);} 
	}

	if(obj.auto){
		autoPlay();
		
		preBtn.hover(function(){
								 clearPlay();
								 },function(){
								 autoPlay();
							   });
		
		nextBtn.hover(function(){
								 clearPlay();
								 },function(){
								 autoPlay();
							   });
		
		thisObj.hover(function(){
			clearPlay();
		},function(){
			autoPlay();
		})
	}
	
}
// srcoll change // end

})(jQuery);eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('h.i[\'1a\']=h.i[\'z\'];h.O(h.i,{y:\'D\',z:9(x,t,b,c,d){6 h.i[h.i.y](x,t,b,c,d)},17:9(x,t,b,c,d){6 c*(t/=d)*t+b},D:9(x,t,b,c,d){6-c*(t/=d)*(t-2)+b},13:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t+b;6-c/2*((--t)*(t-2)-1)+b},X:9(x,t,b,c,d){6 c*(t/=d)*t*t+b},U:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t+1)+b},R:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t+b;6 c/2*((t-=2)*t*t+2)+b},N:9(x,t,b,c,d){6 c*(t/=d)*t*t*t+b},M:9(x,t,b,c,d){6-c*((t=t/d-1)*t*t*t-1)+b},L:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t+b;6-c/2*((t-=2)*t*t*t-2)+b},K:9(x,t,b,c,d){6 c*(t/=d)*t*t*t*t+b},J:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t*t*t+1)+b},I:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t*t+b;6 c/2*((t-=2)*t*t*t*t+2)+b},G:9(x,t,b,c,d){6-c*8.C(t/d*(8.g/2))+c+b},15:9(x,t,b,c,d){6 c*8.n(t/d*(8.g/2))+b},12:9(x,t,b,c,d){6-c/2*(8.C(8.g*t/d)-1)+b},Z:9(x,t,b,c,d){6(t==0)?b:c*8.j(2,10*(t/d-1))+b},Y:9(x,t,b,c,d){6(t==d)?b+c:c*(-8.j(2,-10*t/d)+1)+b},W:9(x,t,b,c,d){e(t==0)6 b;e(t==d)6 b+c;e((t/=d/2)<1)6 c/2*8.j(2,10*(t-1))+b;6 c/2*(-8.j(2,-10*--t)+2)+b},V:9(x,t,b,c,d){6-c*(8.o(1-(t/=d)*t)-1)+b},S:9(x,t,b,c,d){6 c*8.o(1-(t=t/d-1)*t)+b},Q:9(x,t,b,c,d){e((t/=d/2)<1)6-c/2*(8.o(1-t*t)-1)+b;6 c/2*(8.o(1-(t-=2)*t)+1)+b},P:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6-(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b},H:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6 a*8.j(2,-10*t)*8.n((t*d-s)*(2*8.g)/p)+c+b},T:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d/2)==2)6 b+c;e(!p)p=d*(.3*1.5);e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);e(t<1)6-.5*(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b;6 a*8.j(2,-10*(t-=1))*8.n((t*d-s)*(2*8.g)/p)*.5+c+b},F:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*(t/=d)*t*((s+1)*t-s)+b},E:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},16:9(x,t,b,c,d,s){e(s==u)s=1.l;e((t/=d/2)<1)6 c/2*(t*t*(((s*=(1.B))+1)*t-s))+b;6 c/2*((t-=2)*t*(((s*=(1.B))+1)*t+s)+2)+b},A:9(x,t,b,c,d){6 c-h.i.v(x,d-t,0,c,d)+b},v:9(x,t,b,c,d){e((t/=d)<(1/2.k)){6 c*(7.q*t*t)+b}m e(t<(2/2.k)){6 c*(7.q*(t-=(1.5/2.k))*t+.k)+b}m e(t<(2.5/2.k)){6 c*(7.q*(t-=(2.14/2.k))*t+.11)+b}m{6 c*(7.q*(t-=(2.18/2.k))*t+.19)+b}},1b:9(x,t,b,c,d){e(t<d/2)6 h.i.A(x,t*2,0,c,d)*.5+b;6 h.i.v(x,t*2-d,0,c,d)*.5+c*.5+b}});',62,74,'||||||return||Math|function|||||if|var|PI|jQuery|easing|pow|75|70158|else|sin|sqrt||5625|asin|||undefined|easeOutBounce|abs||def|swing|easeInBounce|525|cos|easeOutQuad|easeOutBack|easeInBack|easeInSine|easeOutElastic|easeInOutQuint|easeOutQuint|easeInQuint|easeInOutQuart|easeOutQuart|easeInQuart|extend|easeInElastic|easeInOutCirc|easeInOutCubic|easeOutCirc|easeInOutElastic|easeOutCubic|easeInCirc|easeInOutExpo|easeInCubic|easeOutExpo|easeInExpo||9375|easeInOutSine|easeInOutQuad|25|easeOutSine|easeInOutBack|easeInQuad|625|984375|jswing|easeInOutBounce'.split('|'),0,{}));
/*
 * jQuery Easing Compatibility v1 - http://gsgd.co.uk/sandbox/jquery.easing.php
 *
 * Adds compatibility for applications that use the pre 1.2 easing names
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.C(0.1,{7:2(x,t,b,c,d){3 0.1.D(x,t,b,c,d)},5:2(x,t,b,c,d){3 0.1.6(x,t,b,c,d)},h:2(x,t,b,c,d){3 0.1.B(x,t,b,c,d)},A:2(x,t,b,c,d){3 0.1.m(x,t,b,c,d)},y:2(x,t,b,c,d){3 0.1.w(x,t,b,c,d)},v:2(x,t,b,c,d){3 0.1.u(x,t,b,c,d)},s:2(x,t,b,c,d){3 0.1.r(x,t,b,c,d)},q:2(x,t,b,c,d){3 0.1.p(x,t,b,c,d)},o:2(x,t,b,c,d){3 0.1.n(x,t,b,c,d)},8:2(x,t,b,c,d){3 0.1.l(x,t,b,c,d)},g:2(x,t,b,c,d){3 0.1.j(x,t,b,c,d)},i:2(x,t,b,c,d){3 0.1.k(x,t,b,c,d)},z:2(x,t,b,c,d){3 0.1.f(x,t,b,c,d)},e:2(x,t,b,c,d){3 0.1.a(x,t,b,c,d)},9:2(x,t,b,c,d){3 0.1.4(x,t,b,c,d)}});',40,40,'jQuery|easing|function|return|easeInOutBack|easeOut|easeOutQuad|easeIn|elasin|backinout|easeOutBack||||backout|easeInBack|elasout|easeInOut|elasinout|easeOutElastic|easeInOutElastic|easeInElastic|easeInExpo|easeInOutBounce|bounceinout|easeOutBounce|bounceout|easeInBounce|bouncein||easeInOutExpo|expoinout|easeOutExpo||expoout|backin|expoin|easeInOutQuad|extend|easeInQuad'.split('|'),0,{}));
/*
	jQuery Coda-Slider v1.1 - http://www.ndoherty.com/coda-slider
	
	Copyright (c) 2007 Niall Doherty
*/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('3(d(){3("4.T").1s("<p r=\'O\'>16...<1t /><18 19=\'1a/11-1b.1c\' 1d=\'O...\'/ ></p>")});b j=0;3.1e.1f=d(f){f=3.1g({G:"1h",E:1i,1j:Q},f);P 6.w(d(){b o=3(6);o.7("p.O").1k();o.q("T").l("1l");b m=o.7("4.I").C();b k=o.7("4.I").1m();b U=m*k;o.7("4.t").K("C",U);b N=k*2;F(h.g&&D(h.g.s(1))<=k){b 9=D(h.g.s(1));b e=-(m*(9-1));3(6).7("4.t").K({H:e})}B{b 9=1};o.w(d(i){3(6).W("<4 r=\'J\' M=\'J"+j+"\'><a A=\'#\'>1n</a><\\/4>");3(6).1o("<4 r=\'L\' M=\'L"+j+"\'><a A=\'#\'>1q</a><\\/4>");3(6).W("<4 r=\'c\' M=\'c"+j+"\'><v><\\/v><\\/4>");3(6).7("4.I").w(d(n){3("4#c"+j+" v").X("<x r=\'Z"+(n+1)+"\'><a A=\'#"+(n+1)+"\'>"+3(6).S("10")+"<\\/a><\\/x>")});3("4#c"+j+" a").w(d(z){N+=3(6).5().C();3(6).12("u",d(){3(6).l("8").5().5().7("a").13(3(6)).q("8");b e=-(m*z);9=z+1;3(6).5().5().5().V().7("4.t").R({H:e},f.E,f.G)})});3("4#J"+j+" a").u(d(){F(9==1){b e=-(m*(k-1));9=k;3(6).5().5().7("4.c a.8").q("8").5().5().7("x:14 a").l("8")}B{9-=1;b e=-(m*(9-1));3(6).5().5().7("4.c a.8").q("8").5().15().7("a").l("8")};3(6).5().5().7("4.t").R({H:e},f.E,f.G);h.g=9;P Q});3("4#L"+j+" a").u(d(){F(9==k){b e=0;9=1;3(6).5().5().7("4.c a.8").q("8").5().5().7("a:y(0)").l("8")}B{b e=-(m*9);9+=1;3(6).5().5().7("4.c a.8").q("8").5().V().7("a").l("8")};3(6).5().5().7("4.t").R({H:e},f.E,f.G);h.g=9;P Q});3("a.1p-1r").u(d(){3(6).Y().7(".c v x a:y("+(D(3(6).S("A").s(1))-1)+")").17(\'u\')});3("4#c"+j).K("C",N);F(h.g&&D(h.g.s(1))<=k){3("4#c"+j+" a:y("+(h.g.s(1)-1)+")").l("8")}B{3("4#c"+j+" a:y(0)").l("8")}});j++})};',62,92,'|||jQuery|div|parent|this|find|current|cPanel||var|stripNav|function|cnt|settings|hash|location|||panelCount|addClass|panelWidth||container||removeClass|class|slice|panelContainer|click|ul|each|li|eq||href|else|width|parseInt|easeTime|if|easeFunc|left|panel|stripNavL|css|stripNavR|id|navWidth|loading|return|false|animate|attr|csw|stripViewerWidth|next|before|append|parents|tab|title|ajax|bind|not|last|prev|Loading|trigger|img|src|images|loader|gif|alt|fn|codaSlider|extend|expoinout|750|toolTip|remove|stripViewer|size|Left|after|cross|Right|link|prepend|br'.split('|'),0,{}));
var theInt = null;
		var $crosslink, $navthumb;
		var curclicked = 0;
		
		theInterval = function(cur){
			clearInterval(theInt);
			
			if( typeof cur != 'undefined' )
				curclicked = cur;
			
			$crosslink.removeClass("active-thumb");
			$navthumb.eq(curclicked).parent().addClass("active-thumb");
				$(".stripNav ul li a").eq(curclicked).trigger('click');
			
			theInt = setInterval(function(){
				$crosslink.removeClass("active-thumb");
				$navthumb.eq(curclicked).parent().addClass("active-thumb");
				$(".stripNav ul li a").eq(curclicked).trigger('click');
				curclicked++;
				if( 4 == curclicked )
					curclicked = 0;
				
			}, 5000);
		};
		
		$(function(){
			
			$("#main-photo-slider").codaSlider();
			
			$navthumb = $(".nav-thumb");
			$crosslink = $(".cross-link");
			
			$navthumb
			.click(function() {
				var $this = $(this);
				this.parentNode.blur();
				theInterval($this.parent().attr('href').slice(1) - 1);
				return false;
			});
			
			theInterval();
		});var topicLink=function(a){if(a){for(var h=RegExp("#([^#]+)#","ig"),g=null,j="",n=0;(g=h.exec(a))!=null;){j+=a.substring(n,h.lastIndex-g[0].length);j+='<a href="http://i.dxy.cn/topic/=';j+=BASE64.encode(encodeURIComponent(g[1]));j+='">';j+=g[0];j+="</a>";n=h.lastIndex}if(n<a.length)j+=a.substring(n);return j}return a},donothing=function(){};
Date.prototype.format=function(a){var h={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};if(/(y+)/.test(a))a=a.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));for(var g in h)if(RegExp("("+g+")").test(a))a=a.replace(RegExp.$1,RegExp.$1.length==1?h[g]:("00"+h[g]).substr((""+h[g]).length));return a};
var snsutil={isEmpty:function(a){return typeof a=="undefined"||a==null||a==""},isEmptyInput:function(a){if(this.exists(a)){a=jQuery("#"+a);if(this.isEmpty(a.attr("value"))||a.attr("value")==a.attr("emptyText")){a.focus();return true}return false}return true},isNotEmpty:function(a){return!this.isEmpty(a)},getValue:function(a,h){return this.isEmpty(a)?h:a},exists:function(a){return this.isEmpty(a)?false:jQuery((a.charAt(0)=="#"?"":"#")+a).length>0},dateFormat:function(a,h){return(new Date(a)).format(this.getValue(h,
"MM-dd hh:mm"))},toggle:function(a,h,g,j){jQuery("#"+a+snsutil.getValue(j,"")).toggle(g);jQuery("#"+h+snsutil.getValue(j,"")).toggle(!g)},getPage:function(){var a=snsutil.getValue(window.location.pathname.substring(1),"home");if(a.indexOf("/")!=-1)return a.substring(0,a.indexOf("/"));return a},toHash:function(a,h,g,j,n){h={h:encodeURI(h)};if(snsutil.isNotEmpty(a)&&"home"!=a)h.p=a;if(snsutil.isNotEmpty(g)&&!jQuery.isEmptyObject(g))h.d=g;if(snsutil.isNotEmpty(j)&&"content"!=j)h.v=j;if(snsutil.isNotEmpty(n)&&
"scrollto"!=n)h.s=n;h.t=Math.round(Math.random()*100);return BASE64.encode(encodeURI(JSON.stringify(h)))},fromHash:function(){try{return snsutil.getValue(JSON.parse(decodeURI(BASE64.decode(location.hash))),{})}catch(a){}return{}},substitute:function(a){if(snsutil.isEmpty(a))return"";a=a.replace(/(https?:\/\/[^\s'"]+\.[^\s'\"\u4e00-\u9fa5]+)/ig,'<a href="$1" target="_blank">$1</a>');a=a.replace(/@([a-zA-Z0-9_\u4e00-\u9fa5-]{1,16})(?=($|[\s|@]))/ig,'<a href="http://i.dxy.cn/profile/$1">@$1</a>');a=
a.replace(/(\[:(\d+)\])/ig,'<img src="http://assets.dxycdn.com/third-party/xheditor/xheditor_emot/default/$2.gif" />');return topicLink(a)},length:function(a){var h=0;if(snsutil.isNotEmpty(a))for(var g=0;g<a.length;g++)h+=a.charCodeAt(g)>255?2:1;return Math.round(h/2)},split:function(a){if(snsutil.isEmpty(a))return[];return a.split(",")},ad:function(a,h){a&&h&&$.ajax({url:"http://g.dxy.cn/api2.php?ids="+a,cache:true,dataType:"script",success:function(){ads&&ads["zone_"+a]?$("#"+h).html(ads["zone_"+
a]):$("#"+h).hide()}})}},BASE64={enKey:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",deKey:[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1],encode:function(a){for(var h=
[],g,j,n,m=0;m+3<=a.length;){g=a.charCodeAt(m++);j=a.charCodeAt(m++);n=a.charCodeAt(m++);h.push(this.enKey.charAt(g>>2),this.enKey.charAt((g<<4)+(j>>4)&63));h.push(this.enKey.charAt((j<<2)+(n>>6)&63),this.enKey.charAt(n&63))}if(m<a.length){g=a.charCodeAt(m++);h.push(this.enKey.charAt(g>>2));if(m<a.length){j=a.charCodeAt(m);h.push(this.enKey.charAt((g<<4)+(j>>4)&63));h.push(this.enKey.charAt(j<<2&63),"=")}else h.push(this.enKey.charAt(g<<4&63),"==")}return h.join("")},decode:function(a){var h=[],g,
j,n,m,u=0;for(a=a.replace(/[^A-Za-z0-9\+\/]/g,"");u+4<=a.length;){g=this.deKey[a.charCodeAt(u++)];j=this.deKey[a.charCodeAt(u++)];n=this.deKey[a.charCodeAt(u++)];m=this.deKey[a.charCodeAt(u++)];h.push(String.fromCharCode((g<<2&255)+(j>>4),(j<<4&255)+(n>>2),(n<<6&255)+m))}if(u+1<a.length){g=this.deKey[a.charCodeAt(u++)];j=this.deKey[a.charCodeAt(u++)];if(u<a.length){n=this.deKey[a.charCodeAt(u)];h.push(String.fromCharCode((g<<2&255)+(j>>4),(j<<4&255)+(n>>2)))}else h.push(String.fromCharCode((g<<2&
255)+(j>>4)))}return h.join("")}},JSON;JSON||(JSON={});
(function(){function a(s){return s<10?"0"+s:s}function h(s){n.lastIndex=0;return n.test(s)?'"'+s.replace(n,function(t){var q=G[t];return typeof q==="string"?q:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+s+'"'}function g(s,t){var q,r,e,k,v=m,l,f=t[s];if(f&&typeof f==="object"&&typeof f.toJSON==="function")f=f.toJSON(s);if(typeof B==="function")f=B.call(t,s,f);switch(typeof f){case "string":return h(f);case "number":return isFinite(f)?String(f):"null";case "boolean":case "null":return String(f);
case "object":if(!f)return"null";m+=u;l=[];if(Object.prototype.toString.apply(f)==="[object Array]"){k=f.length;for(q=0;q<k;q+=1)l[q]=g(q,f)||"null";e=l.length===0?"[]":m?"[\n"+m+l.join(",\n"+m)+"\n"+v+"]":"["+l.join(",")+"]";m=v;return e}if(B&&typeof B==="object"){k=B.length;for(q=0;q<k;q+=1)if(typeof B[q]==="string"){r=B[q];if(e=g(r,f))l.push(h(r)+(m?": ":":")+e)}}else for(r in f)if(Object.prototype.hasOwnProperty.call(f,r))if(e=g(r,f))l.push(h(r)+(m?": ":":")+e);e=l.length===0?"{}":m?"{\n"+m+l.join(",\n"+
m)+"\n"+v+"}":"{"+l.join(",")+"}";m=v;return e}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+a(this.getUTCMonth()+1)+"-"+a(this.getUTCDate())+"T"+a(this.getUTCHours())+":"+a(this.getUTCMinutes())+":"+a(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var j=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
n=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,m,u,G={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},B;if(typeof JSON.stringify!=="function")JSON.stringify=function(s,t,q){var r;u=m="";if(typeof q==="number")for(r=0;r<q;r+=1)u+=" ";else if(typeof q==="string")u=q;if((B=t)&&typeof t!=="function"&&(typeof t!=="object"||typeof t.length!=="number"))throw Error("JSON.stringify");return g("",
{"":s})};if(typeof JSON.parse!=="function")JSON.parse=function(s,t){function q(e,k){var v,l,f=e[k];if(f&&typeof f==="object")for(v in f)if(Object.prototype.hasOwnProperty.call(f,v)){l=q(f,v);if(l!==undefined)f[v]=l;else delete f[v]}return t.call(e,k,f)}var r;s=String(s);j.lastIndex=0;if(j.test(s))s=s.replace(j,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)});if(/^[\],:{}\s]*$/.test(s.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){r=eval("("+s+")");return typeof t==="function"?q({"":r},""):r}throw new SyntaxError("JSON.parse");}})();
(function(a){function h(b,c,i,d){d={data:d||(c?c.data:{}),_wrap:c?c._wrap:null,tmpl:null,parent:c||null,nodes:[],calls:B,nest:s,wrap:t,html:q,update:r};b&&a.extend(d,b,{nodes:[],parent:c});if(i){d.tmpl=i;d._ctnt=d._ctnt||d.tmpl(a,d);d.key=++H;(F.length?f:l)[H]=d}return d}function g(b,c,i){var d;i=i?a.map(i,function(o){return typeof o==="string"?b.key?o.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+k+'="'+b.key+'" $2'):o:g(o,b,o._ctnt)}):b;if(c)return i;i=i.join("");i.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,
function(o,p,x,C){d=a(x).get();G(d);if(p)d=j(p).concat(d);if(C)d=d.concat(j(C))});return d?d:j(i)}function j(b){var c=document.createElement("div");c.innerHTML=b;return a.makeArray(c.childNodes)}function n(b){return new Function("jQuery","$item","var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
function(c,i,d,o,p,x,C){c=a.tmpl.tag[d];if(!c)throw"Template command not found: "+d;d=c._default||[];if(x&&!/\w$/.test(p)){p+=x;x=""}if(p){p=u(p);C=C?","+u(C)+")":x?")":"";C=x?p.indexOf(".")>-1?p+x:"("+p+").call($item"+C:p;x=x?C:"(typeof("+p+")==='function'?("+p+").call($item):("+p+"))"}else x=C=d.$1||"null";o=u(o);return"');"+c[i?"close":"open"].split("$notnull_1").join(p?"typeof("+p+")!=='undefined' && ("+p+")!=null":"true").split("$1a").join(x).split("$1").join(C).split("$2").join(o?o.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,
function(J,I,L,E){return(E=E?","+E+")":L?")":"")?"("+I+").call($item"+E:J}):d.$2||"")+"_.push('"})+"');}return _;")}function m(b,c){b._wrap=g(b,true,a.isArray(c)?c:[v.test(c)?c:a(c).html()]).join("")}function u(b){return b?b.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function G(b){function c(I){function L(M){M+=i;y=p[M]=p[M]||h(y,l[y.parent.key+i]||y.parent,null,true)}var E,D=I,y,K;if(K=I.getAttribute(k)){for(;D.parentNode&&(D=D.parentNode).nodeType===1&&!(E=D.getAttribute(k)););if(E!==K){D=D.parentNode?
D.nodeType===11?0:D.getAttribute(k)||0:0;if(!(y=l[K])){y=f[K];y=h(y,l[D]||f[D],null,true);y.key=++H;l[H]=y}z&&L(K)}I.removeAttribute(k)}else if(z&&(y=a.data(I,"tmplItem"))){L(y.key);l[y.key]=y;D=(D=a.data(I.parentNode,"tmplItem"))?D.key:0}if(y){for(E=y;E&&E.key!=D;){E.nodes.push(I);E=E.parent}delete y._ctnt;delete y._wrap;a.data(I,"tmplItem",y)}}var i="_"+z,d,o,p={},x,C,J;x=0;for(C=b.length;x<C;x++)if((d=b[x]).nodeType===1){o=d.getElementsByTagName("*");for(J=o.length-1;J>=0;J--)c(o[J]);c(d)}}function B(b,
c,i,d){if(!b)return F.pop();F.push({_:b,tmpl:c,item:this,data:i,options:d})}function s(b,c,i){return a.tmpl(a.template(b),c,i,this)}function t(b,c){var i=b.options||{};i.wrapped=c;return a.tmpl(a.template(b.tmpl),b.data,i,b.item)}function q(b,c){var i=this._wrap;return a.map(a(a.isArray(i)?i.join(""):i).filter(b||"*"),function(d){if(c)d=d.innerText||d.textContent;else{var o;if(!(o=d.outerHTML)){o=document.createElement("div");o.appendChild(d.cloneNode(true));o=o.innerHTML}d=o}return d})}function r(){var b=
this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}var e=a.fn.domManip,k="_tmplitem",v=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,l={},f={},A,w={key:0,data:{}},H=0,z=0,F=[];a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(b,c){a.fn[b]=function(i){var d=[];i=a(i);var o,p,x;o=this.length===1&&this[0].parentNode;A=l||{};if(o&&o.nodeType===11&&o.childNodes.length===1&&i.length===1){i[c](this[0]);d=this}else{p=0;for(x=
i.length;p<x;p++){z=p;o=(p>0?this.clone(true):this).get();a.fn[c].apply(a(i[p]),o);d=d.concat(o)}z=0;d=this.pushStack(d,b,i.selector)}i=A;A=null;a.tmpl.complete(i);return d}});a.fn.extend({tmpl:function(b,c,i){return a.tmpl(this[0],b,c,i)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(b,c,i){if(b[0]&&b[0].nodeType){for(var d=a.makeArray(arguments),o=b.length,p=0,x;p<o&&!(x=a.data(b[p++],"tmplItem")););if(o>1)d[0]=[a.makeArray(b)];
if(x&&z)d[2]=function(C){a.tmpl.afterManip(this,C,i)};e.apply(this,d)}else e.apply(this,arguments);z=0;A||a.tmpl.complete(l);return this}});a.extend({tmpl:function(b,c,i,d){var o=!d;if(o){d=w;b=a.template[b]||a.template(null,b);f={}}else if(!b){b=d.tmpl;l[d.key]=d;d.nodes=[];d.wrapped&&m(d,d.wrapped);return a(g(d,null,d.tmpl(a,d)))}if(!b)return[];if(typeof c==="function")c=c.call(d||{});i&&i.wrapped&&m(i,i.wrapped);c=a.isArray(c)?a.map(c,function(p){return p?h(i,d,b,p):null}):[h(i,d,b,c)];return o?
a(g(d,null,c)):c},tmplItem:function(b){var c;if(b instanceof a)b=b[0];for(;b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode););return c||w},template:function(b,c){if(c){if(typeof c==="string")c=n(c);else if(c instanceof a)c=c[0]||{};if(c.nodeType)c=a.data(c,"tmpl")||a.data(c,"tmpl",n(c.innerHTML));return typeof b==="string"?a.template[b]=c:c}return b?typeof b!=="string"?a.template(null,b):a.template[b]||a.template(null,v.test(b)?b:a(b)):null},encode:function(b){return(""+b).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});
a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(_,$1,$2);_=[];",close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){_.push($1a);}"},"=":{_default:{$1:"$data"},
open:"if($notnull_1){_.push($.encode($1a));}"},"!":{open:""}},complete:function(){l={}},afterManip:function(b,c,i){var d=c.nodeType===11?a.makeArray(c.childNodes):c.nodeType===1?[c]:[];i.call(b,c);G(d);z++}})})(jQuery);
(function(a,h,g){function j(t){t=t||location.href;return"#"+t.replace(/^[^#]*#?(.*)$/,"$1")}var n="hashchange",m=document,u,G=a.event.special,B=m.documentMode,s="on"+n in h&&(B===g||B>7);a.fn[n]=function(t){return t?this.bind(n,t):this.trigger(n)};a.fn[n].delay=50;G[n]=a.extend(G[n],{setup:function(){if(s)return false;a(u.start)},teardown:function(){if(s)return false;a(u.stop)}});u=function(){function t(){var f=j(),A=l(e);if(f!==e){v(e=f,A);a(h).trigger(n)}else if(A!==e)location.href=location.href.replace(/#.*/,
"")+A;r=setTimeout(t,a.fn[n].delay)}var q={},r,e=j(),k=function(f){return f},v=k,l=k;q.start=function(){r||t()};q.stop=function(){r&&clearTimeout(r);r=g};a.browser.msie&&!s&&function(){var f,A;q.start=function(){if(!f){A=(A=a.fn[n].src)&&A+j();f=a('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){A||v(j());t()}).attr("src",A||"javascript:0").insertAfter("body")[0].contentWindow;m.onpropertychange=function(){try{if(event.propertyName==="title")f.document.title=m.title}catch(w){}}}};
q.stop=k;l=function(){return j(f.location.href)};v=function(w,H){var z=f.document,F=a.fn[n].domain;if(w!==H){z.title=m.title;z.open();F&&z.write('<script>document.domain="'+F+'"<\/script>');z.close();f.location.hash=w}}}();return q}()})(jQuery,this);jQuery.extend({highlighter:{__config__:{sourceHtmlDataKey:"__jquery.highlighter.data.sourceHTML__"}}});
jQuery.fn.highlight=function(a,h){var g=jQuery.extend({hClass:"highlight",hColor:"#C03",separator:" ",wrapper:"span",useDefaultStyle:true},h),j=typeof g.hClass=="string"&&g.hClass.length>0,n=$("<"+g.wrapper+"/>");if(j)n.addClass(g.hClass);else if(g.useDefaultStyle){n.css("color",g.hColor);"span"==g.wrapper&&n.css("font-style","normal")}var m=null;if(typeof a=="string"){if(a==null||a.length==0)return false;m=a.split(g.separator)}else if(jQuery.isArray(a))m=a;else return false;for(g=0;g<m.length;g++){j=
m[g];for(var u=m.length-1;u>g;u--)j==m[u]&&m.splice(u,1)}var G=[{spChar:"\\",escapeChar:"\\\\"},{spChar:"$",escapeChar:"\\$"},{spChar:"(",escapeChar:"\\("},{spChar:")",escapeChar:"\\)"},{spChar:"*",escapeChar:"\\*"},{spChar:"+",escapeChar:"\\+"},{spChar:".",escapeChar:"\\."},{spChar:"[",escapeChar:"\\["},{spChar:"?",escapeChar:"\\?"},{spChar:"^",escapeChar:"\\^"},{spChar:"{",escapeChar:"\\{"},{spChar:"|",escapeChar:"\\|"}],B=/<\/?[a-z][a-z0-9]*[^<>]*>/ig,s=/&(?:[a-z]+?|#[0-9]+?|#x[0-9a-f]+?);/ig,
t=$("<div />");return this.each(function(){var q=$(this),r=q.data(jQuery.highlighter.__config__.sourceHtmlDataKey);r||(r=q.html());for(var e=null,k=[];(e=B.exec(r))!=null;){e={start:e.index,end:B.lastIndex,tag:e[0]};k.push(e)}for(var v=[];(e=s.exec(r))!=null;){e={start:e.index,end:s.lastIndex,tag:e[0]};v.push(e)}for(var l=[],f=0;f<m.length;f++){var A=t.text(m[f]).html();jQuery.each(G,function(b,c){A=A.replace(c.spChar,c.escapeChar)});for(var w=RegExp(A,"ig");(e=w.exec(r))!=null;){e={start:e.index,
end:w.lastIndex};l.push(e)}}for(f=l.length-1;f>=0;f--){e=l[f];for(w=0;w<k.length;w++){var H=k[w];if(e.start>H.start&&e.end<H.end){l.splice(f,1);break}}}for(f=l.length-1;f>=0;f--){e=l[f];for(w=0;w<v.length;w++){k=v[w];if(e.start>k.start&&e.end<=k.end||e.start>=k.start&&e.end<k.end){l.splice(f,1);break}if(e.start>k.start&&e.start<k.end&&e.end>k.end||e.start<k.start&&e.end>k.start&&e.end<k.end){l.splice(f,1);break}}}v=[];for(f=0;f<l.length;f++){e=l[f];for(w=l.length-1;w>f;w--){k=l[w];if(e.start<=k.start&&
e.end>=k.start&&e.end<k.end){e.end=k.end;l.splice(w,1)}else if(k.start<e.start&&k.end>=e.start&&k.end<=e.end){e.start=k.start;l.splice(w,1)}else if(e.start<=k.start&&e.end>=k.end)l.splice(w,1);else if(e.start>=k.start&&e.end<=k.end){e.start=k.start;e.end=k.end;l.splice(w,1)}}v.push(e)}v.sort(function(b,c){return b.start-c.start});var z=[],F=0;jQuery.each(v,function(b,c){F<c.start&&z.push(r.substring(F,c.start));t.empty().append(n.clone().html(r.substring(c.start,c.end)));z.push(t.html());F=c.end});
F<r.length&&z.push(r.substr(F));q.html(z.join(""))})};
var snsapi={root:function(){var a="i.dxy.cn";if(location.host.search("dxy.net")!=-1)a="i.dxy.net";return"http://"+a+"/"},go:function(a,b,d,e,c){a=snsapi.root()+a+"#"+snsutil.toHash(a,b,d,e);if("_blank"==snsutil.getValue(c,"_self"))window.open(a);else window.location.href=a},script:function(a,b,d,e){typeof e!="undefined"&&!snsutil.exists(e)||$.ajax({url:snsapi.root()+encodeURI(a),data:snsutil.getValue(b,{}),dataType:"script",success:d})},follow:function(a,b,d,e){snsutil.isNotEmpty(a)&&snsutil.isNotEmpty(b)&&
snsutil.isNotEmpty(d)&&snsapi.script("snsapi/friend/following/add/"+a,{eltId:b,csrfToken:d},snsutil.getValue(e,function(){if(eval(""+b+"_msg_no_avatar")){var c=eval(""+b+"_msg_no_avatar");if(c!="undefined"&&c!="")confirm(c)==true?snsapi.go("home","setting/avatar"):jQuery("#"+b).hide()}else if(eval(""+b)){alert("\u5173\u6ce8\u6210\u529f");jQuery("#"+b).hide()}}),b)},message:function(a,b,d){snsapi.go("home","message/write"+(snsutil.getValue(a,"")==""?"":"/"+a+(snsutil.getValue(d,"")==""?"":"/"+d)),
{},"content",snsutil.getValue(b,"_self"))},shareFeed:function(a){a=snsapi.root()+"snsapi/share/feed?dataType=jsonp&callback=cb&body="+a;$.ajax({type:"GET",url:a,async:false,jsonpCallback:"cb",contentType:"application/json",dataType:"jsonp",success:function(b){if(b.status=="ok")alert("\u5206\u4eab\u6210\u529f\uff01");else b.message=="100"?alert("\u8bf7\u5148\u767b\u5f55\uff01"):alert("\u7cfb\u7edf\u5f02\u5e38\uff01")}})}};
snsapi.newtip={id:"#sns-newtip",iid:null,show:function(a,b,d){if(snsutil.exists(snsapi.newtip.id)){jQuery.getScript(snsapi.root()+"snsapi/home/newtip"+(snsutil.isEmpty(a)?"":"?act=clear&type="+a),function(){if(snsutil.isNotEmpty(a)&&"all"==a)jQuery(snsapi.newtip.id).toggle(false);else{var e=0;if(typeof snsnewstatus!="undefined"){jQuery.each(snsnewstatus,function(f,g){if(snsutil.exists("sns-newtip-"+f)){jQuery("#sns-newtip-"+f+"-num").html(g);jQuery("#sns-newtip-"+f).toggle(g>0);e+=g}if("unread"==
f&&snsutil.exists("leftnavmsg")){jQuery("#leftnavmsg").html(g);jQuery("#leftnavmsg").toggle(g>0)}});showPushMessage(snsnewstatus)}jQuery("#sns-newtip-total-num").html(e);var c=jQuery(snsapi.newtip.id).parent();c[0].id=="newtip-fromdxy"?c.toggle(e>0):jQuery(snsapi.newtip.id).toggle(e>0);if(snsutil.isNotEmpty(a)&&snsutil.exists("sns-newtip-"+a)&&snsutil.isNotEmpty(b)&&snsutil.isNotEmpty(d))window.location.href=snsapi.root()+b+"#"+d}});snsapi.newtip.iid!=null&&clearInterval(snsapi.newtip.iid);snsapi.newtip.iid=
setInterval("snsapi.newtip.show()",6E4)}},follower:function(){snsapi.newtip.show("follower","friend","follower")},reply:function(){snsapi.newtip.show("reply","home","bbs/topic")},message:function(){snsapi.newtip.show("message","home","inbox/new")},notice:function(){snsapi.newtip.show("notice","home","notice/new")}};
jQuery(function(){snsapi.newtip.show();$.fn.follow=function(a){var b=this.offset(),d=$.browser.version!=6?false:true,e=0;a=$.extend({checkWinOffset:1,initTop:b.top,initLeft:b.left,className:"followBox"},a);var c=$("body").append("<div class='"+a.className+"'></div>").children("."+a.className);c.css("left",a.initLeft);this.appendTo(c).show();$(window).scroll(function(){var f=(document.documentElement.scrollTop>document.body.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)>a.initTop;
if(d)f?c.attr("class","followBoxTop0 followBox_ieTop0"):c.attr("class","followBoxTop0 followBox_ieTop");else{e=f?0:a.initTop;c.css("top",e+"px")}});return c}});var push_message_show=false;
function showPushMessage(a){if(snsutil.exists("#randomBox")&&a.push_msg_id&&a.push_msg_text){$("#push-msg-content").empty();$("#push-msg-content").append(a.push_msg_text).append("<p id='push-msg-btn'><a href='javascript:void(0);' class='goLink' id='push-msg-link'>"+snsutil.getValue(a.buttonText,"\u77e5\u9053\u4e86")+"</a></p>");$("#push-msg-link").click(function(){pushMessageClick(a.push_msg_id)});if(!push_message_show){var b=$(".nav_account"),d=0;d=b.offset().left-145;var e=$("#randomBox").follow({initTop:33,
initLeft:d,className:"followBoxTop0"});window.winOffset=0;setInterval(function(){var c=document.documentElement.clientWidth;if(c!=window.winOffset){e.css("left",b.offset().left-145+"px");window.winOffset=c}},2E3)}push_message_show=true}}function pushMessageClick(a){$.ajax({type:"GET",url:snsapi.root()+"/snsapi/home/newtip/push/"+a,dataType:"script",success:function(){afterPushMessageRemoved()}})};
