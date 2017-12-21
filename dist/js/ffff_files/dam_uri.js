(function ($) {

// Store our function as a property of Drupal.behaviors.
    Drupal.behaviors.damuri = {
        attach: function (context, settings) {

            $(".dam-uri-search").click(function() {
                // Get the parent fieldset ID for later update
                if($("#dam-uri-search-form-wrapper") !== null) {
                    closeWindow();
                }
                var tarted_parent_id = $(this).parents('fieldset').attr('id');
                //console.log(tarted_parent_id);

                var targetForm = $(this).parent(".form-wrapper");
                openWindow();
                //$('#dam-uri-search-form-wrapper').append(Drupal.theme('solrform', 'black', 135, 42));
                //$.get('/dam-uri/solr-search/form', null, formDetail);

                $('#dam-uri-search-form-wrapper').load("/dam-uri/solr-search/form", function () {
                    // Do search auto
                    $(this).find('#dam-uri-keyword').on('keyup', function () {
                        if($('#dam-uri-keyword').val().length > 3) {
                            makeRequest(tarted_parent_id);
                        }
                    });
                    // Do search on click
                    $(this).find('#dam-uri-keyword-search').on('click', function () {
                        if($('#dam-uri-keyword').val().length > 3) {
                            makeRequest(tarted_parent_id);
                        }
                    });

                    $(this).find(".dam-uri-search-close").on('click', function () {
                        closeWindow();
                    });
                });
                // Animation complete.
            });

        }
    };

    var formDetail = function(response) {
        $('#dam-uri-search-form-wrapper').html(response.data);
    }

    var makeRequest =  function(target){
        var params = $('#dam-form-search-filter-form').serialize();
        $.get("/dam-uri/solr-search/query", params, function (data){
            $("#dam-uri-keyword-query-results").html(data);
            $('#dam-uri-keyword-query-results tr .dam_uri_search_result_text').on('click', function () {
                updateFields(this, target);
            });
        });
    }

    var openWindow = function () {
        $("body").append('<div id="dam-uri-search-form-wrapper"></div>');
    }

    var updateFields = function (source, target) {
        // Populate Target field with content
        if (typeof console !== "undefined"){
            console.log('Clicked form result');
        }
        var asset_id = $(source).attr('data-asset-id');
        var asset_url = $(source).attr('data-asset-uri');
        var asset_title = $(source).attr('data-asset-title');
        var asset_caption = $(source).attr('data-asset-caption');
        var asset_thumbnail = $(source).attr('data-asset-thumbnail');
        // console.log(asset_id);
        // console.log(asset_url);
        // console.log(asset_title);
        // console.log(asset_caption);
        // console.log(asset_thumbnail);
        $('#' + target + '-id').val(asset_id);
        $('#' + target + '-url').val(asset_url);
        $('#' + target + '-alt').val(asset_title);
        $('#' + target + '-caption').val(asset_caption);
        $('#' + target + '-thumbnail').val(asset_thumbnail);
    }

    var closeWindow = function () {
        $( "#dam-uri-search-form-wrapper" ).slideDown('slow', function () {
            $(this).remove();
        });
    }

})(jQuery);