var res=["../img/bg/bg-index-1.jpg","../img/bg/bg-index-2.jpg","../img/bg/bg-index-3.jpg","../img/bg/bg-index-4.jpg","../img/bg/bg-index-5.jpg","../img/bg/bg-index-6.jpg","../img/bg/bg-index-7.jpg","../img/bg/bg-index-8.jpg","../img/bg/bg-index-9.jpg","../img/bg/bg-index-10.jpg","../img/bg/bg-index-11.jpg","../img/bg/bg-index-12.jpg","../img/bg/bg-index-13.jpg","../img/bg/bg-index-14.jpg","../img/bg/bg-index-15.jpg","../img/bg/bg-index-16.jpg","../img/bg/bg-index-17.jpg","../img/bg/bg-index-18.jpg","../img/bg/bg-index-19.jpg","../img/bg/bg-index-20.jpg","../img/sprites-guide.png","../img/bg-correct.png","../img/sprites-widget.png","../img/sprites-title.png","../img/sprites-audio.png","../img/bg-kv.jpg","../img/sprites-kv.png","../img/text/bg-text-1.png","../img/text/bg-text-2.png","../img/text/bg-text-3.png","../img/text/bg-text-4.png","../img/text/bg-text-5.png","../img/text/bg-text-6.png","../img/text/bg-text-7.png","../img/text/bg-text-8.png","../img/text/bg-text-9.png","../img/text/bg-text-10.png","../img/text/bg-text-11.png"],myScroll={},sound={},isReset=!1,pageH=603,pageW=375,width=window.innerWidth,height=window.innerHeight,pageRatio=pageH/pageW,windowRatio=height/width,questionIndex=0,isMove=!1,isEnter9=!1,clickCount=0,nickname="你",shotPosition=600,questionPosition=[1844,4294,8526,11038,13316,15798,19250,21398,24132,25636],answer=[2,2,1,4,1,2,3,4,[1,3,5,6],[3,4]],question9=[],multiple=.5*(height/pageH)/(windowRatio/pageRatio),$guide=$("#guide"),audio={$voice:$("#music"),oAudio:document.getElementById("audio"),audioEvent:function(){var i=this;i.oAudio&&(i.oAudio.addEventListener("canplaythrough",function(){i.oAudio.play()}),i.oAudio.addEventListener("timeupdate",function(){i.oAudio.currentTime>=i.oAudio.duration-1&&(i.oAudio.currentTime=0,i.oAudio.play())},!1))},playAudio:function(i,e){var t=this;t.oAudio&&(t.oAudio.src=i,e&&t.startAudio())},startAudio:function(){var i=this;i.oAudio&&(i.$voice.removeClass("music__off").addClass("music__on"),i.oAudio.load(),i.oAudio.play(),i.state.status=!0)},stopAudio:function(){var i=this;i.oAudio&&(i.$voice.removeClass("music__on").addClass("music__off"),i.oAudio.pause(),i.state.status=!1)},event:function(){var i=this;i.$voice.on("touchend",function(){return i.state.status?i.stopAudio():i.startAudio(),!1})},init:function(){var i=this;i.state={status:!1},i.audioEvent(),i.state.status=!0,i.event(),i.playAudio("./media/music.mp3",i.state.status),document.addEventListener("WeixinJSBridgeReady",function(){i.startAudio()},!1)}},IndexPage={init:function(){document.addEventListener("touchmove",function(i){i.preventDefault()},{passive:!1}),this.loading(),this.login()},loading:function(){var i=this;new mo.Loader(res,{loadType:1,minTime:300,onLoading:function(i,e){var t=parseInt(i/e*100);$("#progressBar").css("transform","translate("+(-100+t)+"%, 0)"),setTimeout(function(){$("#doll").html(100-t)},0)},onComplete:function(){$("#loading").addClass("hide"),audio.init(),i.playAudio("./media/airplane.wav"),i.bindEvents()}})},reset:function(){questionIndex=0,myScroll.scrollTo(0,0),question9=[],$(".btn").removeClass("active correct"),$("#kv").removeClass("active error"),$("#mask").removeClass("active"),$("#text").removeClass("active"),$("#chicken").removeClass("active"),$(".page-question").removeClass("active"),audio.startAudio(),isEnter9=!1,isReset=!0},playAudio:function(i){sound=document.getElementById("audio2"),sound.src=i,sound.load(),sound.play()},action:function(){function i(i){var e=-questionPosition[questionIndex]*multiple;e>=i&&($(".page-question-"+(parseInt(questionIndex)+1)).addClass("active"),isMove=!1,myScroll.scrollTo(0,e))}myScroll=new IScroll("#wrapper",{mouseWheel:!0,useTransform:!0,preventDefault:!0,probeType:3}),myScroll.on("scroll",function(){isMove=!0,$guide.removeClass("active"),i(this.y)}),myScroll.on("scrollEnd",function(){isMove=!1,i(this.y)}),myScroll.on("scrollStart",function(){isMove=!0})},showKV:function(i,e){$("#mask").addClass("active"),$("#kv").addClass(e?"active":"error");var t="./img/text/bg-text-"+i+".png";$("#text").attr("src",t).addClass("active"),$("#chicken").addClass("active"),this.share(nickname,i)},login:function(){var i=this;TGLogin.init({wxAppId:"wx13051697527efc45"},function(e){var t=e.mGetPlatformType();"wx"===t?e.mWXLogin(function(e){nickname=e.nickname,i.share(nickname,0)}):"qq"===t?e.mQQLogin(function(e){nickname=e.nickname,i.share(nickname,0)}):e.mOpenQQ()})},share:function(i,e){var t="啊啊啊，"+i+"怂成狗了，连飞机都不敢上，速来围观！";e>=1&&3>=e?t="啧啧啧，"+i+"刚落地就凉凉了，快来帮帮这个菜鸡吧！":e>3&&8>=e?t="嘤嘤嘤，"+i+"跑毒不小心送了一波快递，求你给个爱的抱抱~":e>8&&10>=e?t="喵喵喵？"+i+"居然打进决战圈了？走，咱们去把他莽了吧！":11==e&&(t="666，"+i+"是活到最后的大神！来呀求怼求实锤呀~"),TGMobileShare({shareTitle:"绝地求生:全军出击",shareDesc:t,shareImgUrl:"../img/share.png",shareLink:"",actName:"a20171220pubgm"})},bindEvents:function(){function i(i,e){for(var t=0;t<i.length;t++)if(i[t]==e){i.splice(t,1);break}}var e=this;$(document).on("touchend",function(){1>clickCount?($("#windows1").addClass("active"),clickCount++):2>clickCount?($("#windows2").addClass("active"),clickCount++):3>clickCount&&(e.action(),$("#guide2").addClass("hide"),$("#windows3").addClass("active").off("webkitAnimationEnd").on("webkitAnimationEnd",function(){$("#tips").addClass("active").off("webkitAnimationEnd").on("webkitAnimationEnd",function(){$guide.addClass("active")})}),e.playAudio("./media/shot.wav"),myScroll.scrollTo(0,-shotPosition*multiple,1e3),clickCount++)}),$(".btn").on("touchend",function(){if(!isMove){var t=$(this),n=t.data("value");if(t.hasClass("btn-3"))t.hasClass("active")?isEnter9||(t.removeClass("active"),i(question9,parseInt(n))):(t.addClass("active"),question9.push(parseInt(n)));else if(t.hasClass("btn-4")){if(!isEnter9){var o=0;isEnter9=!0;for(var s=0;s<answer[questionIndex].length;s++)if(question9.length>0)for(var a=0;a<question9.length;a++)answer[questionIndex][s]===question9[a]&&($(".page-question-9").find(".btn-3").eq(question9[a]-1).addClass("correct"),o++);o==answer[questionIndex].length?(e.playAudio("./media/correct.mp3"),!isReset&&$guide.addClass("active"),questionIndex++):(e.playAudio("./media/error.mp3"),e.showKV(parseInt(questionIndex)+1,!1))}}else if(!t.siblings(".btn").hasClass("active")&&!t.hasClass("active")){t.addClass("active");var d=!1,g=answer[questionIndex];if("object"==typeof g)for(var s=0;s<g.length;s++)parseInt(n)==g[s]&&(d=!0);parseInt(n)==g||d?(t.addClass("correct"),e.playAudio("./media/correct.mp3"),9==questionIndex?e.showKV(11,!0):(!isReset&&$guide.addClass("active"),questionIndex++)):(e.playAudio("./media/error.mp3"),e.showKV(parseInt(questionIndex)+1,!1))}}}),$("#reset").on("touchend",e.reset)}};$(function(){IndexPage.init()});