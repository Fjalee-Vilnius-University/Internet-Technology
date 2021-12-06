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

function orderSubmitHandler() {
  const valid = validateOrderSubmit();
  if (valid) {
    const form = $("#order-registration-form");
    var url = "https://jsonblob.com/api/jsonBlob";

    const jsonData = getFormDataJSON(form);
    let blobId;

    $.ajax({
      url: url,
      type: "POST",
      contentType: 'application/json',
      data: JSON.stringify(jsonData),
      complete: function (data) {
        blobId = getBlobId(data.getResponseHeader("Location"));
        makeNewestButtonRegular();
        $("#review-order-section").append(buttonForOrderReview(blobId));
      }
    });
  }
  return false;
}

function makeNewestButtonRegular(){
  $(".newest-button").removeAttr("style");
  $(".newest-button").removeClass("newest-button");
}

function getBlobId(blobGetPath){
  const splitArray = blobGetPath.split('/');
  return splitArray[splitArray.length-1];
}

function getFormDataJSON(form){
  var unindexed_array = form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}

function showOrder(blobId){
  const url = "https://jsonblob.com/api/jsonBlob/" + blobId;
  $.ajax({
    url: url,
    type: "GET",
    dataType: 'json',
    complete: function (response) {
      const order = response.responseJSON;
      putShowOrderDataIntoTable(order);
      deleteShowOrderButton(blobId);
    }
  });
}

function deleteShowOrderButton(id){
  $("#review-order-button-" + id).remove();
}

function putShowOrderDataIntoTable(order){
  $("#review-order-table__name").text(order.name);
  $("#review-order-table__surname").text(order.surname);
  $("#review-order-table__email").text(order.email);
  $("#review-order-table__tel").text(order.tel);
  $("#review-order-table__birthDate").text(order.birthDate);
  $("#review-order-table__ccn").text(order.ccn);
  $("#review-order-table__cvv").text(order.cvv);
}

function buttonForOrderReview(blobId){
  const className = ' class="newest-button review-order-button myButton" ';
  const role = ' role="button" ';
  const id = ' id="review-order-button-' + blobId + '" ';
  const href = ' href="javascript:showOrder(' + "'" + blobId + "'" + ')" ';
  const body = 'order #' + blobId;
  const style = ' style="background-color: green;" ';

  const result =
    "<a " + className + role + id + href + style + " > " + 
    body + 
    " </a>";

  return result 
}

document.addEventListener("DOMContentLoaded", function () {});
