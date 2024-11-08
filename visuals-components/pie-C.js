// 1. The API
const apiUrl = "https://stephen-king-api.onrender.com/api/books";

//2. The Color Scheme
const colorScheme = ["#0095A8", "#112E51", "#FF7043", "#78909C"]; // Custom color scheme

// 3. Function to fetch data from the API
async function fetchBooks() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const responseData = await response.json();
    let booksData = responseData.data; // Extracting the books data from the API response

    // Calling the first 7 books
    booksData = booksData.slice(0, 6);

    console.log("Books Data:", booksData);

    // Call drawChart function with live API data
    drawChart(booksData);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// live data function
function drawChart(booksData) {
  // Set up SVG dimensions
  const HEIGHT = 400;
  const WIDTH = 600;
  const RADIUS = Math.min(WIDTH, HEIGHT) / 2;

  // Set up SVG
  const svg = d3
    .select("#pie-chart")
    .append("svg")
    .attr("height", HEIGHT)
    .attr("width", WIDTH)
    .append("g")
    .attr("transform", `translate(${WIDTH / 2}, ${HEIGHT / 2})`);

  // Set up pie chart data
  const pie = d3.pie().value((d) => d.Pages);

  // Set up color scale for the chart
  const color = d3
    .scaleOrdinal()
    .domain(booksData.map((d) => d.Title))
    .range(colorScheme);

  // Create the arc generator
  const arc = d3
    .arc()
    .outerRadius(RADIUS - 10)
    .innerRadius(0);

  // Create the pie chart slices
  const slices = svg
    .selectAll(".slice")
    .data(pie(booksData))
    .enter()
    .append("g")
    .attr("class", "slice");

  // Append the arcs (slices)
  slices
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => color(d.data.Title))
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .attr("class", "pie-slice");

  // Add labels inside each slice
  slices
    .append("text")
    .attr("transform", function (d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("fill", "white")
    .text(function (d) {
      return d.data.Title;
    });

  // Event handlers for the color buttons
  function filterSlicesByColor(color) {
    d3.selectAll(".pie-slice").each(function () {
      const slice = d3.select(this);
      if (slice.attr("fill") !== color) {
        slice.style("opacity", 0.1);
      } else {
        slice.style("opacity", 1);
      }
    });
  }

  // Event handler to reset the chart (show all slices)
  function resetSlices() {
    d3.selectAll(".pie-slice").style("opacity", 1);
  }

  // Add event listeners for color buttons
  colorScheme.forEach((color) => {
    d3.select(`#color-btn-${color.replace("#", "")}`).on("click", () =>
      filterSlicesByColor(color)
    );
  });

  // Add event listener for the reset button
  d3.select("#reset-btn").on("click", resetSlices);
}

// Fetch books data on page load
fetchBooks();
