function bookmarkAll(folderTitle) {
  console.log("Creating new bookmarks in " + folderTitle);
  chrome.bookmarks.create(
      {
        title: folderTitle,
        url: null
      },
    function(folder){
      if (folder == null) {
        alert("Unable to create new folder " + folderTitle);
        return;
      }
      // Loop over all windows and their tabs
      chrome.windows.getAll(
          {
            populate: true
          },
        function(windowList) {
          for (var i = 0; i < windowList.length; i++) {
            for (var j = 0; j < windowList[i].tabs.length; j++) {
              var tab = windowList[i].tabs[j];
              //bookmark the tab
              chrome.bookmarks.create(
                  {
                    parentId : folder.id,
                    title : tab.title,
                    url : tab.url
                  }
              );
            }
          }
        }
      );
    }
  );
}
