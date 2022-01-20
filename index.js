
let dataDicks = [{person: new Date("2020-01-01"), dickSize:10}, 
                {person: new Date("2020-01-02"), dickSize:30},
                {person: new Date("2020-01-04"), dickSize: 40},
                {person: new Date("2020-01-07"), dickSize:39}]


let dataDicks2 = dataDicks.map(object=> ({ ...object, ballRadius: Math.random()*object.dickSize}))


// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 40, left: 90}, 
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#visualization")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);

// Parse the Data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv").then(function(data) {

    console.log(data)

  // Add X axis
  var x = d3.scaleLinear()
            .domain([0, d3.max(data, d=>+d.Value)*1.1])
            .range([ 0, width]);

// Y axis
  var y = d3.scaleBand()
        .domain(data.map(d=>d.Country))
        .range([ 0, height ])
        .padding(0);

  //Bars
//   svg
//     .selectAll("rect")
//     .data(data)
//     .join("rect")
//     .attr("x", x(0) )
//     .attr("y", d=> y(d.Country))
//     .attr("width", d=> x(+d.Value))
//     .attr("height", y.bandwidth()/2)
//     .attr("fill", "steelblue")

    svg
    .selectAll("line")
    .data(data)
    .join("line")
    .attr("x1", x(0))
    .attr("x2", d=> x(+d.Value))
    .attr("y1", d=> y(d.Country)+y.bandwidth()/2)
    .attr("y2", d=> y(d.Country)+y.bandwidth()/2)
    .attr("class", "chartLine")
    .attr("stroke", "black")  

    svg
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("id", (d, i)=> "chartCircle"+d.Country.replace("(", "").replace(")", "").replace(" ", ""))
    .attr("cx", d=> x(+d.Value))
    .attr("cy", d=> y(d.Country)+y.bandwidth()/2)
    .attr("r", 8)
    .attr("class", "chartCircle")
    // .attr("fill", "steelblue")
    .on("mouseover", (event, d)=>{
        d3.selectAll(".chartCircle").attr("opacity", 0.5)
        d3.select("#chartCircle"+d.Country.replace("(", "").replace(")", "").replace(" ", "")).attr("fill", "#f14814").attr("r", 20).attr("opacity", 1).style("stroke-width", "4px")
    })
    .on("mouseleave", (event, d)=>{
        d3.selectAll(".chartCircle").attr("opacity", 1)
        d3.select("#chartCircle"+d.Country.replace("(", "").replace(")", "").replace(" ", "")).attr("fill", "white").attr("r", 8).style("stroke-width", "4px")
    })


    svg
    .selectAll("text")
    .data(data)
    .join("text")
    .attr("x", d=> x(+d.Value)+10)
    .attr("y", d=> y(d.Country)+y.bandwidth()/2)
    .text(d=>d.Value)
    .style("font-size", "10")
    .style("font-family", "sans-serif")
    .attr("class", "chartAnnotation")

    

    let xAxis = svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .attr("class", "x-axis")
    // .selectAll("text")
    //   .attr("transform", "translate(-10,0)rotate(-45)")
    //   .style("text-anchor", "end");

    let yAxis = svg.append("g")
        .call(d3.axisLeft(y))
        .attr("class", "y-axis")


    yAxis.select("domain").remove()
    xAxis.select("domain").remove()


    // .attr("x", function(d) { return x(d.Country); })
    // .attr("y", function(d) { return y(d.Value); })
    // .attr("width", x.bandwidth())
    // .attr("height", function(d) { return height - y(d.Value); })
    // .attr("fill", "#69b3a2")

})


