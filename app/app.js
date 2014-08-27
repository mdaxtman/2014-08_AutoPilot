//initialize iframe
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//closure variable for access to other functions of user input
var inputGlobal;
//number associated with genre type
var genre = 1;


//jquery event handlers
$("#player").ready(function(){
//channel up button
  $("#up").on("click", function(){
    if(inputGlobal){
      genre++;
      if(genre > 28){
        genre = 1;
      }
      if(genre === 12){
        genre = 13;
      }
      if(genre === 15){
        genre = 16;
      }
      if(genre === 18 || genre === 19){
        genre = 20;
      }
      if(genre === 22){
        genre = 23;
      }
      if(genre === 28){
        refreshPlayer();
        video("kxopViU98Xo", 36000);
      }else{
        refreshPlayer();
        getRequest(inputGlobal, genre);
      }
    }  
  });
//channel down button
  $("#down").on("click", function(){
    if(inputGlobal){
      genre--;
      if(genre < 1){
        genre = 28;
      }
      if(genre === 12){
        genre = 11;
      }
      if(genre === 15){
        genre = 14;
      }
      if(genre === 18 || genre === 19){
        genre = 17;
      }
      if(genre == 22){
        genre = 21;
      }
      if(genre === 28){
        console.log(genre);
        refreshPlayer();
        video("kxopViU98Xo", 36000);
      }else{
        refreshPlayer();
        getRequest(inputGlobal, genre);
      }
    }  
  });
//handle submission to hand off to GET request
  var query;
  $("#submission").on("click", function(){
    genre = 1;
    refreshPlayer();
    query = $("#search").val();
    $("#search").val("");
    query = query.split(" ").join("+");
    if(query.length){
      inputGlobal = query;
      getRequest(query, genre);
    }else{
      alert("please enter a topic or subject");
      location.reload();
    }
  });
});

//removes old player and refreshes with new div to convert to iframe
var refreshPlayer = function(){
  $("#player").remove();
  $(".display").prepend("<div id=player></div>");
};


//value of input sent in query                
var getRequest = function(input, channel){
  channel = JSON.stringify(channel);
  $.ajax({
    url: "https://gdata.youtube.com/feeds/api/videos?q="+input,
    type: "GET",
    data: {
      orderby: "relevance",
      v: "2",
      alt: "jsonc",
      license: "cc",  
      duration: "long",
      "max-results": "50",
      genre: channel
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

//new player instance created with random response ID, genre and
var video = function(ID, duration){
  var player;
  var startTime = Math.floor(Math.random() * duration);
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
      console.log("paused");
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