//const { data } = require("jquery");

$(document).ready(function(){
  $("#convert-to-json").click(function () {
    // Get the CSV Data
    var CSVData = $("#csv-data").val()
    displayJSONOnScreen(convertToJSON(CSVData));
  })
});

function CSVToArray(csv){
  var converted = [];
  var row = [];
  
  var delimiter = ',';

  var entry = ""
  for (index in csv){
    char = csv.charAt(index);

    if (char === '"' && char !== delimiter){

    }
    else if (char === delimiter || char === '\n'){
      entry = entry.trim();
      row.push(entry);
      entry = "";
      if (char === '\n'){
        converted.push(row);
        row = [];
      }
    }
    else if (char === ' ' && entry[entry.length-1] === ' '){
      
    }
    else {
      entry += char;
    }
  }
  return converted;
}

function convertToJSON(CSVData){
  if (validateData(CSVData, "csv") === 1){
    // valid data, proceed to convert
  }
  else {
    alert ("Invalid CSV Data entered.");
    return;
  }

  var dataAsArray = CSVToArray(CSVData);
  console.log(dataAsArray);
  
  var dataAsJSON = []; // Array of JSON values

  var keys = dataAsArray[0];

  for (var row = 1; row < dataAsArray.length; row++){
    var currentValues = {};
    for (var col = 0; col < dataAsArray[row].length; col++){
      currentValues[keys[col]] = dataAsArray[row][col];
    }
    dataAsJSON.push(currentValues);
  }
  return dataAsJSON;
}

function displayJSONOnScreen(JSONData){
  var outputString = "";

  for (index in JSONData){
    var entry = JSONData[index];
    outputString += "{";
    for (const [key, value] of Object.entries(entry)){
      outputString += `"${key}":"${value}",`
    }
    outputString = outputString.substring(0, outputString.length -1);
    outputString += "},\n";
  }
  outputString = outputString.substring(0, outputString.length - 2);
  var JSONTextbox = $("#json-data").val(outputString);
}

function validateData(data, type){
    if (data === ""){
      alert ("Field is empty.")
      return 0;
    }
    else if (type === "csv"){
      return validateCSV(data);
    }
    else if (type === "json"){
      return validateJSON(data);
    }
    else {
      return 0;
    }
}

function validateCSV(data){
  return 1;
}

function validateJSON(data){
  return 1;
}

