$(document).ready(function () {

    $(".loading").addClass("d-none")
    const players = Plyr.setup('.player', {
        seekTime: 5,
        autopause: true
    });
    $('.plyr__control--overlaid').click(function () {
        $(this).parent().find(".plyr__controls>button:first-child").focus();
    });
    $('.plyr__poster').click(function () {
        $(this).parent().parent().find(".plyr__controls>button:first-child").focus();
    });


    async function start() {
        if (document.body.offsetWidth < 770) {
            await screen.orientation.lock("landscape");
        }
    }
    async function end() {
        screen.orientation.unlock()
    }
    var fullscreentest = 0
    $('.plyr__controls>.plyr__control:last-child').click(function () {
        if (fullscreentest == 0) {
            start();
            fullscreentest = 1
        } else {
            end();
            fullscreentest = 0
        }
    });
    $(".plyr__poster").dblclick(function () {
        setTimeout(() => {
            if (fullscreentest == 0) {
                start();
                fullscreentest = 1
            } else {
                end();
                fullscreentest = 0
            }
        }, 100);
    });

    if (document.addEventListener) {
        document.addEventListener('fullscreenchange', exitHandler, false);
        document.addEventListener('mozfullscreenchange', exitHandler, false);
        document.addEventListener('MSFullscreenChange', exitHandler, false);
        document.addEventListener('webkitfullscreenchange', exitHandler, false);
    }

    function exitHandler() {
        if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            end();
            fullscreentest = 0
        }
    }
});

$(function () {
    $(".menu-link").click(function () {
        $(".menu-link").removeClass("is-active");
        $(this).addClass("is-active");
    });
});

$(function () {
    $(".main-header-link").click(function () {
        $(".main-header-link").removeClass("is-active");
        $(this).addClass("is-active");
    });
});

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach(dropdown => {
    dropdown.addEventListener("click", e => {
        e.stopPropagation();
        dropdowns.forEach(c => c.classList.remove("is-active"));
        dropdown.classList.add("is-active");
    });
});

$(".search-bar input").
focus(function () {
    $(".header").addClass("wide");
}).
blur(function () {
    $(".header").removeClass("wide");
});

$(document).click(function (e) {
    var container = $(".status-button");
    var dd = $(".dropdown");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        dd.removeClass("is-active");
    }
});

$(function () {
    $(".dropdown").on("click", function (e) {
        $(".content-wrapper").addClass("overlay");
        e.stopPropagation();
    });
    $(document).on("click", function (e) {
        if ($(e.target).is(".dropdown") === false) {
            $(".content-wrapper").removeClass("overlay");
        }
    });
});


$(".post .heart-button").click(function () {
    $(this).toggleClass("active");
});

$(".post .post-content .reactions_num .heart-button").click(function () {
    $(this).parent().parent().parent().find('.reactions .heart-button').toggleClass("active");
});
$(".post .reactions .heart-button").click(function () {
    $(this).parent().parent().find('.post-content .reactions_num .heart-button').toggleClass("active");
});

let reactions_show = localStorage.getItem('reactions');

$(".reactions_show_btn").click(function () {
    if ($(this).find('.react_check').prop('checked')) {
        localStorage.removeItem('reactions', 'show');
        $(".react_show").removeClass("d-none");
        $(".react_hide").addClass("d-none");
        $(".post .post-content .reactions_num").removeClass("reactions_show");
        $(".post .post-content .reactions_num").removeClass("reactions_show_fast");
        $(this).find('.react_check').prop('checked', false);
    } else {
        localStorage.setItem('reactions', 'show');
        $(".react_show").addClass("d-none");
        $(".react_hide").removeClass("d-none");
        $(".post .post-content .reactions_num").addClass("reactions_show");
        $(".post .post-content .reactions_num").removeClass("reactions_show_fast");
        $(this).find('.react_check').prop('checked', true);
    }

});
if (reactions_show === 'show') {
    $(".reactions_show_btn").click()
    $(".post .post-content .reactions_num").addClass("reactions_show_fast");
}

