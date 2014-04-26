// Make the linter happy.
var d3 = d3;
var Circle = Circle;
var getParticles = getParticles;
var updateParticles = updateParticles;
var onTick = onTick;
var resumeForce = resumeForce;
var updateForce = updateForce;
var collide = collide;
var resetForce;
// End of linter.

var gravityStrength = 0.8;
var chargeStrength = function (d, i) { return i ? (Math.random() - 0.6) * 200 : -4000; };

(function () {

  var root = getParticles()[0];
  root.r = 0;
  root.fixed = true;

  var svg = d3.select("#main").append("svg:svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

  updateParticles(svg);

  onTick(function () {
    var particles = getParticles();
    var quadTree = d3.geom.quadtree(particles);

    var n = getParticles().lenght;
    for (var i = 1; i < n; i++) {
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

  setInterval(function () {
    updateForce(getParticles(), gravityStrength, chargeStrength);
    resetForce();
  }, 50);
}());
