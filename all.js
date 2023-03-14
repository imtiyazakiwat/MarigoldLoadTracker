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
let rclicked =0;

function addToCalculation(value) {
  calculation += value;
  document.getElementById("calculation").value = calculation;
}




let clickCount = 0;

function clearCalculation() {

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
  // c1Clicked++;
  const sum = eval(calculation);
  totalBags += (calculation.match(/[0-9.]+/g) || []).length;
  totalSum += sum;
  lessBagWeight1 = Math.ceil(totalBags / 2);
  cQty = totalSum - lessBagWeight1;
 
  
    document.getElementById("calculation").value = sum;
    calculation = "" + sum;
  
  // document.getElementById("totalBags").textContent = totalBags;
  // document.getElementById("lessBagWeight").textContent = lessBagWeight;
  // document.getElementById("cQty").textContent = cQty;
}


function clearDisplay() {
  document.getElementById("calculation").value = "";
  calculation = "";
}

function calculateAll() {
    document.getElementById("calculation").value = totalSum;
    calculation = "" + totalSum;
    alltotalBags += totalBags;
    document.getElementById("totalBags").textContent = totalBags;
    document.getElementById("lessBagWeight").textContent = lessBagWeight1;
    document.getElementById("cQty").textContent = cQty;
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
      newInput.setAttribute("id", "input" + count1); // add ID to the input element
      newCol.appendChild(newInput);
    
      newRow.appendChild(newCol);
      count1++;
    }
    
    document.getElementById("rows-container").appendChild(newRow);
    

    // Add the remove button to the new row
//     var removeRowButton = document.createElement("button");
// removeRowButton.innerHTML = "Remove Row";
// removeRowButton.classList.add("btn", "btn-danger");
// removeRowButton.onclick = function () {
// rowsContainer.removeChild(newRow);
// count1 -= 6; // subtract 6 from count1
// rclicked++;
// }; 

//     newRow.appendChild(removeRowButton);

    // Add the new row to the rows container
    rowsContainer.appendChild(newRow);

    // Set the focus to the first input field in the new row
    $(newRow).find("input:first").focus();
    
    
    //fill values auto
    if (rclicked===1){
      count1 -=6;
    }
    count +=5;
    $("#rows-container input:eq(" + count + ")").val(totalBags);
    console.log(count);
    count +=1;
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
    newRow.classList.add("row");

    // Add input fields to the new row
    for (var i = 0; i < 6; i++) {
      var newCol = document.createElement("div");
      newCol.classList.add("col-sm-2");

      var newInput = document.createElement("input");
      newInput.classList.add("form-control");
      newInput.setAttribute("type", "text");
      newCol.appendChild(newInput);

      newRow.appendChild(newCol);
    }

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
    $(newRow).find("input:first").focus();
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