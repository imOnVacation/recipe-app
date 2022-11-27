//Vincent Liang and Leshi Chen

const clickButtonHandler = (evt) => {
  const result = document.getElementById('receiptSearch').value;
  if (result) {
    document.getElementById('receiptSearch').value += `, ${evt.value}`;
  } else document.getElementById('receiptSearch').value += evt.value;
};

//function to copy all selected chekbox to the user input box
var results = $('#myDiv'),
  checks = $('#Food input[type=checkbox]');

//everytime a checkbox is click
checks.on('change', function () {
  var clones = checks
    //only copy those checked one
    .filter(':checked')
    //check for next sibiling
    .next()
    .addBack()
    //clone the collection
    .clone()
    .each(function () {
      if (this.id && this.type && this.type === 'checkbox') {
        this.removeAttribute('value');
        this.style = 'display:none;';
      }
    });
  //since everytime the function will copy the whole checked collection, it will need to empty it then copy over with the newly add
  results.empty().append(clones);
});

//function to add user input in the search bar into the user selected box
function addcheck() {
  var out = '';
  var value = document.getElementById('ingredients').value; //get user input text
  var check = document.getElementById(value); //check if user input is empty
  if (!value) {
    //alert user when empty input
    window.alert('Please enter ingredient');
  } else if (!check) {
    //add user input as checkbox to user selected box
    out += `<label id = ${value}>
            <input id=${value} name=${value} class="userIn" type='checkbox' value=${value} checked=true onclick="ShowHideUserIn(this.checked, this.value)"/>${value}
          </label>`;
    document.querySelector('#UserInput').innerHTML += out;
  } else {
    //if exist then don't add
    window.alert('You already have this ingredient in the box');
  }
  event.preventDefault();
}

//Delete checkbox if user unclick those in the user selected box
function ShowHideUserIn(ischecked, value) {
  if (ischecked) $(`#${value}`).show();
  else {
    //delete the checkbox when uncheck
    data = document.getElementById(value);
    data.remove();
  }
}

//refresh the page
function reset() {
  history.go(0);
}

//transfer everything that checked into a string
function showSelectedValues() {
  //only get all value if checked
  return $('input[type=checkbox]:checked')
    .map(function () {
      return this.value;
    })
    .get()
    .join(',');
}

//once checked value had been transform to string make it to be array
function GoResult() {
  //transform to array
  var arr = showSelectedValues().toString().split(',');
  //Remove duplicate data
  var unique = [...new Set(arr)];
  //encode to URI
  unique = encodeURIComponent(unique);
  //store to local storage to get ready for next page
  localStorage['checkArr'] = unique;
  if (unique.length === 0) {
    window.alert("You didn't select anything");
  } else {
    //relocate page
    location.href = 'result.html';
  }
  event.preventDefault();
}
