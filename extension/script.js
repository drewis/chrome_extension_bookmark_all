$(document).ready(function(){
  var currentTime = new Date();
  var folderTitle = currentTime.getFullYear() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getDate();
  // Set default value to current date
  $('#folderName').val(folderTitle);
  console.log("Set placeholder to " + folderTitle);
  // Handle button click
  $('form').submit(function(){
    // This seems the stupidest way to get the value
    var folderName = $('#folderName').val();
    window.close();
    // Create bookmarks from background page
    // I couldn't get it to work from here
    // and there seemed to be a race condition with window.close()
    chrome.extension.getBackgroundPage().bookmarkAll(folderName);
  });
});