$(".post .reactions .heart-button").click(function () {
    let clicks = $(this).parent().parent().find('.post-content .reactions_num .heart-button .love_num').text();
    if ($(this).find('.react_pls').prop('checked')) {
        clicks--;
        $(this).parent().parent().find('.post-content .reactions_num .heart-button .love_num').text(clicks);
        $(this).parent().parent().find('.post-statistics .love_num').text(clicks);
        $(this).find('.react_pls').prop('checked', false);
    } else {
        clicks++;
        $(this).parent().parent().find('.post-content .reactions_num .heart-button .love_num').text(clicks);
        $(this).parent().parent().find('.post-statistics .love_num').text(clicks);
        $(this).find('.react_pls').prop('checked', true);
    }
});

$(".post .post-content .reactions_num .heart-button").click(function () {
    let clicks = $(this).find('.love_num').text();
    if ($(this).parent().parent().parent().find('.reactions .heart-button .react_pls').prop('checked')) {
        clicks--;
        $(this).find('.love_num').text(clicks);
        $(this).parent().parent().parent().find('.post-statistics .love_num').text(clicks);
        $(this).parent().parent().parent().find('.reactions .heart-button .react_pls').prop('checked', false);
    } else {
        clicks++;
        $(this).find('.love_num').text(clicks);
        $(this).parent().parent().parent().find('.post-statistics .love_num').text(clicks);
        $(this).parent().parent().parent().find('.reactions .heart-button .react_pls').prop('checked', true);
    }
});
$('.reactions .reactions_box.comment_btn').click(function () {
    $(this).parent().addClass('reaction_pading');
    $(this).parent().parent().parent().find('.write_comment').show();
    $(this).parent().parent().parent().find('.write_comment .what-do-user-name input').focus();
    $(this).parent().parent().parent().find('>.comments').show();
    $(this).parent().parent().parent().find('>.comments .comment_box:first-child').show();
    if ($(this).parent().parent().parent().find('>.comments>.comment_box:hidden').length > 0) {
        $(this).parent().parent().parent().find('.show_more_comments').show();
    }
});
$('.post .comments .reply_box .reply_reactions .reply_btn').click(function () {
    $(this).parent().parent().find('.reply .write_reply').show();
    $(this).parent().parent().find('.reply .write_reply .what-do-user-name input').focus();
    $(this).parent().parent().find('.comments').show();
    $(this).parent().parent().find('.comments .comment_box:first-child').show();
    if ($(this).parent().parent().find('.comments .comment_box:hidden').length > 0) {
        $(this).parent().parent().find('.reply .show_more_replys').show();
    }
});
$('.post .comments .reply_box .reply .show_more_replys').click(function () {
    $(this).parent().find('.comments .comment_box:hidden').slice(0, 5).show();
    if ($(this).parent().find('.comments .comment_box:hidden').length == 0) {
        $(this).hide();
    }
});
$('.post .show_more_comments').click(function () {
    $(this).parent().find('>.comments>.comment_box:hidden').slice(0, 5).show();
    if ($(this).parent().find('>.comments>.comment_box:hidden').length == 0) {
        $(this).hide();
    }
});

$('.post .comments .reply_box .love_btn').click(function () {
    $(this).toggleClass('loved')
});
$('.menu-items .profile-menu-link').click(function (e) {
    e.preventDefault();
});

$(".job_link").mouseenter(function () {
    $(".jox_box").fadeIn();
    $(".jox_box h1").text($(this).find("p").text());

});
$(".job_link").mouseleave(function () {
    $(".jox_box").hide();
});
$(".jox_box").mouseenter(function () {
    $(".jox_box").hide();
});
$(".right-side").mouseenter(function () {
    $(".jox_box").hide();
});


