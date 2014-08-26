//initialize iframe
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//closure variable for access to other functions of user input
var inputGlobal = "";

//handle click event to hand off to GET request
$("#player").ready(function(){
  var query;
  $("button").on("click", function(){
    refreshPlayer();
    query = $("#search").val();
    $("#search").val("");
    query = query.split(" ").join("+");
    inputGlobal = query;
    getRequest(query);
  });
});

//removes old player and refreshes with new div to convert to iframe
var refreshPlayer = function(){
  $("#player").remove();
  $("body").append("<div id=player></div>");
};


//value of input sent in query                
var getRequest = function(input){
  $.ajax({
    url: "https://gdata.youtube.com/feeds/api/videos?q="+input,
    type: "GET",
    data: {
      orderby: "relevance",
      v: "2",
      alt: "jsonc",
      license: "cc",
      duration: "long",
      "max-results": "50"
    },
    contentType: "application/json",
    success: function(response){
      //response forwarded to create a new player instance
      if(response.data.items){
        var len = response.data.items.length;
        var num = Math.floor(Math.random() * len);
        var ResponseObject = response.data.items[num];
        video(ResponseObject.id, ResponseObject.duration);
      }else{
        alert("there are no videos for your search query");
      }
    },
    error: function(obj, error){
      console.log(error);
    }
  });
};

//new player instance created with random response ID
var video = function(ID, duration){
  var player;
  var startTime = Math.floor(Math.random() * duration);
  console.log(startTime, duration);
  function onYouTubeIframeAPIReady() {  
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: ID,
      playerVars: {
        start: startTime,
        controls: '0',
        modestbranding: '1',
        showinfo: '0',
        rel: '0'
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
  function onPlayerReady(event) {
    event.target.playVideo();
  }
  function onPlayerStateChange(event) {
    if(event.data === 0){
      refreshPlayer();
      getRequest(inputGlobal);
    }
    if(event.data === 2){
      player.playVideo();
    }
  }
  function stopVideo() {
    player.stopVideo();
  }
  onYouTubeIframeAPIReady();
};


// 1 – Action & Adventure
// 2 – Animation & Cartoons
// 3 – Classic TV
// 4 – Comedy
// 5 – Drama
// 6 – Home & Garden
// 7 – News
// 8 – Reality & Game Shows
// 9 – Science & Tech
// 10 – Science Fiction
// 11 – Soaps
// 13 – Sports
// 14 – Travel
// 16 – Entertainment
// 17 – Documentary
// 20 – Nature
// 21 – Beauty & Fashion
// 23 – Food
// 24 – Gaming
// 25 – Health & Fitness
// 26 – Learning & Education
// 27 – Foreign Language