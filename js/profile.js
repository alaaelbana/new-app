$(".profile-menu-link").click(function () {
    $(".profile_content").addClass("d-none");
    $(".images_box ,.content_box ,.videos_box").removeClass("page_show");
    $(".profile-menu-link").removeClass("active");
    $(this).addClass("active");
});
$(".main_page").click(function () {
    $(".profile_all").removeClass("d-none");
    $(".content_box").addClass("page_show");
});
$(".videos_page").click(function () {
    $(".videos").removeClass("d-none");
    $(".videos_box").addClass("page_show");
});
$(".images_page").click(function () {
    $(".images").removeClass("d-none");
    $(".images_box").addClass("page_show");
});


const toggleButton = document.querySelector('.dark-light');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

const allVideos = document.querySelectorAll('.video');

allVideos.forEach(v => {
    v.addEventListener('mouseover', () => {
        const video = v.querySelector('video');
        video.play();
    });
    v.addEventListener('mouseleave', () => {
        const video = v.querySelector('video');
        video.pause();
    });
});

$(".search-bar input").focus(function () {
    $(".header").addClass("wide");
}).blur(function () {
    $(".header").removeClass("wide");
});




function load_more() {
    $(".skills .skills_item").slice(0, 4).show();
    $(".hobbies .skills_item").slice(0, 3).show();
    $(".loadMoreskills").on('click', function (e) {
        e.preventDefault();
        $(".skills .skills_item:hidden").slice(0, 6).fadeIn();
        if ($(".skills .skills_item:hidden").length == 0) {
            $(".loadMoreskills").addClass("d-none")
        }
    });
    $(".loadMorehobbies").on('click', function (e) {
        e.preventDefault();
        $(".hobbies .skills_item:hidden").slice(0, 5).fadeIn();
        if ($(".hobbies .skills_item:hidden").length == 0) {
            $(".loadMorehobbies").addClass("d-none")
        }
    });
}
load_more();