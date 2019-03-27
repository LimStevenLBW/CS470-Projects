/*Steven Lim
    CECS 470 Ch 9 Project 2
    Part 3 of Lab Assignment 7
*/
document.addEventListener('DOMContentLoaded', function () {

    var thumbnails = document.getElementById("thumbnails");
    var figure = document.getElementById("featured");
    var figImage = document.querySelector("figure img[alt = 'big version']");
    var figCaption = document.querySelector("figure figcaption");


    thumbnails.addEventListener('click', function (e) {

        if (e.target && e.target.nodeName.toLowerCase() == 'img') {
            let imgSrc = e.target.getAttribute('src')
            let imgTitle = e.target.getAttribute('title');
            imgSrc = imgSrc.replace("small", "medium");
            figCaption.innerHTML = imgTitle;
            figImage.setAttribute("src", imgSrc);
            figImage.setAttribute("title", imgTitle);
        }

    });

    figure.addEventListener("mouseover", function (e) {
        if (e.target && e.target.nodeName.toLowerCase() == 'img') {
            figCaption.style.transition = "opacity 0.8s";
            figCaption.style.opacity = "0.8";
        }
    });

    figure.addEventListener("mouseout", function (e) {
        if (e.target && e.target.nodeName.toLowerCase() == 'img') {
            figCaption.style.transition = "opacity 0.8s";
            figCaption.style.opacity = "0";
        }
    });

});


