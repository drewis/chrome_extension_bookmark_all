chrome.browserAction.onClicked.addListener(function(tab) {
  var currentTime = new Date();
  var currentdate = currentTime.getFullYear() + "/" + (currentTime.getMonth() + 1) + "/" + currentTime.getDate();
  var tabs = [];
  var t = "Other Bookmarks"
  chrome.bookmarks.getChildren('0',
    function(marks){
      marks.forEach(function(mark){
        if ((mark.title).toLowerCase() == t.toLowerCase()){
          chrome.bookmarks.create({
            parentId:mark.id,
            title:currentdate},
          function(mar){
          // Loop over all windows and their tabs
          chrome.windows.getAll({ populate: true }, function(windowList) {
            for (var i = 0; i < windowList.length; i++) {
              for (var j = 0; j < windowList[i].tabs.length; j++) {
                var tab = windowList[i].tabs[j];
                //bookmark the tab
                chrome.bookmarks.create({
                  parentId : mar.id,
                  title : tab.title,
                  url : tab.url
                });
              }
            }
          });

          });
        }
      });
    });
});
