"use strict";

//Self Invoking Function on WINDOW LOAD
(window.onload = function main(){ 
    setupStars();
    setupCharCtr();
});
/**
 * Initalizes several event listeners and events for the star rating system
 */
function setupStars(){
    //Selected ensures that the rating does not reset after a mouseclick
    let selected = false;
    let stars = document.getElementById("stars");
    let rating = 0;
    //On hover, selected is reset, the hovered star and its previous siblings are highlighted as well
    stars.addEventListener('mouseover', function (e) {
        selected = false;
        rating = e.target.alt;
        if (e.target.nodeName.toLowerCase() == 'img') {
            e.target.src = "./bw_star2.png"
            //Acquire the previous element image
            let previousStar = e.target.previousElementSibling;
            //If more preceding stars exist, the loop will continue
            for(let i = e.target.alt; i>1;i--){
                previousStar.src = "./bw_star2.png";
                previousStar = previousStar.previousElementSibling;
            }
        }
        if(rating){
            document.getElementById("rating").value = "" + rating + " stars";
        }
        
    });
    //On mouseout, the stars are reset to their original color if no rating was selected
    stars.addEventListener('mouseout', function (e) {
        if (selected == false && e.target.nodeName.toLowerCase() == 'img') {
            e.target.src = "./bw_star.png"
            let previousStar = e.target.previousElementSibling;
            for(let i = e.target.alt; i>1;i--){
                previousStar.src = "./bw_star.png";
                previousStar = previousStar.previousElementSibling;
            }
            rating = 0;
        }
    });
    //On mouseclick, set the selected boolean to true, preventing a color reset
    stars.addEventListener('click', function (e) {
        if (e.target.nodeName.toLowerCase() == 'img') {
            selected = true;
            rating = e.target.alt;
         }
    });
}
/**
 * Initalizes an event to update the character counter on each keypress
 */
function setupCharCtr(){
    let comment = document.getElementById("comment");
    comment.addEventListener('keyup', function(e){
    let commentWords = comment.value;
    //let commentText = comment.value.length;
    let count = commentWords.trim().split(/\s+/).length;
    
    document.getElementById("wordCount").value = count;
    //document.getElementById("wordCount").value = commentText+ "/1000";
    });

}