/**
 * @module atech
 * @description ?
 * */

if (typeof jQuery === "undefined") {
    throw new Error("jQuery plugins need to be before this file");
}

$.AdminBSB = {};
$.AdminBSB.options = {
    leftSideBar: {
        scrollColor: 'rgba(0,0,0,0.7)',
        scrollWidth: '4px',
        scrollAlwaysVisible: true,
        scrollBorderRadius: '0',
        scrollRailBorderRadius: '0',
        scrollActiveItemWhenPageLoad: true,
        breakpointWidth: 2560
    },
    dropdownMenu: {
        effectIn: 'fadeIn',
        effectOut: 'fadeOut'
    }
}

/* Left Sidebar - Function =================================================================================================
*  You can manage the left sidebar menu options
*
*/
$.AdminBSB.leftSideBar = {
    activate: function () {
        var _this = this;
        var $body = $('body');
        var $overlay = $('.overlay');

        //Close sidebar
        $(window).click(function (e) {
            var $target = $(e.target);
            if (e.target.nodeName.toLowerCase() === 'i') { $target = $(e.target).parent(); }

            if ($('.user-helper-dropdown').hasClass('open')){
                $('.user-helper-dropdown').removeClass('open');
            }

            if ($('.dropdown').hasClass('open')){
                $('.dropdown').removeClass('open');
            }
        });

        $.each($('.menu-toggle.toggled'), function (i, val) {
            $(val).next().slideToggle(0);
        });

        //When page load
        $.each($('.menu .list li.active'), function (i, val) {
            var $activeAnchors = $(val).find('a:eq(0)');

            $activeAnchors.addClass('toggled');
            $activeAnchors.next().show();
        });

        //Collapse or Expand Menu
        $('.menu-toggle').on('click', function (e) {
            var $this = $(this);
            var $content = $this.next();

            if ($($this.parents('ul')[0]).hasClass('list')) {
                var $not = $(e.target).hasClass('menu-toggle') ? e.target : $(e.target).parents('.menu-toggle');

                $.each($('.menu-toggle.toggled').not($not).next(), function (i, val) {
                    if ($(val).is(':visible')) {
                        $(val).prev().toggleClass('toggled');
                        $(val).slideUp();
                    }
                });
            }

            $this.toggleClass('toggled');
            $content.slideToggle(320);
        });

        //Set menu height
        _this.setMenuHeight(true);
        _this.checkStatusForResize(true);
        $(window).resize(function () {
            _this.setMenuHeight(false);
            _this.checkStatusForResize(false);
        });
    },
    setMenuHeight: function (isFirstTime) {
        if (typeof $.fn.slimScroll != 'undefined') {
            var configs = $.AdminBSB.options.leftSideBar;
            var height = ($(window).height() - ($('.legal').outerHeight() + $('.user-info').outerHeight() + $('.navbar').innerHeight()));
            var $el = $('.list');

            if (!isFirstTime) {
                $el.slimscroll({
                    destroy: true
                });
            }

            $el.slimscroll({
                height: height + "px",
                color: configs.scrollColor,
                size: configs.scrollWidth,
                alwaysVisible: configs.scrollAlwaysVisible,
                borderRadius: configs.scrollBorderRadius,
                railBorderRadius: configs.scrollRailBorderRadius
            });

            //Scroll active menu item when page load, if option set = true
            if ($.AdminBSB.options.leftSideBar.scrollActiveItemWhenPageLoad) {
                var item = $('.menu .list li.active')[0];
                if (item) {
                    var activeItemOffsetTop = item.offsetTop;
                    if (activeItemOffsetTop > 150) $el.slimscroll({ scrollTo: activeItemOffsetTop + 'px' });
                }
            }
        }
    },
    checkStatusForResize: function (firstTime) {
        var $body = $('body');
        var $openCloseBar = $('.navbar .navbar-header .bars');
        var width = $body.width();

        if (firstTime) {
            $body.find('.content, .sidebar').addClass('no-animate').delay(1000).queue(function () {
                $(this).removeClass('no-animate').dequeue();
            });
        }

        // $('body').addClass('overlay-open');
        if (width < $.AdminBSB.options.leftSideBar.breakpointWidth) {
            $body.addClass('ls-closed');
            $openCloseBar.fadeIn();
        } else {
            $body.removeClass('ls-closed');
            $openCloseBar.fadeOut();
        }
    },
    isOpen: function () {
        return $('body').hasClass('overlay-open');
    }
};
//==========================================================================================================================

