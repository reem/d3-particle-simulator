var gravityStrength = 0.8;
var chargeStrength = function (d, i) { return i ? (Math.random() - 0.6) * 400 : -4000};
var numParticles = 2000;

(function () {
  var particles = createParticles(2000);
  var color = d3.scale.category10();

  var root = particles[0];
  root.r = 0;
  root.fixed = true;

  var svg = d3.select("#main").append("svg:svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

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

  updateParticles(svg, particles, color);

  setInterval(function () {
    updateForce(particles);
    resetForce();
  }, 50);
}());
