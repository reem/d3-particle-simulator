// Make the linter happy.
var d3 = d3;
var Circle = Circle;
// End of linter.

var numParticles = 2000;
var createParticles, updateParticles, getParticles, newParticles;

var between = function (min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

(function () {
  createParticles = function (numParticles, sizeRange,
      locationXRange, locationYRange) {
    return d3.range(numParticles).map(function () {
      return new Circle(
        between.apply(null, locationXRange || [10, window.innerWidth - 10]),
        between.apply(null, locationYRange || [10, window.innerHeight - 10]),
        between.apply(null, sizeRange || [2, 4]));
    });
  };

  updateParticles = function (svg) {
    svg.selectAll("circle")
        .data(particles.slice(1))
      .enter().append("svg:circle")
        .attr("r", function (d) { return d.r; })
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .style("fill", function (d, i) { return color(i % 3); });
  };

  var particles = createParticles(numParticles);
  var color = d3.scale.category10();

  getParticles = function () {
    return particles;
  };

  newParticles = function () {
    particles = createParticles.apply(null, arguments);
  };
}());
