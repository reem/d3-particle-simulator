// Make the linter happy.
var d3 = d3;
var Circle = Circle;
var resumeForce = resumeForce;
var updateForce = updateForce;
var resetForce = resetForce;
var onTick = onTick;
var collide = collide;
// End of linter.

var between = function (min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

var createParticles = function (numParticles,
  sizeRange, locationXRange, locationYRange) {
  return d3.range(numParticles).map(function () {
    return new Circle(
      between.apply(null, locationXRange || [10, window.innerWidth - 10]),
      between.apply(null, locationYRange || [10, window.innerHeight - 10]),
      between.apply(null, sizeRange || [2, 4]));
  });
};

var particles = createParticles(2000);
var color = d3.scale.category10();

updateForce(particles);
resetForce();

var root = particles[0];
root.r = 0;
root.fixed = true;

var svg = d3.select("#main").append("svg:svg")
  .attr("width", window.innerWidth)
  .attr("height", window.innerHeight);

svg.selectAll("circle")
    .data(particles.slice(1))
  .enter().append("svg:circle")
    .attr("r", function (d) { return d.r; })
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; })
    .style("fill", function (d, i) { return color(i % 3); });

onTick(function () {
  var quadTree = d3.geom.quadtree(particles);

  for (var i = 1; i < particles.length; i++) {
    quadTree.visit(collide(particles[i]));
  }

  svg.selectAll("circle")
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; });
});

svg.on("mousemove", function () {
  var p1 = d3.mouse(this);
  root.px = p1[0];
  root.py = p1[1];
  resumeForce();
});

setInterval(resumeForce, 100);
