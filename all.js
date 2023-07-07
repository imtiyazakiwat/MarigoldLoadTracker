let calculation = "";
let totalSum = 0;
let totalBags = 0;
let lessBagWeight = 0;
let cQty = 0;
let c1Clicked = 0;
let cClicked = 0;
let alltotalBags = 0;
let count = -4;
let count1 = 6;
let rclicked = 0;
let numofrows = 0;
// var numRow =0;
let continueclicked = 0;
let datasaved =0 ;
let clickCount =0;

var rowCount = 1;
// document.getElementById("add-row-btn").addEventListener("click", addRow);

// Save button click event handler
document.getElementById("save-btn").addEventListener("click", saveData);

// Continue previous button click event handler
document.getElementById("continue-btn").addEventListener("click", continueData);

// Function to save the data to local storage
// function saveData() {
//   var data = [];
//   var inputs = document.querySelectorAll(".form-control");
//   for (var i = 0; i < inputs.length; i++) {
//     data.push(inputs[i].value);
//   }
//   localStorage.setItem("formData", JSON.stringify(data));
// }

// Get the form data from localStorage
var formData = localStorage.getItem ("formData");

var continueButton = document.getElementById ("continue-btn");

// Hide the continue button by default
continueButton.style.visibility = "hidden";



// Add an event listener to the window object to check if the page is reloaded
window.addEventListener ("load", function () {
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    // The page is reloaded, show the continue button
    continueButton.style.visibility = "visible";
  }
});

// This function saves the data and the number of rows in local storage
function saveData() {
  datasaved=1;
  var rows = document.querySelectorAll(".row");
  var data = [];
  var numRow = rows.length; // get the number of rows
  console.log(numRow);
  console.log(numRow);
  for (var i = 0; i < rows.length; i++) {
    var inputs = rows[i].querySelectorAll(".form-control");
    var rowData = [];
    for (var j = 0; j < inputs.length; j++) {
      rowData.push(inputs[j].value);
    }
    data.push(rowData);
  }
  localStorage.setItem("formData", JSON.stringify(data));
  localStorage.setItem("numRow", numRow); // save the number of rows
  alert("Your data saved successfully!");
}

// This function continues the data from local storage and adds rows accordingly
function continueData() {
  continueclicked = 1;
  var data = localStorage.getItem("formData");
  var numRow = localStorage.getItem("numRow"); // get the number of rows
  if (data && numRow) {
    data = JSON.parse(data);
    numRow = parseInt(numRow); // convert to a number
    for (var k = 0; k < numRow - 9; k++) {
      addRow(); // call addRow function numRow times
    }
    for (var i = 0; i < data.length; i++) {
      var row = document.querySelectorAll(".row")[i];
      var inputs = row.querySelectorAll(".form-control");
      for (var j = 0; j < inputs.length; j++) {
        inputs[j].value = data[i][j];
      }
    }
  }
}

function addToCalculation(value) {
  let calculationInput = document.getElementById("calculation");
  
  if (value === "bksp") {
    let current = calculationInput.value;
    calculationInput.value = current.slice(0, -1);
    calculation = calculationInput.value;
  } else {
    calculation += value;
    calculationInput.value = calculation;
    calculationInput.scrollLeft = calculationInput.scrollWidth;
  }
}


function backspace() {
  let calculation = document.getElementById("calculation");
  if (calculation) {
    let current = calculation.value;
    calculation.value = current.slice(0, -1);
  }

  console.log(calculation.value);
  console.log(calculation);
}


// let clickCount = 0;

function clearCalculation() {
  cClicked=0;
  document.getElementById("calculation").value = "";
  calculation = "";
  totalSum = 0;
  totalBags = 0;
  lessBagWeight1 = 0;
  cQty = 0;
  // clickCount = 0;
  document.getElementById("totalBags").textContent = totalBags;
  document.getElementById("lessBagWeight").textContent = lessBagWeight1;
  document.getElementById("cQty").textContent = cQty;
}

function calculate() {
  clickCount++;
  cClicked=0;
  if (clickCount === 2) {
    calculateAll();
    clickCount = 0;
  }

  else {
    const sum = eval(calculation);
    totalBags += (calculation.match(/[0-9.]+/g) || []).length;
    totalSum += sum;
    lessBagWeight1 = Math.ceil(totalBags / 2);
    cQty = totalSum - lessBagWeight1;
  
    document.getElementById("calculation").value = sum;
    calculation = "" + sum;
    calculationInput.style.fontSize = 48;
  }
 

}

