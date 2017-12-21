jQuery(document).ready(function(){
  // This enables scrolling to on-page anchors
  var hashTagActive = "";
    jQuery("#fluke-product-display-manuals a").click(function (event) {
        if(hashTagActive != this.hash) { //this will prevent if the user click several times the same link to freeze the scroll.
            event.preventDefault();
            //calculate destination place
            var dest = 0;
            if (jQuery(this.hash).offset().top > jQuery(document).height() - jQuery(window).height()) {
                dest = (jQuery(document).height() - jQuery(window).height()) - 100;
            } else {
                dest = jQuery(this.hash).offset().top - 100;
            }
            //go to destination
            jQuery('html,body').animate({
                scrollTop: dest
            }, 500, 'swing');
            //hashTagActive = this.hash; this was removed, because the second time a link was clicked, it would go to the wrong place.
            var hashTagActive = "";
        }
    });
});