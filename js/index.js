var res=["../img/bg-index-1.jpg","../img/bg-index-2.jpg","../img/bg-index-3.jpg","../img/bg-index-4.jpg","../img/bg-index-5.jpg","../img/bg-index-6.jpg","../img/bg-index-7.jpg","../img/bg-index-8.jpg","../img/bg-index-9.jpg","../img/bg-index-10.jpg","../img/bg-index-11.jpg","../img/bg-index-12.jpg","../img/bg-index-13.jpg","../img/bg-index-14.jpg","../img/bg-index-15.jpg","../img/bg-index-16.jpg","../img/bg-index-17.jpg","../img/bg-index-18.jpg","../img/bg-index-19.jpg","../img/bg-index-20.jpg","../img/sprites-widget.png","../img/sprites-title.png"],pageH=603,pageW=375,width=window.innerWidth,height=window.innerHeight,pageRatio=pageH/pageW,windowRatio=height/width,questionIndex=0,questionPosition=[1844,4294,8526,11038,13316,15798,19250,21398,24132,25636],answer=[2,2,1,4,1,2,3,4,[1,4,6,7,8],4],question9=[],multiple=.5*(height/pageH)/(windowRatio/pageRatio),isScope=!1,IndexPage={init:function(){this.loading()},loading:function(){var i=this;new mo.Loader(res,{loadType:1,minTime:300,onLoading:function(i,e){var n=parseInt(i/e*100);$("#progressBar").css("transform","translate("+(-100+n)+"%, 0)"),setTimeout(function(){$("#doll").html(n+"%")},0)},onComplete:function(){$("#loading").addClass("hide"),i.action(),i.bindEvents()}})},action:function(){$(".windows").addClass("active");var i=new IScroll("#wrapper",{mouseWheel:!0,bounceTime:1e3,bounceLock:!0,preventDefault:!0,probeType:3});i.on("scroll",function(){var e=-questionPosition[questionIndex]*multiple;this.y<=e&&(i.scrollTo(0,e),isScope=!0),this.y>e&&isScope&&i.scrollTo(0,e)})},bindEvents:function(){$(".btn").on("touchend",function(){var i=$(this),e=i.data("value");if(i.hasClass("btn-3"))i.addClass("active"),question9.push(parseInt(e));else if(i.hasClass("btn-4")){for(var n=0,g=0;g<answer[questionIndex].length;g++)if(question9.length>0)for(var t=0;t<question9.length;t++)answer[questionIndex][g]===question9[t]&&n++;n==answer[questionIndex].length?(questionIndex++,isScope=!1):alert("答错了")}else i.siblings(".btn").hasClass("active")||(i.addClass("active"),parseInt(e)==answer[questionIndex]?9==questionIndex?alert("全对了"):(questionIndex++,isScope=!1):alert("答错了"))})}};$(function(){IndexPage.init()});