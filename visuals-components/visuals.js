// The API
const apiUrl = "https://stephen-king-api.onrender.com/api/books";

// Color Scheme
const colorScheme = ["#0095A8", "#112E51", "#FF7043", "#78909C"];

// Function to fetch data from the API
async function fetchBooks() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const responseData = await response.json();
    let booksData = responseData.data;

    // Limit to the first 7 books
    booksData = booksData.slice(0, 7);

    console.log("Books Data:", booksData);

    // Call drawChart function with live API data
    drawChart(booksData);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

//  live data function
function drawChart(booksData) {
  // Set up SVG dimensions
  const HEIGHT = 400;
  const WIDTH = 600;
  const PADDING = 50;

  // Set up SVG
  const svg = d3
    .select("#bar-graph")
    .append("svg")
    .attr("height", HEIGHT)
    .attr("width", WIDTH)
    .style("background-color", "#f0f0f0");

  // Set up scales
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(booksData, (d) => d.Pages)])
    .range([PADDING, WIDTH - PADDING]);

  const yScale = d3
    .scaleBand()
    .domain(booksData.map((d) => d.Year)) // Years for y-axis
    .range([PADDING, HEIGHT - PADDING])
    .padding(0.1);

  // Create axes with labels
  svg
    .append("g")
    .attr("transform", `translate(0, ${HEIGHT - PADDING})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d"))); // Label x-axis

  svg
    .append("g")
    .attr("transform", `translate(${PADDING}, 0)`)
    .call(d3.axisLeft(yScale)); // Label y-axis

  // Add axis labels
  svg
    .append("text")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT - 10)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .text("Number of Pages");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -HEIGHT / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .text("Year");

  // Create a tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Create a group to hold the bars and store each bar's color
  const bars = svg
    .selectAll("rect")
    .data(booksData)
    .enter()
    .append("rect")
    .attr("x", PADDING)
    .attr("y", (d) => yScale(d.Year))
    .attr("height", yScale.bandwidth())
    .attr("width", (d) => xScale(d.Pages) - PADDING)
    .attr("fill", (d, i) => colorScheme[i % colorScheme.length]) // Apply custom color scheme
    .attr("class", "bar")
    .on("mouseover", function (event, d) {
      tooltip.transition().duration(200).style("opacity", 1);
      tooltip
        .html(`Book: ${d.Title}<br>Pages: ${d.Pages}`)
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 30 + "px");
    })
    .on("mouseout", function () {
      tooltip.transition().duration(500).style("opacity", 0);
    });

  // Add text labels on top of the bars
  svg
    .selectAll("text.label")
    .data(booksData)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", (d) => xScale(d.Pages) + 5)
    .attr("y", (d) => yScale(d.Year) + yScale.bandwidth() / 2)
    .attr("dy", ".35em")
    .text((d) => d.Pages)
    .attr("fill", "white")
    .attr("font-size", "12px");

  // Event handlers for the color buttons
  function filterBarsByColor(color) {
    bars.each(function () {
      const bar = d3.select(this);
      if (bar.attr("fill") !== color) {
        bar.style("opacity", 0.1);
      } else {
        bar.style("opacity", 1);
      }
    });
  }

  // Event handler to reset the chart (show all bars)
  function resetBars() {
    bars.style("opacity", 1);
  }

  // Add event listeners for color buttons
  colorScheme.forEach((color) => {
    d3.select(`#color-btn-${color.replace("#", "")}`).on("click", () =>
      filterBarsByColor(color)
    );
  });

  // Add event listener for the reset button
  d3.select("#reset-btn").on("click", resetBars);
}

// Fetch books data on page load
fetchBooks();

//Pie Chart*/
