var numParticles = 0.5;
var createParticles, updateParticles, getParticles, newParticles, root, updateRoot;

var between = function (min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

(function () {
  var createParticle = function (sizeRange, locationXRange,
      locationYRange) {
    return new Circle(
        between.apply(null, locationXRange || [10, window.innerWidth - 10]),
        between.apply(null, locationYRange || [10, window.innerHeight - 10]),
        between.apply(null, sizeRange || [4, 8]));
  };

  createParticles = function (numParticles, sizeRange,
      locationXRange, locationYRange) {
    return d3.range(numParticles).map(function () {
      return createParticle(sizeRange, locationXRange,
        locationYRange);
    });
  };

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

  updateRoot = function () {
    root = getParticles()[0];
    root.r = 0;
    root.fixed = true;
  };

  var particles = createParticles(numParticles * 2000);
  var color = d3.scale.category10();

  getParticles = function () {
    return particles;
  };

  newParticles = function (newParticles) {
    while (newParticles > particles.length) {
      particles.push(createParticle());
      newParticles -= 1;
    }
    while (newParticles < particles.length) {
      particles.pop();
    }
    updateParticles();
    updateRoot();
  };
}());