/* Navbar - Function =======================================================================================================
*  You can manage the navbar
*
*/
$.AdminBSB.navbar = {
    activate: function () {
        var $body = $('body');
        var $overlay = $('.overlay');

        //Open left sidebar panel
        $('.bars').on('click', function () {
            $body.toggleClass('overlay-open');
            if ($body.hasClass('overlay-open')) { $overlay.fadeIn(); } else { $overlay.fadeOut(); }
        });

        //Close collapse bar on click event
        $('.nav [data-close="true"]').on('click', function () {
            var isVisible = $('.navbar-toggle').is(':visible');
            var $navbarCollapse = $('.navbar-collapse');

            if (isVisible) {
                $navbarCollapse.slideUp(function () {
                    $navbarCollapse.removeClass('in').removeAttr('style');
                });
            }
        });
    }
}
//==========================================================================================================================

/* Input - Function ========================================================================================================
*  You can manage the inputs(also textareas) with name of class 'form-control'
*
*/
$.AdminBSB.input = {
    activate: function ($parentSelector) {
        $parentSelector = $parentSelector || $('body');

        //On focus event
        $parentSelector.find('.form-control').focus(function () {
            $(this).closest('.form-line').addClass('focused');
        });

        //On focusout event
        $parentSelector.find('.form-control').focusout(function () {
            var $this = $(this);
            if ($this.parents('.form-group').hasClass('form-float')) {
                if ($this.val() == '') { $this.parents('.form-line').removeClass('focused'); }
            }
            else {
                $this.parents('.form-line').removeClass('focused');
            }
        });

        //On label click
        $parentSelector.on('click', '.form-float .form-line .form-label', function () {
            $(this).parent().find('input').focus();
        });

        //Not blank form
        $parentSelector.find('.form-control').each(function () {
            if ($(this).val() !== '') {
                $(this).parents('.form-line').addClass('focused');
            }
        });
    }
}
//==========================================================================================================================

/* Form - Select - Function ================================================================================================
*  You can manage the 'select' of form elements
*
*/
$.AdminBSB.select = {
    activate: function () {
        if ($.fn.selectpicker) { $('select:not(.ms)').selectpicker(); }
    }
}
//==========================================================================================================================

/* DropdownMenu - Function =================================================================================================
*  You can manage the dropdown menu
*
*/

$.AdminBSB.dropdownMenu = {
    activate: function () {
        var _this = this;

        $('.dropdown, .dropup, .btn-group').on({
            "show.bs.dropdown": function () {
                var dropdown = _this.dropdownEffect(this);
                _this.dropdownEffectStart(dropdown, dropdown.effectIn);
            },
            "shown.bs.dropdown": function () {
                var dropdown = _this.dropdownEffect(this);
                if (dropdown.effectIn && dropdown.effectOut) {
                    _this.dropdownEffectEnd(dropdown, function () { });
                }
            },
            "hide.bs.dropdown": function (e) {
                var dropdown = _this.dropdownEffect(this);
                if (dropdown.effectOut) {
                    e.preventDefault();
                    _this.dropdownEffectStart(dropdown, dropdown.effectOut);
                    _this.dropdownEffectEnd(dropdown, function () {
                        dropdown.dropdown.removeClass('open');
                    });
                }
            }
        });
    },
    dropdownEffect: function (target) {
        var effectIn = $.AdminBSB.options.dropdownMenu.effectIn, effectOut = $.AdminBSB.options.dropdownMenu.effectOut;
        var dropdown = $(target), dropdownMenu = $('.dropdown-menu', target);

        if (dropdown.length > 0) {
            var udEffectIn = dropdown.data('effect-in');
            var udEffectOut = dropdown.data('effect-out');
            if (udEffectIn !== undefined) { effectIn = udEffectIn; }
            if (udEffectOut !== undefined) { effectOut = udEffectOut; }
        }

        return {
            target: target,
            dropdown: dropdown,
            dropdownMenu: dropdownMenu,
            effectIn: effectIn,
            effectOut: effectOut
        };
    },
    dropdownEffectStart: function (data, effectToStart) {
        if (effectToStart) {
            data.dropdown.addClass('dropdown-animating');
            data.dropdownMenu.addClass('animated dropdown-animated');
            data.dropdownMenu.addClass(effectToStart);
        }
    },
    dropdownEffectEnd: function (data, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        data.dropdown.one(animationEnd, function () {
            data.dropdown.removeClass('dropdown-animating');
            data.dropdownMenu.removeClass('animated dropdown-animated show');
            data.dropdownMenu.removeClass(data.effectIn);
            data.dropdownMenu.removeClass(data.effectOut);

            if (typeof callback == 'function') {
                callback();
            }
        });
    }
}
//==========================================================================================================================