function clearDisplay() {
  document.getElementById("calculation").value = "";
  calculation = "";
  cClicked++;
  clickCount=0;
  if(cClicked ==2){
    clearCalculation();
    clickCount=0;
  }
}

function calculateAll() {

  document.getElementById("calculation").value = totalSum;
  calculation = "" + totalSum;
  alltotalBags += totalBags;
  document.getElementById("totalBags").textContent = totalBags;
  document.getElementById("lessBagWeight").textContent = lessBagWeight1;
  document.getElementById("cQty").textContent = cQty;
  var rowsContainer = document.getElementById("rows-container");

  addRow();

  // Create a new row element
  //     var newRow = document.createElement("div");
  //     newRow.classList.add("row", "no-gutters"); // add no-gutters class to remove spacing between columns

  //     // Add input fields to the new row

  //     for (var i = 0; i < 6; i++) {
  //       var newCol = document.createElement("div");
  //       newCol.classList.add("col-2");
  //       var newInput = document.createElement("input");
  //       newInput.classList.add("form-control");
  //       newInput.setAttribute("type", "text");
  //       newInput.setAttribute("id", "input" + count1); // add ID to the input element
  //       newCol.appendChild(newInput);

  //       newRow.appendChild(newCol);
  //       count1++;
  //     }

  //     document.getElementById("rows-container").appendChild(newRow);

  //     // Add the remove button to the new row
  // //     var removeRowButton = document.createElement("button");
  // // removeRowButton.innerHTML = "Remove Row";
  // // removeRowButton.classList.add("btn", "btn-danger");
  // // removeRowButton.onclick = function () {
  // // rowsContainer.removeChild(newRow);
  // // count1 -= 6; // subtract 6 from count1
  // // rclicked++;
  // // };

  // //     newRow.appendChild(removeRowButton);

  //     // Add the new row to the rows container
  //     rowsContainer.appendChild(newRow);

  //     // Set the focus to the first input field in the new row
  //     // $(newRow).find("input:first").focus();

  //     //fill values auto
  //     if (rclicked===1){
  //       count -=6;
  //     }
  //     count +=5;
  var numRow = localStorage.getItem("numRow");
  console.log(count);
  for (var z = 0; z < 1; z++) {
    if (continueclicked === 1) {
      count = 6 * (numRow - 9) + 1;
      console.log(count);
    }
    continueclicked = 2;
  }
  console.log(numRow);
  // var rownums=numRow-9;
  // console.log(count);

  // console.log(count);

  $("#rows-container input:eq(" + count + ")").val(totalBags);
  // console.log(count);
  count += 1;
  $("#rows-container input:eq(" + count + ")").val(totalSum);
  var totalNoOfBags = 0;
  var totalQty = 0;
  var totalLessBagWeight = 0;
  var totalNetWeight = 0;
  var totalCQty = 0;

  // Loop through all the rows
  $("#rows-container .row").each(function () {
    var noOfBags = parseInt($(this).find("input:eq(1)").val()) || 0;
    var qty = parseFloat($(this).find("input:eq(2)").val()) || 0;
    var lessBagWeight = Math.ceil(noOfBags / 2) || 0;
    var netWeight = qty - lessBagWeight;
    var cQty = netWeight + totalCQty;

    // Update the input fields in the row
    $(this).find("input:eq(3)").val(lessBagWeight);
    $(this).find("input:eq(4)").val(netWeight);
    $(this).find("input:eq(5)").val(cQty);

    // Update the total variables
    totalNoOfBags += noOfBags;
    totalQty += qty;
    totalLessBagWeight += lessBagWeight;
    totalNetWeight += netWeight;
    totalCQty = cQty;
  });

  // Update the total row input fields
  $("#total-row input:eq(0)").val(totalNoOfBags);
  $("#total-row input:eq(1)").val(totalQty.toFixed(2));
  $("#total-row input:eq(2)").val(totalLessBagWeight.toFixed(2));
  $("#total-row input:eq(3)").val(totalNetWeight.toFixed(2));
  $("#total-row input:eq(4)").val(totalCQty.toFixed(2));
  // updateTotalRow();
}



