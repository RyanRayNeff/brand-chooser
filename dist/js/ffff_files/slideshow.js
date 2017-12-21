(function ($) {
  Drupal.behaviors.dam_slideshow = {
    attach: function (context, settings) {
      jQuery("[vid-url]").click(function(){
        jQuery(this).replaceWith('<object class="' + jQuery(this).attr('class') + '" width="' + jQuery(this).attr('vid-width') 
          + '" height="' + jQuery(this).attr('vid-height') + '" data="' + jQuery(this).attr('vid-url') + '"></object>');
      });
    }
  };
}(jQuery));
