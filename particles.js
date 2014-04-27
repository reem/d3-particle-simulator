// Global number of particles, scaled down for display on a slider.
var numParticles = 0.5;
// Exposed functions.
var createParticles, updateParticles, getParticles, newParticles, root, updateRoot;

// Utility function that gets an integer between two values.
var between = function (min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

(function () {
  // Create a single particle.
  var createParticle = function (sizeRange, locationXRange,
      locationYRange) {
    return new Circle(
        between.apply(null, locationXRange || [10, window.innerWidth - 10]),
        between.apply(null, locationYRange || [10, window.innerHeight - 10]),
        between.apply(null, sizeRange || [4, 8]));
  };

  // Exposed function.
  // Creates many new particles - usually just called once.
  createParticles = function (numParticles, sizeRange,
      locationXRange, locationYRange) {
    return d3.range(numParticles).map(function () {
      return createParticle(sizeRange, locationXRange,
        locationYRange);
    });
  };

  // D3 Update function for particles.
  updateParticles = function () {
    svg.selectAll("circle")
        .data(particles.slice(1))
      .enter().append("svg:circle")
        .attr("r", function (d) { return d.r; })
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .style("fill", function (d, i) { return color(i % 3); });

    svg.selectAll("circle")
      .data(particles.slice(1))
      .exit().remove();
  };

  // Update the root node to match new particles.
  updateRoot = function () {
    root = getParticles()[0];
    root.r = 0;
    root.fixed = true;
  };

  // Initialize particles.
  var particles = createParticles(numParticles * 2000);
  var color = d3.scale.category10();

  getParticles = function () {
    return particles;
  };

  // Updates the number of particles.
  newParticles = function (newNum) {
    while (newNum > particles.length) {
      particles.push(createParticle());
      newNum -= 1;
    }
    while (newNum < particles.length) {
      particles.pop();
    }
    updateParticles();
    updateRoot();
  };
}());
