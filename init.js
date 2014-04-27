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
var updateRoot = updateRoot;
var root = root;
var $ = $;
var Dragdealer = Dragdealer;
var newParticles = newParticles;
var numParticles = numParticles;
// End of linter.

var gravityStrength = 0.2;
var chargeStrength = 0.4;
var chargeFunction = function (d, i) {
  return i ? (Math.random() - 0.8) * chargeStrength * 100 : -4000;
};

var svg = d3.select("#main").append("svg:svg")
  .attr("width", window.innerWidth)
  .attr("height", window.innerHeight);

$(document).ready(function () {
  var gravitySlider = new Dragdealer("gravity", {x: gravityStrength});
  var chargeSlider = new Dragdealer("charge", {x: chargeStrength});
  var particleSlider = new Dragdealer("particles", {x: numParticles});

  updateParticles();
  updateRoot();

  onTick(function () {
    var particles = getParticles();
    var quadTree = d3.geom.quadtree(particles);

    var n = getParticles().length;
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
    gravityStrength = gravitySlider.getValue()[0] * 2.5 + 0.00001;
    chargeStrength = chargeSlider.getValue()[0] * 10;

    var oldParticles = numParticles;
    numParticles = particleSlider.getValue()[0] * 2000;

    newParticles(oldParticles, numParticles);
    updateForce(getParticles(), gravityStrength, chargeFunction);
    resetForce();
  }, 100);
});
