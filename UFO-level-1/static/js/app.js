// from data.js
var tableData = data;
// --------------initally append all table data on webpage --------------
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
//---------------------------------------------------------------------
// select the button and form
var button = d3.select("#filter-btn");
var form = d3.select("#form");
// create event handlers for button and form
button.on("click", runEnter);
form.on("submit", runEnter);
// event handler function for the form for filtered data input---------
function runEnter() {
  // clear table to append filtered data
  tbody.html(``);
  // prevent the page from refreshing
  d3.event.preventDefault();
  // select the input element and get the input value
  var inputElement = d3.select("#datetime");
  var inputValue = inputElement.property("value");
  // filter data to input
  var filteredData = tableData.filter(date => date.datetime === inputValue);
  // for each filtered data, append to the table
  filteredData.forEach(function(ufosighting) {
    // append filtered data row
    var row = tbody.append("tr");
    // append filtered data into cell
    Object.entries(ufosighting).forEach(function([key, value]) {
      // appenmd each cell with filtered data
      var cell = row.append("td");
      cell.text(value);  
    });
  });
}
//---------------------------------------------------------------------