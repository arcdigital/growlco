
if(!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
  var retina = window.devicePixelRatio > 1;
  var initialPhoneTopPosition = 50, winHeight, iphone, phoneHeight, scale = "", themesWrapperTop, themesWrapper =  $("div.themes-wrapper"),
  colors = ["7db3b8", "df6e51", "005670", "87cbd8", "b9ce6c", "cc545a"], themeIndex = 1,i, slidesWrapper = $(".iphone-wrapper .slides");

  $("div.section .iphone-wrapper").remove();
  var resizing = false;
  var calculate = function() {
    winHeight = $(window).height();
    phoneHeight = iphone.height();

    console.log(winHeight + " " + phoneHeight + " " + retina);
    if (phoneHeight > winHeight) {
      scale = " scale(0.8)";
      iphone.css({
        "-webkit-transform":"scale(0.8)",
        "transform":"scale(0.8)"
      })
      phoneHeight = phoneHeight*0.8;

      initialPhoneTopPosition = winHeight/2 - phoneHeight*0.62;
      iphone.css("margin-top", initialPhoneTopPosition);
    } else {
      initialPhoneTopPosition = winHeight/2 - phoneHeight/2;
      iphone.css("margin-top", initialPhoneTopPosition);
    }


    $("div.section.page4 .body").height(winHeight - 100);

    themesWrapper.css("margin-top",winHeight/2-316/2);
  }
  $(window).resize(function(event) {

    resizing = true;
    $(".iphone-wrapper").css({
      "margin-left":"50px"
    })
    $("ul.bullets .active").removeClass("active");
    $("ul.bullets .first").addClass("active");
    $("div.arrow").show();
    $(".iphone-wrapper img.active").hide();
    $(".iphone-wrapper img.first").show();
    $(".themes-wrapper").hide();
    $(".page6 .footer").removeAttr("style")
    $.fn.fullpage.moveTo(1);
    calculate();
    $(".section.page1 .inner").show();
    setTimeout(function() {
      resizing = false
    }, 1000);

  })
  var resetColorThemes = function() {

    if (themeIndex == 0) {
      themesWrapper.find(".fifth").css("background-color", "#"+colors[4]);
      themesWrapper.find(".fourth").css("background-color", "#"+colors[3]);
      themesWrapper.find(".third").css("background-color", "#"+colors[2]);
      themesWrapper.find(".second").css("background-color", "#"+colors[1]);
      themesWrapper.find(".first").css("background-color", "#"+colors[0]);
    }
    if (themeIndex == 1) {
      themesWrapper.find(".fifth").css("background-color", "#"+colors[5]);
      themesWrapper.find(".fourth").css("background-color", "#"+colors[4]);
      themesWrapper.find(".third").css("background-color", "#"+colors[3]);
      themesWrapper.find(".second").css("background-color", "#"+colors[2]);
      themesWrapper.find(".first").css("background-color", "#"+colors[1]);
    }
    if (themeIndex == 2) {
      themesWrapper.find(".fifth").css("background-color", "#"+colors[0]);
      themesWrapper.find(".fourth").css("background-color", "#"+colors[5]);
      themesWrapper.find(".third").css("background-color", "#"+colors[4]);
      themesWrapper.find(".second").css("background-color", "#"+colors[3]);
      themesWrapper.find(".first").css("background-color", "#"+colors[2]);
    }
    if (themeIndex == 3) {
      themesWrapper.find(".fifth").css("background-color", "#"+colors[1]);
      themesWrapper.find(".fourth").css("background-color", "#"+colors[0]);
      themesWrapper.find(".third").css("background-color", "#"+colors[5]);
      themesWrapper.find(".second").css("background-color", "#"+colors[4]);
      themesWrapper.find(".first").css("background-color", "#"+colors[3]);
    }
    if (themeIndex == 4) {
      themesWrapper.find(".fifth").css("background-color", "#"+colors[2]);
      themesWrapper.find(".fourth").css("background-color", "#"+colors[1]);
      themesWrapper.find(".third").css("background-color", "#"+colors[0]);
      themesWrapper.find(".second").css("background-color", "#"+colors[5]);
      themesWrapper.find(".first").css("background-color", "#"+colors[4]);
    }
    if (themeIndex == 5) {
      themesWrapper.find(".fifth").css("background-color", "#"+colors[3]);
      themesWrapper.find(".fourth").css("background-color", "#"+colors[2]);
      themesWrapper.find(".third").css("background-color", "#"+colors[1]);
      themesWrapper.find(".second").css("background-color", "#"+colors[0]);
      themesWrapper.find(".first").css("background-color", "#"+colors[5]);
    }
    themeIndex++;
    if (themeIndex  >= colors.length) {
      themeIndex = 0;
    }
  }
  var showNextTheme = function() {

    var now = new Date().getTime();

    if (now - lastThemeShowedAt > 2000) {
      lastThemeShowedAt = new Date().getTime();
      if (themesWrapper.is(":visible")) {
        slidesWrapper.css("background-color", "#"+colors[themeIndex]);

        themesWrapper.find(".first").animate({"margin-left": "-160px"}, function() {
          $(this).css("margin-left","30px");

          resetColorThemes();

        })

      }
    }

    setTimeout(showNextTheme, 2000);
  }
  resetColorThemes();
  $.fn.animateRotate = function(angle, duration, reverse) {
    var args = $.speed(duration);
    var step = args.step;

    return this.each(function(i, e) {
      args.step = function(now) {

        if (reverse)
          now = 90 - now;
        $.style(e, 'transform', 'rotate(' + now + 'deg)' + scale);
        if (step) return step.apply(this, arguments);
      };

      $({deg: 0}).animate({deg: angle}, args);
    });
  };
  var lastThemeShowedAt = 0;
  $(document).ready(function() {
    iphone = $("div.iphone-wrapper");
    calculate();
    $.fn.fullpage({
      verticalCentered: true,
      scrollingSpeed: 700,
      easing: 'easeInQuart',

      onLeave: function(index, direction){
        if (resizing) return false;
        if ((index === 1) && (direction === "down")) {
          //$("div.arrow").fadeOut(300);
          $("div.arrow").animate({
            "opacity":"toggle",
            "bottom":"0px"
          }, 300);
          $("ul.bullets li.active").removeClass("active");
          $("ul.bullets li.second").addClass("active");
          $("div.section.page1 .body .inner").fadeOut(700);
          $("div.section.page2 .body .inner").show();
          $("div.iphone-wrapper").animate({
            "margin-left":"450px"
          }, 700);
          $("div.iphone-wrapper img.first").fadeOut(700, function() {
            $(this).removeClass("active");
          })
          $("div.iphone-wrapper img.fifth").fadeIn(700, function() {
            $(this).addClass("active");
          })
          themesWrapper.delay(500).fadeIn(300, function() {
            showNextTheme();
            //	setTimeout(showNextTheme, 500);
          });
        }
        if ((index === 2) && (direction === "up")) {
          $("div.arrow").animate({
            "opacity":"toggle",
            "bottom":"20px"
          }, 300);
          $("ul.bullets li.active").removeClass("active");
          $("ul.bullets li.first").addClass("active");
          $("div.section.page1 .body .inner").show();
          $("div.section.page2 .body .inner").fadeOut(700);
          $("div.iphone-wrapper").animate({
            "margin-left":"50px"
          }, 700)

          $("div.iphone-wrapper img.first").fadeIn(700, function() {
            $(this).removeClass("active");
          })
          $("div.iphone-wrapper img.fifth").fadeOut(700, function() {
            $(this).addClass("active");
          })
          themesWrapper.fadeOut(300);

        }
        if ((index === 2) && (direction === "down")) {
          $("ul.bullets li.active").removeClass("active");
          $("ul.bullets li.third").addClass("active");
          $("div.section.page2 .body .inner").fadeOut(700);
          $("div.section.page3 .body .inner").show();
          $("div.iphone-wrapper").animateRotate(90, 700);
          //$("div.section.page2 .body .inner").fadeOut(700);
          $("div.iphone-wrapper").animate({
            "margin-left":"340px",
            "margin-top":(initialPhoneTopPosition-100) + "px"
          }, 700)
          themesWrapper.fadeOut(300);


          $("div.iphone-wrapper img.fifth").fadeOut(700, function() {
            $(this).removeClass("active");
          })
          $("div.iphone-wrapper img.third").fadeIn(700, function() {
            $(this).addClass("active");
          })
        }
        if ((index === 3) && (direction === "up")) {
          $("ul.bullets li.active").removeClass("active");
          $("ul.bullets li.second").addClass("active");
          $("div.section.page2 .body .inner").show();
          $("div.section.page3 .body .inner").fadeOut(700);
          $("div.iphone-wrapper").animateRotate(90, 700, true);
          //$("div.section.page2 .body .inner").fadeOut(700);
          $("div.iphone-wrapper").animate({
            "margin-left":"450px",
            "margin-top":initialPhoneTopPosition+"px"
          }, 700)


          themesWrapper.delay(500).fadeIn(300, function() {
            setTimeout(showNextTheme, 1000);
          });
          $("div.iphone-wrapper img.third").fadeOut(700, function() {
            $(this).removeClass("active");
          })
          $("div.iphone-wrapper img.fifth").fadeIn(700, function() {
            $(this).addClass("active");
          })
        }
        if ((index === 3) && (direction === "down")) {
          $("ul.bullets li.active").removeClass("active");
          $("ul.bullets li.fourth").addClass("active");
          $("div.section.page4 .body .inner").show();
          $("div.section.page3 .body .inner").fadeOut(700);
          $("div.iphone-wrapper").animateRotate(90, 700, true);
          //$("div.section.page2 .body .inner").fadeOut(700);
          $("div.iphone-wrapper").animate({
            "margin-top":(initialPhoneTopPosition+200) + "px"
          }, 700)


          $("div.iphone-wrapper img.third").fadeOut(700, function() {
            $(this).removeClass("active");
          })
          $("div.iphone-wrapper img.second").fadeIn(700, function() {
            $(this).addClass("active");
          })
        }
        if ((index === 4) && (direction === "up")) {
          $("ul.bullets li.active").removeClass("active");
          $("ul.bullets li.third").addClass("active");
          $("div.section.page3 .body .inner").show();
          $("div.section.page4 .body .inner").fadeOut(700);
          $("div.iphone-wrapper").animateRotate(90, 700);
          //$("div.section.page2 .body .inner").fadeOut(700);
          $("div.iphone-wrapper").animate({
            "margin-left":"340px",
            "margin-top":(initialPhoneTopPosition-100) + "px"
          }, 700)

          $("div.iphone-wrapper img.second").fadeOut(700, function() {
            $(this).removeClass("active");
          })
          $("div.iphone-wrapper img.third").fadeIn(700, function() {
            $(this).addClass("active");
          })
        }
        if ((index === 4) && (direction === "down")) {
          $("ul.bullets li.active").removeClass("active");
          $("ul.bullets li.fifth").addClass("active");
          $("div.section.page5 .body .inner").show();
          $("div.section.page4 .body .inner").fadeOut(700);
          //$("div.section.page2 .body .inner").fadeOut(700);
          $("div.iphone-wrapper").animate({
            "margin-left":"60px",
            "margin-top":initialPhoneTopPosition + "px"
          }, 700)

          $("div.iphone-wrapper img.second").fadeOut(700, function() {
            $(this).removeClass("active");
          })
          $("div.iphone-wrapper img.fourth").fadeIn(700, function() {
            // $(this).delay(500).animate({
            //   "margin-left":"-220px"
            // },400);
            $(this).addClass("active");
          })
        }
        if ((index === 5) && (direction === "up")) {
          $("ul.bullets li.active").removeClass("active");
          $("ul.bullets li.fourth").addClass("active");
          $("div.section.page4 .body .inner").show();
          $("div.section.page5 .body .inner").fadeOut(700);
          //$("div.section.page2 .body .inner").fadeOut(700);

          //$("div.section.page2 .body .inner").fadeOut(700);
          $("div.iphone-wrapper").animate({
            "margin-left":"340px",
            "margin-top":(initialPhoneTopPosition+200) + "px"
          }, 700)
          var that = $(this);
          $("div.iphone-wrapper img.fourth").animate({
            "margin-left":"0px"
          },400, function() {
            $("div.iphone-wrapper img.fourth").fadeOut(700, function() {
              that.removeClass("active");
            })
            $("div.iphone-wrapper img.second").fadeIn(700, function() {
              that.addClass("active");
            })
          });

        }
        if ((index === 5) && (direction === "down")) {
          $("ul.bullets li.active").removeClass("active");
          $("ul.bullets li.sixth").addClass("active");
          $("div.section.page6 .body .inner").show();
          $("div.section.page5 .body .inner").fadeOut(900);
          $("div.iphone-wrapper").animate({
            "margin-top":"-800px"
          }, 700, function() {
            $("div.footer").animate({
              "bottom":"0px"
            }, 300, "swing")
          })
        }
        if ((index === 6) && (direction === "up")) {
          $("ul.bullets li.active").removeClass("active");
          $("ul.bullets li.fifth").addClass("active");
          $("div.section.page5 .body .inner").show();
          $("div.section.page6 .body .inner").fadeOut(900);

          $("div.footer").animate({
            "bottom":"-220px"
          }, 300, "swing", function() {
            $("div.iphone-wrapper").animate({
              "margin-top":initialPhoneTopPosition + "px"
            }, 700, function() {
            })
          })
        }
      }
    });

    $("div.iphone-main-wrapper").prependTo("body").fadeIn(120);
  });
}