$('.post ').each(function () {
    var imglength = $(this).find('.post_bg .post-content .post_img_box .zoom_in_box img').length;
    var imgsrc = $(this).find('.post_bg .post-content .post_img_box .post_img').attr('src');
    var imgh = $(this).find('.post_bg .post-content .post_img_box .zoom_in_box img:first-child').height();
    var imgw = $(this).find('.post_bg .post-content .post_img_box .zoom_in_box img:first-child').width();
    if (imglength == 0) {
        $(this).addClass("just_text");
    }
    if (imglength == 1) {
        if (imgsrc == "") {
            $(this).addClass("just_text");
        }
    }
    if (imglength > 1) {
        $(this).find('.post_bg .post-content .post_img_box').addClass("img_flex");
        for (let i = 0; i < $(this).find('.post_bg .post-content .post_img_box .post_img').length; i++) {
            var imgsrc_test = $(this).find(`.post_bg .post-content .post_img_box .post_img:nth-child(${i + 1})`).attr('src');
            if (imgsrc_test == "") {
                $(this).find(`.post_bg .post-content .post_img_box .post_img:nth-child(${i + 1})`).attr('src', "images/NoImageFound.png")
            }
        }
        if (imglength == 2) {
            if (imgw < imgh) {
                $(this).find('.post_bg .post-content .post_img_box').addClass("img_flex2_width");
            } else {
                $(this).find('.post_bg .post-content .post_img_box').addClass("img_flex2_height");
            }
        }
        if (imglength == 3) {
            if (imgw < imgh) {
                $(this).find('.post_bg .post-content .post_img_box').addClass("img_flex3_width");
            } else {
                $(this).find('.post_bg .post-content .post_img_box').addClass("img_flex3_height");
            }
        }
        if (imglength == 4) {
            if (imgw < imgh) {
                $(this).find('.post_bg .post-content .post_img_box').addClass("img_flex4_width");
            } else {
                $(this).find('.post_bg .post-content .post_img_box').addClass("img_flex4_height");
            }

        }
        if (imglength == 5) {
            $(this).find('.post_bg .post-content .post_img_box').addClass("img_flex5_width");
        }
        if (imglength > 5) {
            $(this).find(".post-content .post_img_box .seemore_box").addClass("seemore").removeClass("seemore_box");
            $(this).find('.post_bg .post-content .post_img_box').addClass("img_flex5_width");
            $(this).find('.post_bg .post-content .post_img_box .seemore p .morenum').text(imglength - 5);
            if (imglength == 6) {
                $(this).find('.post_bg .post-content .post_img_box .seemore p .moretext').text(" More Image");
            }
        }
    }
});




var imgsrc
var imgw
var imgh
$('.post_img').click(function () {
    extraArr = [];

    for (let i = 0; i < $(this).parent().find('.zoom_in_box img').length; i++) {
        imgsrc = $(this).parent().find(`.zoom_in_box img:nth-child(${i + 1})`).attr('src');
        imgw = $(this).parent().find(`.zoom_in_box img:nth-child(${i + 1})`).width();
        imgh = $(this).parent().find(`.zoom_in_box img:nth-child(${i + 1})`).height();
        extraArr.push({
            src: imgsrc,
            w: imgw * 1.5,
            h: imgh * 1.5
        })

    }
    setTimeout(() => {
        openPhotoSwipe();
    }, 1);


});
$('.seemore').click(function () {
    extraArr = [];

    for (let i = 0; i < $(this).parent().find('.zoom_in_box img').length; i++) {
        imgsrc = $(this).parent().find(`.zoom_in_box img:nth-child(${i + 1})`).attr('src');
        imgw = $(this).parent().find(`.zoom_in_box img:nth-child(${i + 1})`).width();
        imgh = $(this).parent().find(`.zoom_in_box img:nth-child(${i + 1})`).height();
        extraArr.push({
            src: imgsrc,
            w: imgw * 1.5,
            h: imgh * 1.5
        })

    }
    setTimeout(() => {
        openPhotoSwipe();
    }, 1);
});
$('.post_img:nth-child(2)').click(function () {
    setTimeout(() => {
        $(".pswp__button--arrow--right").click()
    }, 1);
});
// $('.post_img:nth-child(3)').click(function () {
//     setTimeout(() => {
//         $(".pswp__button--arrow--right").click()
//         setTimeout(() => {
//             $(".pswp__button--arrow--right").click()
//         }, 30);
//     }, 1);
// });

var openPhotoSwipe = function () {
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array

    var items = [
        ...extraArr
    ];

    // define options (if needed)
    var options = {
        // history & focus options are disabled on CodePen        
        history: false,
        focus: false,
        closeOnScroll: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0
    };

    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
};