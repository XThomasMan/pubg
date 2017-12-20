/**
 * Created by evanzhou on 2017/12/17.
 */
var res = [
  '../img/bg/bg-index-1.jpg',
  '../img/bg/bg-index-2.jpg',
  '../img/bg/bg-index-3.jpg',
  '../img/bg/bg-index-4.jpg',
  '../img/bg/bg-index-5.jpg',
  '../img/bg/bg-index-6.jpg',
  '../img/bg/bg-index-7.jpg',
  '../img/bg/bg-index-8.jpg',
  '../img/bg/bg-index-9.jpg',
  '../img/bg/bg-index-10.jpg',
  '../img/bg/bg-index-11.jpg',
  '../img/bg/bg-index-12.jpg',
  '../img/bg/bg-index-13.jpg',
  '../img/bg/bg-index-14.jpg',
  '../img/bg/bg-index-15.jpg',
  '../img/bg/bg-index-16.jpg',
  '../img/bg/bg-index-17.jpg',
  '../img/bg/bg-index-18.jpg',
  '../img/bg/bg-index-19.jpg',
  '../img/bg/bg-index-20.jpg',
  '../img/bg-guide.png',
  '../img/bg-correct.png',
  '../img/sprites-widget.png',
  '../img/sprites-title.png',
  '../img/sprites-audio.png',
  '../img/bg-kv.jpg',
  '../img/sprites-kv.png',
  '../img/text/bg-text-1.png',
  '../img/text/bg-text-2.png',
  '../img/text/bg-text-3.png',
  '../img/text/bg-text-4.png',
  '../img/text/bg-text-5.png',
  '../img/text/bg-text-6.png',
  '../img/text/bg-text-7.png',
  '../img/text/bg-text-8.png',
  '../img/text/bg-text-9.png',
  '../img/text/bg-text-10.png',
  '../img/text/bg-text-11.png'
];
var myScroll = {};
var isReset = false;
var pageH = 603;
var pageW = 375;
var width = window.innerWidth;
var height = window.innerHeight;
var pageRatio = pageH / pageW;
var windowRatio = height / width;
var questionIndex = 0;
var isMove = false;
var isEnter9 = false;
var nickname = '你';
var questionPosition = [1844, 4294, 8526, 11038, 13316, 15798, 19250, 21398, 24132, 25636];
var answer = [2, 2, 1, 4, 1, 2, 3, 4, [1, 3, 5, 6], [3, 4]];
var question9 = [];
var multiple = .5 * (height / pageH) / (windowRatio / pageRatio);
var $guide = $('#guide');
var audio = {
  $voice: $("#music"),
  oAudio: document.getElementById('audio'),
  audioEvent: function () {
    var _this = this;
    if (!_this.oAudio) {
      return;
    }
    _this.oAudio.addEventListener('canplaythrough', function () {
      _this.oAudio.play();
    });
    _this.oAudio.addEventListener('timeupdate', function () {
      if (_this.oAudio.currentTime >= _this.oAudio.duration - 1) {
        _this.oAudio.currentTime = 0;
        _this.oAudio.play();
      }
    }, false);
  },
  playAudio: function (src, auto) {
    var _this = this;
    if (!_this.oAudio) {
      return;
    }
    _this.oAudio.src = src;

    if (auto) {
      _this.startAudio();
    }
  },
  startAudio: function () {
    var _this = this;
    if (!_this.oAudio) {
      return;
    }
    _this.$voice.removeClass("music__off").addClass("music__on");
    _this.oAudio.load();
    _this.oAudio.play();
    _this.state.status = true;
  },
  stopAudio: function () {
    var _this = this;
    if (!_this.oAudio) {
      return;
    }
    _this.$voice.removeClass("music__on").addClass("music__off");
    _this.oAudio.pause();
    _this.state.status = false;

  },
  event: function () {
    var _this = this;
    _this.$voice.on('touchend', function () {
      //正在播放
      if (_this.state.status) {
        _this.stopAudio();
      }
      //已经停止播放
      else {
        _this.startAudio();
      }
      return false;
    });
  },
  init: function () {
    var _this = this;
    _this.state = {
      status: false
    };
    _this.audioEvent();
    _this.state.status = true;
    _this.event();
    _this.playAudio('./media/music.mp3', _this.state.status);
    document.addEventListener("WeixinJSBridgeReady", function () {
      _this.startAudio();
    }, false);
  }
};
var IndexPage = {
  init: function () {
    document.addEventListener('touchmove', function (e) {
      e.preventDefault()
    }, {passive: false});
    this.loading();
    this.login();
  },
  loading: function () {
    var self = this;
    new mo.Loader(res, {
      loadType: 1,
      minTime: 300,
      onLoading: function (count, total) {
        var progress = parseInt(count / total * 100);
        $('#progressBar').css('transform', 'translate(' + (-100 + progress) + '%, 0)');
        setTimeout(function () {
          $('#doll').html(100 - progress);
        }, 0);
      },
      onComplete: function () {
        $('#loading').addClass('hide');
        self.action();
        self.bindEvents();
      }
    });
  },
  reset: function () {
    questionIndex = 0;
    myScroll.scrollTo(0, 0);
    question9 = [];
    $('.btn').removeClass('active correct');
    $('#kv').removeClass('active');
    $('#text').removeClass('active');
    $('#chicken').removeClass('active');
    $('.page-question').removeClass('active');
    audio.startAudio();
    isEnter9 = false;
    isReset = true;
  },
  action: function () {
    audio.init();
    $('.windows, #guide').addClass('active');
    myScroll = new IScroll('#wrapper', {
      mouseWheel: true,
      useTransform: true,
      preventDefault: true,
      probeType: 3
    });
    function position(y) {
      var position = -questionPosition[questionIndex] * multiple;
      if (y <= position) {
        $('.page-question-' + (parseInt(questionIndex) + 1)).addClass('active');
        isMove = false;
        myScroll.scrollTo(0, position);
      }
    }

    myScroll.on('scroll', function () {
      isMove = true;
      $guide.removeClass('active');
      position(this.y);
    });
    myScroll.on('scrollEnd', function () {
      isMove = false;
      position(this.y);
    });
  },
  showKV: function (index) {
    $('#kv').addClass('active');
    var imgSrc = './img/text/bg-text-' + index + '.png';
    $('#text').attr('src', imgSrc).addClass('active');
    $('#chicken').addClass('active');
    this.share(nickname, index);
  },
  login: function () {
    var self = this;
    //登录组件
    TGLogin.init({
      wxAppId: 'wx13051697527efc45' //游戏在微信平台的appId
    }, function (TGLoginManager) {
      //获取当前平台类型(wx/qq/other)
      var platform = TGLoginManager.mGetPlatformType();
      if (platform === 'wx') {
        //微信平台 - 进行微信登录
        TGLoginManager.mWXLogin(function (uinfo) {
          //将微信昵称设置到分享标题中
          nickname = uinfo.nickname;
          self.share(nickname, 0);
        });
      } else if (platform === 'qq') {
        //QQ平台 - 进行手Q登录
        TGLoginManager.mQQLogin(function (uinfo) {
          //将QQ昵称设置到分享标题中
          nickname = uinfo.nickname;
          self.share(nickname, 0);
        });
      } else {
        //非微信、QQ平台
        //拉起手QAPP打开页面
        TGLoginManager.mOpenQQ();
      }
    });
  },
  share: function (username, index) {
    var shareDesc = '啊啊啊，' + username + '怂成狗了，连飞机都不敢上，速来围观！';
    if (index >= 1 && index <= 3) {
      shareDesc = '啧啧啧，' + username + '刚落地就凉凉了，快来帮帮这个菜鸡吧！';
    } else if (index > 3 && index <= 8) {
      shareDesc = '嘤嘤嘤，' + username + '跑毒不小心送了一波快递，求你给个爱的抱抱~';
    } else if (index > 8 && index <= 10) {
      shareDesc = '喵喵喵？' + username + '居然打进决战圈了？走，咱们去把他莽了吧！';
    } else if (index == 11) {
      shareDesc = '666，' + username + '是活到最后的大神！来呀求怼求实锤呀~';
    }
    //分享
    TGMobileShare({
      //不设置或设置为空时，页面有title，则调取title
      shareTitle: '绝地求生:全军出击',
      //不设置或设置为空时，页面有Description，则调取Description
      shareDesc: shareDesc,
      //分享图片尺寸200*200，大小控制在10k左右，且填写绝对路径
      shareImgUrl: '../img/share.png',
      //分享链接要跟当前页面同域名(手Q分享有这个要求) ,不设置或设置为空时，默认调取当前URL
      shareLink: '',
      //点击流命名，用于统计分享量，专题一般采用目录名称如a20151029demo
      actName: "a20171220pubgm"
    });
  },
  bindEvents: function () {
    var self = this;

    function removeByValue(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    }

    $('.btn').on('touchend', function () {
      if (!isMove) {
        var $this = $(this);
        var value = $this.data('value');
        if ($this.hasClass('btn-3')) {
          if ($this.hasClass('active')) {
            if (!isEnter9) {
              $this.removeClass('active');
              removeByValue(question9, parseInt(value));
            }
          } else {
            $this.addClass('active');
            question9.push(parseInt(value));
          }
        } else if ($this.hasClass('btn-4')) {
          if (!isEnter9) {
            var correct = 0;
            isEnter9 = true;
            for (var i = 0; i < answer[questionIndex].length; i++) {
              if (question9.length > 0) {
                for (var j = 0; j < question9.length; j++) {
                  if (answer[questionIndex][i] === question9[j]) {
                    $('.page-question-9').find('.btn-3').eq(question9[j] - 1).addClass('correct');
                    correct++;
                  }
                }
              }
            }
            if (correct == answer[questionIndex].length) {
              !isReset && $guide.addClass('active');
              questionIndex++;
            } else {
              //答错
              self.showKV(parseInt(questionIndex) + 1);
            }
          }
        } else {
          if (!$this.siblings('.btn').hasClass('active') && !$this.hasClass('active')) {
            $this.addClass('active');
            var isCorrect = false;
            var correctAnswer = answer[questionIndex];
            if(typeof correctAnswer == 'object'){
              for(var i = 0; i < correctAnswer.length; i++){
                if(parseInt(value) == correctAnswer[i]){
                  isCorrect = true
                }
              }
            }
            if (parseInt(value) == correctAnswer || isCorrect) {
              $this.addClass('correct');
              if (questionIndex == 9) {
                //全对了
                self.showKV(11);
              } else {
                if (questionIndex == 0 && !isReset) {
                  $guide.addClass('active');
                }
                questionIndex++;
              }
            } else {
              //答错
              self.showKV(parseInt(questionIndex) + 1);
            }
          }
        }
      }
    });

    $('#reset').on('touchend', self.reset);
  }
};
$(function () {
  IndexPage.init();
});