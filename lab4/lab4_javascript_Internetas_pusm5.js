// $(document).ready(function() {
//     console.log("works");
// });
function validateNotBlank(obj) {
  const isInvalid = isBlank(obj.value);
  manageInvalid(isInvalid, obj);
  return !isInvalid;
}
function validatePosInteger(obj) {
  const isInvalid = !isPosInt(obj.value);
  manageInvalid(isInvalid, obj);
  return !isInvalid;
}
function validateCorrectDate(obj) {
  const isInvalid = !isCorrectDate(obj.value);
  manageInvalid(isInvalid, obj);
  return isInvalid;
}
function validateSurname(obj) {
  const isInvalid = !isCorrectSurname(obj.value);
  showErrorMessage(isInvalid);
}
function validateOrderSubmit() {
  const nameEl = document.forms["order-registration-form"]["name"];
  const cvvEl = document.forms["order-registration-form"]["cvv"];
  const birthDateEl = document.forms["order-registration-form"]["birthDate"];

  const validName = validateNotBlank(nameEl);
  const validCvv = validatePosInteger(cvvEl);
  const validBirthDate = validateCorrectDate(birthDateEl);
  if (!validName || !validCvv || !validBirthDate) {
    alert("fix invalid fields");
    return false;
  }
}

function isPosInt(val) {
  var n = Math.floor(Number(val));
  if (n !== Infinity && String(n) === val && n >= 0) {
    return true;
  }
  return false;
}
function isBlank(val) {
  if (val === "") {
    return true;
  }
  return false;
}
function isCorrectDate(val) {
  if (new Date(val) !== "Invalid Date" && !isNaN(new Date(val))) {
    return true;
  } else {
    return false;
  }
}
function isCorrectSurname(val) {
  if (val.length >= 2) {
    return true;
  } else {
    return false;
  }
}

function manageInvalid(isInvalid, obj) {
  if (isInvalid) {
    obj.classList.add("invalid");
  } else {
    obj.classList.remove("invalid");
  }
}

function showErrorMessage(show) {
  const errorMessageEl = $(".error-message");
  if (!show) {
    errorMessageEl.css("display", "none");
  } else {
    errorMessageEl.css("display", "block");
  }
}

function changeWorkingHoursFontSize(change) {
  workingHoursEl = $("#working-hours").children("ul");
  changeFontSize(workingHoursEl, change);
}

function changeFontSize(obj, change) {
  elementToZoom = $("#working-hours").children("ul");
  currFontSize = elementToZoom.css("font-size");
  temp = parseInt(currFontSize, 10) + change;
  elementToZoom.css("font-size", temp);
}

function orderSubmitHandler(e) {
  // const valid = validateOrderSubmit();
  const valid = true;
  if (valid) {
    const form = $("#order-registration-form");
    var url = "https://jsonblob.com/api/jsonBlob";

    const temp = getFormDataJSON(form);
    console.log(temp);

    $.ajax({
      url: url,
      type: "POST",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(temp),
      complete: function (data) {
        alert(data.getResponseHeader("Location"));
      }
    });
    return false;
  } else {
    return false;
  }
}

function temp(e){
}

function getFormDataJSON(form){
  var unindexed_array = form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}

document.addEventListener("DOMContentLoaded", function () {});
