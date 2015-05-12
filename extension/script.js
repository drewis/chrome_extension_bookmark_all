function toShortISODateString(d) {
  function pad(n) {
    return n<10 ? '0'+n : n
  }
  return d.getFullYear()+'-'
    + pad(d.getMonth()+1)+'-'
    + pad(d.getDate());
}
$(document).ready(function(){
  var folderTitle = toShortISODateString(new Date());
  // Set default value to current date
  $('#folderName').val(folderTitle);
  console.log("Set placeholder to " + folderTitle);
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
    return false;
  });
});
