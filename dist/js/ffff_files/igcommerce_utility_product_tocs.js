(function ($) {
    'use strict';
    Drupal.behaviors.igcommerce_tocs = {
        attach: function (context, settings) {
            // Function to show all on the page
            var showAll = function (page) {
                if (typeof console !== "undefined"){
                    console.log(page.attr('class'));
                }
                page.find('.row').show();
            }

            var limitVisible = function() {
              $('.quicktabs-tabpage', context).on().each(function () {
                  var shown =  10;
                  var totalPages, previousPage, currentPage, nextPage, showNextHighestItemNumber, totalPagesFloat, last_visible_element, floatNumber;
                  var paginationLinks = '';
                  var currentPage = 1;
                  var tabContent = $(this);
                  tabContent.find('.row:lt('+ shown +')').show();
                  var items =  $(this).find('.row').size();
                  // Add total number of items
                  if (typeof console !== "undefined"){
                      var id = $(this).attr('id');
                      console.log("Div " + id + " has (" + items + ") total items");
                  }

                  if(items <= 10) {
                      totalPages = 1;
                  }
                  if (items > 1) {
                      $(this).find(".number_of_items").css("display", "inline-block");
                      $(this).find(".total_items").text(items);
                  }
                  if(items >= 11) {
                      totalPages = Math.ceil(items / 10);
                      totalPagesFloat = items / 10;
                      currentPage = 1;
                      nextPage = currentPage + 1;

                      // Get the decimal number
                      floatNumber = parseInt(totalPagesFloat.toString().split('.')[1]);
                      // Variable for default active state
                      //var active = '';
                      for (var i = 1; i < (totalPages + 1); i++) {
                          var active = (i == 1) ? " list_active_page" : "";
                          paginationLinks = paginationLinks + '<a href="#page:' + i + '" title="Page ' + i + '" rel="' + i + '" class="toc-page-link' + active + '">' + i + '</a>';
                      }
                      var showAll = Drupal.t('SHOW ALL');
                      paginationLinks = paginationLinks + '<span class="toc_show_all"><button value="Show All">' + showAll + '</button></span>';
                  }

                  // Add pagination
                  $(this).find('.pagination').html(paginationLinks);
                  // Add click function for each page number
                  $(this).on("click",  "a.toc-page-link",  function() {

                      if (typeof console !== "undefined"){
                          console.log("Total pages" + totalPages);
                          console.log("Total pages Float" + totalPagesFloat);
                          console.log("Page clicked: " + $(this).text());
                      }
                      showNextHighestItemNumber = $(this).text() * 10;
                      // Hide everything
                      tabContent.find('.row').hide();

                      // Get the last visible element
                      if (typeof(totalPages) != "undefined" && totalPages !== null) {
                          if (typeof console !== "undefined"){
                              console.log('Total Pages Set to: ' + totalPages);
                          }
                          // Then show the selected page content if divisible by 10
                          //if (showNextHighestItemNumber < items && (showNextHighestItemNumber / 10)  % 1 == 0) {
                          if (parseInt($(this).text()) === 1) {
                              tabContent.find('.row:lt(10)').show();
                          }
                          if ((showNextHighestItemNumber / 10)  % 1 == 0 && parseInt($(this).text()) > 1) {
                              var lastItem = $(this).parents('.quicktabs-tabpage').find('.row:visible:last');
                              var lowestNumberToShow = showNextHighestItemNumber - 10;
                              if (typeof console !== "undefined"){
                                  console.log('Showing index: ' + tabContent.find( ".row:nth-child("+ lowestNumberToShow +")").index() + ' - ' + tabContent.find( ".row:nth-child("+ showNextHighestItemNumber +")").index());
                              }
                              $(this).parents('.quicktabs-tabpage').find(".row:nth-child("+ lowestNumberToShow +")").nextUntil('.row:nth-child('+ (showNextHighestItemNumber + 1) +')' , "li.row" ).show();
                          }
                          // If we have reached the last set of items and the are less than ten
                          // Then get the last number and show down to the least number divisible by 10
                          if (totalPagesFloat % 1 != 0 && floatNumber < 10 && parseInt($(this).text()) === items) {
                              if (typeof console !== "undefined"){
                                  console.log('Total items to show last: ' + floatNumber);
                              }
                              $(this).parents('.quicktabs-tabpage').find('.row:nth-last-child(-n+' + floatNumber + ')').show();
                          }
                          currentPage = $(this).text();
                      }
                      $(this).parent().find(".toc-page-link").removeClass('list_active_page');
                      $(this).addClass('list_active_page');

                  });

                  // Click function to show all on the page
                  $(this).on("click",  "span.toc_show_all button",  function() {
                      showAll(tabContent);
                  });

                  //$('#toc-pager').html();
              });
            }

            limitVisible();

            // Sort accessories
            $("#selSort").on().change(function() {
                var sort_by_name = function(a, b) {
                    return a.innerHTML.toLowerCase().localeCompare(b.innerHTML.toLowerCase());
                }

                var list = $(".toc_product_item").get();
                list.sort(sort_by_name);
                for (var i = 0; i < list.length; i++) {
                    list[i].parentNode.appendChild(list[i]);
                }
            });

            // Search accessories function
            $("#searchKeyWords", context).on().keyup(function() {
              // Retrieve the input field text and reset the count to zero
              var filter = $(this).val(), count = 0;
                    // Loop through the products list
              // Check for older IE browser
              if (typeof console !== "undefined"){
              	console.log($(this).val().length);
              }
              if($(this).val().length > 2) {
                $(".toc_product_title").each(function(){

                    // If the list item does not contain the text phrase fade it out
                    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                        $(this).parents('.toc_product_item').fadeOut();

                    // Show the list item if the phrase matches and increase the count by 1
                    } else {
                        $(this).parents('.toc_product_item').show();
                        count++;
                    }
                });
              }

              // Update the count
              var numberItems = count;
              $("span.toc_total_products").text("(" + count + ")");
              limitVisible();


            });
        }
    }
}(jQuery));
