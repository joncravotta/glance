
  // body...
$(".button").one( "click",function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(weather);
    console.log("sucess click");
  } else {
    alert("Geolocation is not supported by this browser.");
  }
runFunctions();
});

function runFunctions(){
  topWorldNews();
  topNationalNews();
  topSportsNews();
  topAnimation();
}

function topWorldNews() {
  $.ajax({
    url: "http://api.nytimes.com/svc/topstories/v1/world.json?api-key=3c19601928c9961fe256456846398b89:11:72836492",
    success: function(worldNews) {
      // displayInfo(result);
      displayWorldNews(worldNews);
    },
  });
}

function topNationalNews() {
  $.ajax({
    url: "http://api.nytimes.com/svc/topstories/v1/national.json?api-key=3c19601928c9961fe256456846398b89:11:72836492",
    success: function(nationNews) {
      // displayInfo(result);
      displayNational(nationNews);
    },
  });
}

function topSportsNews() {
  $.ajax({
    url: "http://api.nytimes.com/svc/topstories/v1/sports.json?api-key=3c19601928c9961fe256456846398b89:11:72836492",
    success: function(sportsNews) {
      // displayInfo(result);
      displaySports(sportsNews);
      console.log(sportsNews);
    },
  });
}

function imageLogic (imageUrl){
  if (imageUrl === ""){
   return " ";
  }
  else if (typeof imageUrl[1] === "undefined") {
      return '<img class="news-image"src="'+imageUrl[0].url+'"/>';
  }
  else if (typeof imageUrl[2] === "undefined") {
      return '<img class="news-image"src="'+imageUrl[1].url+'"/>';
  }
  else if (typeof imageUrl[3] === "undefined") {
      return '<img class="news-image"src="'+imageUrl[2].url+'"/>';
  }
  else {
    return '<img class="news-image"src="'+imageUrl[3].url+'"/>';
  }
}

function displayWorldNews(data) {
  $(".news-headline-heading-container-world").append('<div class="news-headline-heading">World News</div><div class="border-blue"></div>');
  for (var i = 0; i < data.results.length && i < 7; i++) {
    var title = data.results[i].title;
    var date = data.results[i].published_date;
    var desc = data.results[i].abstract;
    var link = data.results[i].url;
    var img = imageLogic(data.results[i].multimedia);
    $(".news-headline-content-world").append('<div class="news-headline"><a target="_blank" href="' + link + '">' + title + '</a></div>' + img + '<div class="news-headline-desc">' + desc + '</div>' + '<div class="news-headline-sub">' + date + '</div>');
  }
}

function displayNational(data) {
  $(".news-headline-heading-container-national").append('<div class="news-headline-heading">National News</div><div class="border-blue"></div>');
  for (var i = 0; i < data.results.length && i < 7; i++) {
    var title = data.results[i].title;
    var date = data.results[i].published_date;
    var desc = data.results[i].abstract;
    var link = data.results[i].url;
    var img = imageLogic(data.results[i].multimedia);
    $(".news-headline-content-national").append('<div class="news-headline"><a target="_blank" href="'+link+'">' + title + '</a></div>' + img + '<div class="news-headline-desc">' + desc + '</div>' + '<div class="news-headline-sub">' + date + '</div>');
  }
}

function displaySports(data) {
  $(".news-headline-heading-container-sports").append('<div class="news-headline-heading">Sports News</div><div class="border-blue"></div>');
  for (var i = 0; i < data.results.length && i < 7; i++) {
    var title = data.results[i].title;
    var date = data.results[i].published_date;
    var desc = data.results[i].abstract;
    var link = data.results[i].url;
    var img = imageLogic(data.results[i].multimedia);
    $(".news-headline-content-sports").append('<div class="news-headline"><a target="_blank" href="' + link + '">' + title + '</a></div>' + img + '<div class="news-headline-desc">' + desc + '</div>' + '<div class="news-headline-sub">' + date + '</div>');
  }
}

function weather(position) {
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+position.coords.latitude +"&lon="+position.coords.longitude+"&units=imperial&cnt=5&APPID=f83f0a1199b07ddb4d0fd131f183721f",
    success: function(result) {
      displayInfo(result);
      console.log(result);
    },
  });
}

function displayInfo(data) {
  $(".news-headline-heading-container-weather").append('<div class="news-headline-heading">Weather</div><div class="border-blue"></div>');
  for (var i = 0; i < data.list.length && i <= 5; i++) {
    var weather = data.list[i].weather[0].description;
    var temp = data.list[i].temp.day.toFixed();
    console.log(temp);
    var utc = data.list[i].dt;
    var date = dateConversion(utc);
    var icon = data.list[i].weather[0].icon;
    var iconImage = "<img src='http://openweathermap.org/img/w/" + icon + ".png'/>";
    console.log(iconImage);
    $(".weather-section").append('<div class="weather-day"><span class="weather-img">' + iconImage + '</span><span class="day">' + date + '</span><span class="weather-desc">' + weather + '</span><span class="temp">' + temp + "&deg;" + '</span></div>');
  }
}

function dateConversion(date) {
  var d = new Date(date*1000);
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var n = weekday[d.getUTCDay()];
  return n;
}
//when hero button is clicked makes her smaller
function topAnimation(){
  $('.heading').animate({
    "height":"50vh"
},
{duration: 2000});
}

$(window).scroll(function() {
  /* Check the location of each desired element */
  $('.news-headline, .news-headline-sub, .news-headline-desc, .news-image, .nav').each(function(i) {
    var bottom_of_object = $(this).offset().top + $(this).outerHeight()-40;
    var bottom_of_window = $(window).scrollTop() + $(window).height();
    /* If the object is completely visible in the window, fade it it */
    if (bottom_of_window > bottom_of_object) {
      $(this).animate({
        'opacity': '1'
      }, 800);
    }
    if ($(window).scrollTop() > 345) {
        $('.nav').css('position', 'fixed');
    }
    if ($(window).scrollTop() < 345) {
        $('.nav').css('position', 'relative');
    }
  });


});


$( document ).ready(function() {
var words = new Array('town','office','water cooler', 'school', 'bathroom','hallway','building');
var i = 0;
setInterval( function(){
    $( '.dek2' ).empty().append( "Rule the talk of the "+words[ i ]+"." );
    if( i < words.length-1 ) {
        i++;
    } else {
        i = 0;
    }
},1000 );
//scroll when click nav link
$('li').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 1000);
    return false;
});
});
