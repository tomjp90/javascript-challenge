// from data.js
var tableData = data;

// INITIALLY DISPLAY FULL TABLE OF DATA ---------------------------
// get a reference to the table body
var tbody = d3.select("tbody");
// find for each data sighting and append rows for each
data.forEach(function(ufosighting) {
  var row = tbody.append("tr");
  // append each value to table cell
  Object.entries(ufosighting).forEach(function([key, value]) {
  // append a cell to the row for each value
    var cell = row.append("td");
    cell.text(value);
  });
});

//GET UNIQUE VALUES FOR DROPDOWN LISTS---------------------------------
var date = [];
var cities = [];
var state = [];
var country = [];
var shape = [];

// loop through sightings and push results
for (var i = 0; i < tableData.length; i++) {
      var sightings = Object.entries(tableData[i]);
      date.push(sightings[0][1]);
      cities.push(sightings[1][1]);
      state.push(sightings[2][1]);
      country.push(sightings[3][1]);
      shape.push(sightings[4][1]);      
}

// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates\
function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }  

// get unique values for arrays
var uniqueDate = date.filter(onlyUnique)
var uniqueCities = cities.filter(onlyUnique)
var uniqueState = state.filter(onlyUnique)
var uniqueCountry = country.filter(onlyUnique)
var uniqueShape = shape.filter(onlyUnique)  

// append value at start of array
var funiqueDate = uniqueDate.unshift("Select")
var funiqueCities = uniqueCities.unshift("Select")
var funiqueState = uniqueState.unshift("Select")
var funiqueCountry = uniqueCountry.unshift("Select")
var funiqueShape = uniqueShape.unshift("Select")  

// Create empty array to push into
var htmlDate = [];
var htmlCountry = [];
var htmlCities = [];
var htmlState = [];
var htmlShape = [];

// add dropdown list items
// DATE
      //loop over each array length
      for (var i = 0; i < uniqueDate.length; i++) {
            //add the option elements to the html array
            htmlDate.push("<option>" + uniqueDate[i] + "</option>")
      }
      //add the option values to the select list with an id 
      document.getElementById("date").innerHTML = htmlDate.join("");

//COUNTRY
      for (var i = 0; i < uniqueCountry.length; i++) {
            htmlCountry.push("<option>" + uniqueCountry[i] + "</option>")
      }
      document.getElementById("country").innerHTML = htmlCountry.join("");

//CITIES
      for (var i = 0; i < uniqueCities.length; i++) {
            htmlCities.push("<option>" + uniqueCities[i] + "</option>")
      }
      document.getElementById("cities").innerHTML = htmlCities.join("");

//STATE
      for (var i = 0; i < uniqueState.length; i++) { 
            htmlState.push("<option>" + uniqueState[i] + "</option>")
      }
      document.getElementById("state").innerHTML = htmlState.join("");

//SHAPE
      for (var i = 0; i < uniqueShape.length; i++) {
            htmlShape.push("<option>" + uniqueShape[i] + "</option>")
      }
      document.getElementById("shape").innerHTML = htmlShape.join("");


//FIND USER INPUT FROM DROPDOWN LIST-----------------------------------------

// create event handlers for dropdown selection
d3.selectAll("#date").on("change", filterValues);
d3.selectAll("#country").on("change", filterValues);
d3.selectAll("#cities").on("change", filterValues);
d3.selectAll("#shape").on("change", filterValues);
d3.selectAll("#state").on("change", filterValues);

// event handler function for filter inputs and save to a variable
function filterValues() {

// prevent the page from refreshing
d3.event.preventDefault();

//DATE
      var inputElement = d3.select("#date");
      var selDate = inputElement.property("value");
//COUNTRY
      var dropdownMenuCountry = d3.select("#country");
      var selCountry = dropdownMenuCountry.property("value");  
//CITIES
      var dropdownMenuCities = d3.select("#cities");
      var selCities = dropdownMenuCities.property("value");  
//SHAPE
      var dropdownMenuShape = d3.select("#shape");
      var selShape = dropdownMenuShape.property("value");   
//STATE
      var dropdownMenuState = d3.select("#state");
      var selState = dropdownMenuState.property("value"); 

var tbody = d3.select("tbody");
var msg = [];

if (selDate || selCountry || selCities || selShape || selState == "Select" || ""){
     msg.push("<label> Select All Fields! </label>")
     console.log(msg)
 }
 


// clear table to append filtered data
tbody.html(``);

var filteredSightings = tableData.filter(sighting => (sighting.datetime === selDate) &&
                                                      (sighting.city === selCities) &&
                                                      (sighting.state === selState) &&
                                                      (sighting.country === selCountry) &&
                                                      (sighting.shape === selShape)
                                                );
    
//display filtered table
filteredSightings.forEach(function(ufosighting) {
      // append filtered data row
      var row = tbody.append("tr");
      // append filtered data into cell
      Object.entries(ufosighting).forEach(function([key, value]) {
        // appenmd each cell with filtered data
        var cell = row.append("td");
        cell.text(value);  
      });
  });
};


//RESET TABLE BUTTON/FUNCTION ------------------------------------------

//select the button using D3
var button = d3.select("#filter-btn");
//on click run resetTable function
button.on("click", resetTable);

function resetTable() {
      // prevent the page from refreshing
      d3.event.preventDefault();

      // get a reference to the table body
      var tbody = d3.select("tbody");
      // find for each data sighting and append rows for each
      data.forEach(function(ufosighting) {
      var row = tbody.append("tr");
      // append each value to table cell
      Object.entries(ufosighting).forEach(function([key, value]) {
      // append a cell to the row for each value
            var cell = row.append("td");
            cell.text(value);
            });
      });
}