var mainPer = (function () {

    function init() {
        header();
        gnbScroll();
        boxHeight();
        slide();
        sideBar();
        skillBar();
    }

    function header() {
        var $header = $(".header");
        $(window).scroll(function () {
            var $scrTop = $(window).scrollTop();
            if ($scrTop > 10) {
                //스크롤할때
                $header.addClass("if_scroll");
                $header.removeClass("if_top");
            } else {
                //스크롤탑일때
                $header.addClass("if_top");
                $header.removeClass("if_scroll");
            }
        });
    }

    function gnbScroll() {
        var $window = $("html, body"),
            $menu = $("#gnb li"),
            $con = $(".main section");
        $menu.click(function () {
            var $idx = $(this).index(),
                $scroll = $con.eq($idx).offset().top;
            $window.animate({scrollTop: $scroll});
        });
        
        $(window).scroll(function () {
            var $sct = $(window).scrollTop()+100;
            $con.each(function () {
                var $idx = $(this).index(),
                    $scroll = $(this).offset().top;                
                if ($sct >= $scroll) {
                    $menu.removeClass("active");
                    $menu.eq($idx).addClass("active");
                }
            });
        });
    }

    function boxHeight() {
        var $height = $(window).height(),
            $section = $(".about, .portfolio, .contact");
        $section.css({
            height: $height
        });

    }

    function slide() {
        var $visualArea=$(".visual_slide div");
        $visualArea.slick({
            autoplay: true,
            infinite: true,
            dots: true,
            arrows: false
        });
        
        $(".img-url").each(function(){
            var $url=$(this).attr("data-img");
            $(this).css({backgroundImage:"url("+$url+")"});
        });
        
    }

    function sideBar() {
        var ckNum = 1,
            $nav = $(".nav"),
            $side = $(".side");
        $side.click(function () {
            $this = $(this);
            if (ckNum === 0) {
                $nav.stop().animate({
                    right: "-300px"
                });
                $this.css({
                    background: "url(images/common/menu.png) no-repeat"
                });
                ckNum = 1;
            } else {
                $nav.stop().animate({
                    right: "0"
                });
                $this.css({
                    background: "url(images/common/close.png) no-repeat"
                });
                ckNum = 0;
            }
        });
    }

    function skillBar() {
        var $window = $(document),
            $aboutTop = $(".about").offset().top;
        $window.bind('scroll', function (ev) {
            var $winTop = $window.scrollTop() + 200;
            if ($winTop > $aboutTop) {
                $('.bar-percentage[data-percentage]').each(function () {
                    var progress = $(this),
                        percentage = Math.ceil($(this).attr('data-percentage'));
                    $({
                        countNum: 0
                    }).animate({
                        countNum: percentage + 1
                    }, {
                        duration: 2000,
                        step: function () {
                            var pct = Math.floor(this.countNum) + '%';
                            progress.text(pct) && progress.siblings().children().css('width', pct);
                        }
                    });
                });
                $(document).unbind('scroll');
            }
        });
    }

    return {
        init: init
    };
}());
mainPer.init();
