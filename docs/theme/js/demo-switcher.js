'use strict';

$(document).ready(function() {
  var navbarSwitch = $('.page-header .navbar-default');
  $('#headerOption').find('a').on('click', function(e) {
    e.preventDefault();
    var colorFill = $(this).attr('data-path');
    var headerSkin = navbarSwitch.attr('data-skin');

    navbarSwitch.attr('data-skin', colorFill);
    navbarSwitch.removeClass(headerSkin).addClass(colorFill);
  });

  $('#themeOption').find('a').on('click', function(e) {
    e.preventDefault();
    var classEl = $(this).attr('class');
    var colorFill = $(this).attr('data-path');

    $('#skinSwitcher').attr('href', colorFill);
    $('#headerOption').find('a[data-select]').attr('class', classEl);
  });

  // on-off
  $('#themePanel').on('click', '.theme-config', function() {
    if ($('#themePanel').hasClass('active')) {
      $('#themePanel').removeClass('active');
    } else {
      $('#themePanel').addClass('active');
    }
  });

  // bind keyup
  $(document).on('keyup', function(e) {
    if (e.keyCode === 27) {
      if ($('#themePanel').hasClass('active')) {
        $('#themePanel').removeClass('active');
      }
    }
  });
});
