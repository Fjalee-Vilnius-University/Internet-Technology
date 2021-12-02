// $(document).ready(function() {
//     console.log("works");
// });
function validateNotBlank(obj) {
  const isInvalid = isBlank(obj.value);
  manageInvalid(isInvalid, obj);
}
function validatePosInteger(obj) {
  const isInvalid = !isPosInt(obj.value);
  manageInvalid(isInvalid, obj);
}
function validateCorrectDate(obj) {
  const isInvalid = !isCorrectDate(obj.value);
  manageInvalid(isInvalid, obj);
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

function manageInvalid(isInvalid, obj) {
  if (isInvalid) {
    obj.classList.add("invalid");
  } else {
    obj.classList.remove("invalid");
  }
}

document.addEventListener("DOMContentLoaded", function () {});
