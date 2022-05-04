console.log("Content script ...");

window.addEventListener("mouseup", getSelected);

function getSelected() {
  let word = document.getSelection().toString().trim();
  if (word.length > 0) {
    chrome.storage.local.set({ word: word });
  }
}
