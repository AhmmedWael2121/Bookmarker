var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("bookmarkUrl");
var btnContainer = document.querySelector(".btn-content");
var tableContent = document.getElementById("Content");

var container = [];
if (localStorage.getItem("bookmark") != null) {
  container = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmark();
}

function addBookmark() {
  // Validate bookmark name and URL
  validateName(bookmarkName);
  validateURL(bookmarkUrl);
  
  // Check if both inputs are valid
  if (bookmarkName.classList.contains("is-valid") && bookmarkUrl.classList.contains("is-valid")) {
    var bookmark = {
      name: bookmarkName.value,
      url: bookmarkUrl.value,
    };
    container.push(bookmark);
    displayBookmark();
    localStorage.setItem("bookmark", JSON.stringify(container));
    clearForm();
  } else {
    alert(`Site Name or Url is not valid, Please follow the rules below :

=> Site name must contain at least 3 characters
=> Site URL must be a valid one starts with https://`);
  }
}

function clearForm() {
  bookmarkName.value = "";
  bookmarkUrl.value = "";
  bookmarkName.classList.remove("is-valid", "is-invalid");
  bookmarkUrl.classList.remove("is-valid", "is-invalid");
}

function displayBookmark() {
  var displayContainer = "";
  if (container.length === 0) {
    displayContainer = "<tr><td colspan='4' class='text-center'>No bookmarks available</td></tr>";
  } else {
    for (var index = 0; index < container.length; index++) {
      displayContainer += ` 
        <tr>
          <td class="text-center">${index + 1}</td>
          <td class="text-center">${container[index].name}</td>
          <td class="text-center">
            <button onclick="openSite(${index})" class="btn btn-success">
              <i class="fa-solid fa-eye pe-2"></i> Visit
            </button>
          </td>
          <td class="text-center">
            <button onclick="deleteBookmark(${index})" class="btn btn-danger">
              <i class="fa-solid fa-trash-can"></i> Delete
            </button>
          </td>
        </tr>`;
    }
  }
  tableContent.innerHTML = displayContainer;
}

function deleteBookmark(index) {
  container.splice(index, 1);
  displayBookmark();
  localStorage.setItem("bookmark", JSON.stringify(container));
}

function openSite(index) {
  window.open(container[index].url, "_blank");
}

function validateName(elem) {
  var regexName = /^\w{3,48}$/;
  if (regexName.test(elem.value)) {
    elem.classList.add("is-valid");
    elem.classList.remove("is-invalid");
  } else {
    elem.classList.add("is-invalid");
    elem.classList.remove("is-valid");
  }
}

function validateURL(elem) {
  var regexURL =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
  if (regexURL.test(elem.value)) {
    elem.classList.add("is-valid");
    elem.classList.remove("is-invalid");
  } else {
    elem.classList.add("is-invalid");
    elem.classList.remove("is-valid");
  }
}