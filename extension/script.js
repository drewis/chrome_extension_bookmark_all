function toShortISODateString(d) {
  var pad = chrome.extension.getBackgroundPage().pad;
  return d.getFullYear() + '-'
    + pad(d.getMonth()+1) + '-'
    + pad(d.getDate()) + ' '
    + pad(d.getHours()) + ':'
    + pad(d.getMinutes()) + ':'
    + pad(d.getSeconds());
}
$(document).ready(function(){
  var folderTitle = toShortISODateString(new Date());
  // Set default value to current date
  $('#folderName').val(folderTitle);
  console.log("Set placeholder to " + folderTitle);
  // Remember last option for checkbox
  $('#windowsAsFolders').prop('checked', localStorage['windowsAsFolders'] == 'true');
  // Handle button click
  $('form').submit(function(){
    // This seems the stupidest way to get the value
    var folderName = $('#folderName').val();
    var windowsAsFolders = $('#windowsAsFolders').is(':checked');
    window.close();
    // Create bookmarks from background page
    // I couldn't get it to work from here
    // and there seemed to be a race condition with window.close()
    chrome.extension.getBackgroundPage().bookmarkAll(folderName, windowsAsFolders);
    // Save option for checkbox
    localStorage['windowsAsFolders'] = $('#windowsAsFolders').prop('checked') ? 'true' : 'false';
    return false;
  });
});
