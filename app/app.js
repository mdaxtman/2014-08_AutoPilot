var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



$("#player").ready(function(){
  var query;
  $("button").on("click", function(){
    //$("#player").remove();
    query = $("#search").val();
    $("#search").val("");
    query = query.split(" ").join("+");
    $.ajax({
      url: "https://gdata.youtube.com/feeds/api/videos?q="+query,
      type: "GET",
      data: {
        orderby: "relevance",
        v: "2",
        alt: "jsonc",
        limit: "5",
        license: "cc",
        duration: "long",
        "max-results": "50"
      },
      contentType: "application/json",
      success: function(response){
          var len = response.data.items.length;
          console.log(len);
          var num = Math.floor(Math.random() * len);
          console.log(num);
          var object = response.data.items[num];
        setTimeout(function(){video(object.id);}, 100);
      }
    });
  });
});
                

var video = function(ID){
  var player;
  function onYouTubeIframeAPIReady() {  
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: ID,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
  function onPlayerReady(event) {
    event.target.playVideo();
  }
  var done = false;
  function onPlayerStateChange(event) {
    if(event.data === 0){
      console.log("ended");
    }
    if(event.data === 2){
      console.log("paused");
      //onYouTubeIframeAPIReady("4z56JFMueFY");
    }
  }
  function stopVideo() {
    player.stopVideo();
  }
  onYouTubeIframeAPIReady();
};





//*********************************************
// $("document").ready(function(){
//   var defer = $.Deferred();
//   var tag; 
//   defer.resolve(function(){
//   tag = $("head").append("<script src='https://www.youtube.com/iframe_api'></script>");
//   });

//   defer.then(function(){
//     var player;
//     function onYouTubeIframeAPIReady() {
//       console.log("hi");
//       player = new YT.Player('player', {
//         height: '390',
//         width: '640',
//         videoId: 'M7lc1UVf-VE',
//         events: {
//           'onReady': onPlayerReady,
//           'onStateChange': onPlayerStateChange
//         }
//       });
//     }
//     
//     function onPlayerReady(event) {
//       event.target.playVideo();
//     }
//     var done = false;
//       function onPlayerStateChange(event) {
//         if (event.data == YT.PlayerState.PLAYING && !done) {
//           setTimeout(stopVideo, 6000);
//           done = true;
//         }
//       }
//       function stopVideo() {
//         player.stopVideo();
//       }
//   });
// });
