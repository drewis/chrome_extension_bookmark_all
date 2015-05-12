function bookmarkAll(folderTitle) {
  console.log("Creating new bookmarks in " + folderTitle);
  // Create folder
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
            bookmarkWindowTabs(windowList[i], folder);
          }
        }
      );
    }
  );
}

function bookmarkWindowTabs(window, folder) {
  for (var j = 0; j < window.tabs.length; j++) {
    var tab = window.tabs[j];
    bookmarkTab(folder, tab);
  }
}

function bookmarkTab(folder, tab) {
  chrome.bookmarks.create(
      {
        parentId : folder.id,
        title : tab.title,
        url : tab.url
      }
  );
}
