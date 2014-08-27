var channelApp = angular.module("channelApp", []);

channelApp.controller("channelController", function($scope){
  var loaded = false;
  $scope.current = "";
  $scope.counter = 0;
  $scope.channelList = [
    "Channel 01 - Action & Adventure", //food?
    "Channel 02 - Animation & Cartoons", //foreign Language?
    "Channel 03 - Classic TV",
    "Channel 04 - Comedy",
    "Channel 05 - Drama",
    "Channel 06 - Home & Garden",
    "Channel 07 - News",
    "Channel 08 - Reality & Game Shows",
    "Channel 09 - Science & Tech",
    "Channel 10 - Science Fiction",
    "Channel 11 - Soaps",
    "Channel 12 - Sports",
    "Channel 13 - Travel",
    "Channel 14 - Entertainment",
    "Channel 15 - Documentary",
    "Channel 16 - Nature",
    "Channel 17 - Beauty & Fashion",
    "Channel 18 - Food",
    "Channel 19 - Gaming", //science and Tech
    "Channel 20 - Health & Fitness", //foreign language
    "Channel 21 - Learning & Education",
    "Channel 22 - Foreign Language",
    "Channel 23 - Epic Sax Guy, All the Time"
  ];
  $scope.channelOne = function(){
    $scope.current = $scope.channelList[0];
    $scope.counter = 0;
    loaded = true;
  };
  $scope.channelUp = function(){
    if(loaded === true){
      $scope.counter++;
      var count = $scope.counter;
      if(count >= $scope.channelList.length){
        count = $scope.counter = 0;
      }
      $scope.current = $scope.channelList[count];
    }
  };
  $scope.channelDown = function(){
    if(loaded === true){
      $scope.counter--;
      var count = $scope.counter;
      if(count < 0){
        count = $scope.counter = $scope.channelList.length - 1;
      }
      $scope.current = $scope.channelList[count];
    }
  };
});


// 1 – 
// 2 – 
// 3 – 
// 4 – 
// 5 – 
// 6 – 
// 7 – 
// 8 – 
// 9 – 
// 10 – 
// 11 – 
// 13 – 
// 14 – 
// 16 – 
// 17 – 
// 20 – 
// 21 – 
// 23 – 
// 24 – 
// 25 – 
// 26 – 
// 27 – 