/* Browser - Function ======================================================================================================
*  You can manage browser
*
*/
var edge = 'Microsoft Edge';
var ie10 = 'Internet Explorer 10';
var ie11 = 'Internet Explorer 11';
var opera = 'Opera';
var firefox = 'Mozilla Firefox';
var chrome = 'Google Chrome';
var safari = 'Safari';

$.AdminBSB.browser = {
    activate: function () {
        var _this = this;
        var className = _this.getClassName();

        if (className !== '') $('html').addClass(_this.getClassName());
    },
    getBrowser: function () {
        var userAgent = navigator.userAgent.toLowerCase();

        if (/edge/i.test(userAgent)) {
            return edge;
        } else if (/rv:11/i.test(userAgent)) {
            return ie11;
        } else if (/msie 10/i.test(userAgent)) {
            return ie10;
        } else if (/opr/i.test(userAgent)) {
            return opera;
        } else if (/chrome/i.test(userAgent)) {
            return chrome;
        } else if (/firefox/i.test(userAgent)) {
            return firefox;
        } else if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
            return safari;
        }

        return undefined;
    },
    getClassName: function () {
        var browser = this.getBrowser();

        if (browser === edge) {
            return 'edge';
        } else if (browser === ie11) {
            return 'ie11';
        } else if (browser === ie10) {
            return 'ie10';
        } else if (browser === opera) {
            return 'opera';
        } else if (browser === chrome) {
            return 'chrome';
        } else if (browser === firefox) {
            return 'firefox';
        } else if (browser === safari) {
            return 'safari';
        } else {
            return '';
        }
    }
}
//==========================================================================================================================