function addRow() {
  // Get the rows container
  var rowsContainer = document.getElementById("rows-container");

  // Create a new row element
  var newRow = document.createElement("div");
  newRow.classList.add("row", "no-gutters"); // add no-gutters class to remove spacing between columns

  // Add input fields to the new row

  for (var i = 0; i < 6; i++) {
    var newCol = document.createElement("div");
    newCol.classList.add("col-2");
    var newInput = document.createElement("input");
    newInput.classList.add("form-control");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "input-" + rowCount + "-" + (i + 1)); // add ID to the input element
    newCol.appendChild(newInput);
    newRow.appendChild(newCol);
    count1++;
    // console.log(newInput);
    rowCount++;
  }
  // console.log(rowsContainer);

  document.getElementById("rows-container").appendChild(newRow);

  // Add the new row to the rows container
  rowsContainer.appendChild(newRow);

  // Set the focus to the first input field in the new row
  // $(newRow).find("input:first").focus();
  if (rclicked === 1) {
    count -= 6;
  }
  count += 5;
}

$(document).ready(function () {
  // Add event listener to the "Add Row" button
  $("#add-row-btn").click(function () {
    addRow();
  });

  // Add event listener to the input fields to update the total row
  $("#rows-container").on("input", "input", function () {
    updateTotalRow();
  });

  // Function to add a new row
  function addRow() {
    // Get the rows container
    var rowsContainer = document.getElementById("rows-container");

    // Create a new row element
    var newRow = document.createElement("div");
    newRow.classList.add("row", "no-gutters"); // add no-gutters class to remove spacing between columns

    // Add input fields to the new row

    for (var i = 0; i < 6; i++) {
      var newCol = document.createElement("div");
      newCol.classList.add("col-2");
      var newInput = document.createElement("input");
      newInput.classList.add("form-control");
      newInput.setAttribute("type", "text");
      newInput.setAttribute("id", "input-" + rowCount + "-" + (i + 1)); // add ID to the input element
      newCol.appendChild(newInput);
      newRow.appendChild(newCol);
      count1++;
      // console.log(newInput);
      rowCount++;
    }
    // console.log(rowsContainer);

    document.getElementById("rows-container").appendChild(newRow);

    // Add the remove button to the new row
    var removeRowButton = document.createElement("button");
    removeRowButton.innerHTML = "Remove Row";
    removeRowButton.classList.add("btn", "btn-danger");
    removeRowButton.onclick = function () {
      rowsContainer.removeChild(newRow);
      updateTotalRow();
    };
    newRow.appendChild(removeRowButton);

    // Add the new row to the rows container
    rowsContainer.appendChild(newRow);

    // Set the focus to the first input field in the new row
    // $(newRow).find("input:first").focus();
  }

  // Function to update the total row
  function updateTotalRow() {
    var totalNoOfBags = 0;
    var totalQty = 0;
    var totalLessBagWeight = 0;
    var totalNetWeight = 0;
    var totalCQty = 0;

    // Loop through all the rows
    $("#rows-container .row").each(function () {
      var noOfBags = parseInt($(this).find("input:eq(1)").val()) || 0;
      var qty = parseFloat($(this).find("input:eq(2)").val()) || 0;
      var lessBagWeight = Math.ceil(noOfBags / 2) || 0;
      var netWeight = qty - lessBagWeight;
      var cQty = netWeight + totalCQty;

      // Update the input fields in the row
      $(this).find("input:eq(3)").val(lessBagWeight);
      $(this).find("input:eq(4)").val(netWeight);
      $(this).find("input:eq(5)").val(cQty);

      // Update the total variables
      totalNoOfBags += noOfBags;
      totalQty += qty;
      totalLessBagWeight += lessBagWeight;
      totalNetWeight += netWeight;
      totalCQty = cQty;
    });

    // Update the total row input fields
    $("#total-row input:eq(0)").val(totalNoOfBags);
    $("#total-row input:eq(1)").val(totalQty.toFixed(2));
    $("#total-row input:eq(2)").val(totalLessBagWeight.toFixed(2));
    $("#total-row input:eq(3)").val(totalNetWeight.toFixed(2));
    $("#total-row input:eq(4)").val(totalCQty.toFixed(2));
  }
});
