function bookmarkAll(folderTitle, windowsAsFolders) {
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
            bookmarkWindowTabs(windowList[i], folder, windowsAsFolders, i);
          }
        }
      );
    }
  );
}

function bookmarkWindowTabs(window, rootFolder, windowsAsFolders, index) {
  if(windowsAsFolders) {
    chrome.bookmarks.create(
        {
          parentId : rootFolder.id,
          title : pad(index+1),
          url : null
        },
      function(windowFolder) {
        bookmarkWindowTabsInFolder(window, windowFolder);
      }
    );
  } else {
    bookmarkWindowTabsInFolder(window, rootFolder);
  }
}

function bookmarkWindowTabsInFolder(window, folder) {
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

function pad(n) {
  return n<10 ? '0'+n : n
}