$(function () {
    document.cookie = "safeCookie1=foo; SameSite=Lax";
    document.cookie = "safeCookie2=foo";
    document.cookie = "crossCookie=bar; SameSite=None; Secure";

    $.AdminBSB.browser.activate();
    $.AdminBSB.leftSideBar.activate();
    $.AdminBSB.navbar.activate();
    $.AdminBSB.dropdownMenu.activate();
    $.AdminBSB.input.activate();
    $.AdminBSB.select.activate();

    var originWidth = $(document).width();

    /* Permissions button */
    if(update_y == 'N'){
        $('.button_area').css({'opacity':'0'});
        $('.button_area button').prop('disabled',true);
    }

    if(update_y == "Y"){
        $('.button_area').css({'opacity':'1'});
        $('.button_area button').prop('disabled',false);
    }

    setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);

    /* Selected Menu */
    $('.sidebar .nav-item').on('click', function(){
        $('.sidebar .nav-item.selected').removeClass('selected');
        $('.nav_1dep.on').removeClass('on');
        $(this).siblings().find('.sub_menu').removeClass('show');

        $(this).addClass('selected');
        $(this).find('.nav_1dep').addClass('on');
    });

    /* change selected */
    const _URL = window.location.pathname;

    $('.ml-menu li a').each(function (i, v) {
        let $elem = $(this);
        const contxtUrl = $elem.attr('href');

        if(_URL == contxtUrl){
            $(this).addClass('selected');
        }
    });

    $('.page_tab ul li').on('click', function(e){
        e.preventDefault();

        $('.page_tab ul li.active').removeClass('active');
        $(this).addClass('active');
    });

    /* alarm */
    $('#notiDropdownMenuButton').on('click', function(e){
        e.preventDefault();

        $('.backdrop').toggleClass('open');
        $('.alarm_info').toggleClass('open');
    });

    /* setting */
    $('#openModUserInfo').on('click', function(e){
        e.preventDefault();

        $('#userPW').val('');
        $('#userPWConfirm').val('');
        $('.backdrop').addClass('open');
        $('.mod_user_info').addClass('open');
    });

    $('.backdrop').on('click', function(e){
        $('.backdrop').removeClass('open');

        if($('.alarm_info').hasClass('open')){
            $('.alarm_info').removeClass('open');
        }
        if($('.mod_user_info').hasClass('open')){
            $('.mod_user_info').removeClass('open');
        }
    });

    /* 모달 backdrop */
    var count = 0; // 모달이 열릴 때 마다 count 해서  z-index값을 높여줌
    $(document).on('show.bs.modal', '.modal', function () {
        var zIndex = 1040 + (10 * count);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
        count = count + 1
    });

    $(document).on('hidden.bs.modal', '.modal', function () {
        $('.modal:visible').length && $(document.body).addClass('modal-open');
    });

    /* Logout */
    $('#logout').on('click', function(){
        $.ajax({
            type : "POST",
            url  : "/login/Login.do",
            dataType: "json",
            data : { task: "logout", }
        }).done(function(data){
            if(data.retCode == ""){alert("로그아웃중 오류가 발생하였습니다."); return;}
            document.location.href=data.url;
        }).fail(function(data){
            showToastE("통신에 문제가 있습니다.");
            if(isFunc(func_fail)){func_fail(data);}
        });
    });

    /* check new password */
    $('#btnUpdatePW').on('click', function(){
        let pw1 = $('#userPW').val();
        let pw2 = $('#userPWConfirm').val();
        if(pw1 == ""){ $('#userPW').focus(); return showToastW("새로운 비밀번호를 입력해주세요."); }
        if(pw2 == ""){ $('#userPWConfirm').focus(); return showToastW("비밀번호 확인을 입력해주세요."); }
        if(pw1 != pw2){ $('#userPWConfirm').focus(); return showToastW("비밀번호와 비밀번호확인이 일치하지 않습니다."); }

        let _data = $('form[name="authForm"]').serializeObject();

        $.ajax({
            type : "POST",
            url  : "/system/user/User.do",
            data : {
                task: 'proc',
                mode: 'updatePW',
                data: _data,
            }
        }).done(function(data){
            if(data.resultCode.substring(0,1) != "I"){ showToastFromAjax(data); return;}
            showToastI("비밀번호가 변경되었습니다.");

            $('.backdrop').removeClass('open');
            $('.mod_user_info').removeClass('open');
        }).fail(function(data){
            showToastE("통신에 문제가 있습니다.");
            if(isFunc(func_fail)){func_fail(data);}
        });
    });

    /* navbar Show/Hide */
    $('#navbarShowHide').on('click', function(){
        $('body').toggleClass('overlay-open');

        if($('body').hasClass('overlay-open')){
            $('section.content').css({'margin':'50px 0px 0px 225px', 'transition':'.5s'});
            $('#leftsidebar').css({'margin-left':'0'});
            localStorage.setItem("navbarShowHide", 'show')
        }else{
            $('section.content').css({'margin':'50px 0px 0px 0px', 'transition':'.5s'});
            $('#leftsidebar').css({'margin-left':'-300px'});
            localStorage.setItem("navbarShowHide", 'hide')
        }
    });
    // if(localStorage.getItem("navbarShowHide") == 'hide'){
    //     $('#navbarShowHide').trigger('click');
    // }

    /* mobile - navbar default hide */
    if(g_isMobile == "true" && $(window).width() < 1024){
        $('#navbarShowHide').trigger('click');
        $('.button_area, .button_area2').addClass('hidden');
        $('.search_area').css('margin-top', '15px');
        $('.table_wrapper').css('margin-top', '45px');
        $('.mobile_wrapper').css('margin-top', '20px');
//		$('#btnCtrlGroup')
    }else{
        if($('.button_area').hasClass('hidden')){
            $('.button_area').removeClass('hidden');
            $('.search_area').css('margin-top', '0px');
            $('.table_wrapper').css('margin-top', '0px');
        }
    }

    /* full screen */
    const docV = document.documentElement;
    $('#btnFullScreen').on('click', function(){
        if(docV.requestFullscreen){
            docV.requestFullscreen();
        }else if(docV.webkitRequestFullscreen){
            docV.webkitRequestFullscreen();
        }else if(docV.mozRequestFullscreen){
            docV.mozRequestFullscreen();
        }else if(docV.msRequestFullscreen){
            docV.msRequestFullscreen()
        }
    });
    /* close full screen */
    $('#btnCloseFullScreen').on('click', function(){
        if(document.exitFullscreen){
            document.exitFullscreen();
        }else if(document.webkitCancelFullScreen){
            document.webkitCancelFullScreen();
        }else if(document.mozCancelFullScreen){
            document.mozCancelFullScreen();
        }else if(document.msCancelFullScreen){
            document.msCancelFullScreen()
        }
    });

    $(window).resize(function(){
        if(window.innerHeight == screen.height){
            $('#btnCloseFullScreen').removeClass('hidden');
            $('#btnFullScreen').addClass('hidden');
        }else{
            $('#btnCloseFullScreen').addClass('hidden');
            $('#btnFullScreen').removeClass('hidden');
        }
    });
});
