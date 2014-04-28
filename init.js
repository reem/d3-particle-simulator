// Global constants, can be set by sliders.
var gravityStrength = 0.2;
var chargeStrength = 0.4;
var chargeFunction = function (d, i) {
  //                              the mouse charge value ->  ****
  return i ? (Math.random() - 0.8) * chargeStrength * 100 : -4000;
};

// Create the global svg element.
var svg = d3.select("#main").append("svg:svg")
  .attr("width", window.innerWidth)
  .attr("height", window.innerHeight);

$(document).ready(function () {
  // Create our wonderful sliders using dragdealer.js
  var gravitySlider = new Dragdealer("gravity", {x: gravityStrength});
  var chargeSlider = new Dragdealer("charge", {x: chargeStrength});
  var particleSlider = new Dragdealer("particles", {x: numParticles});

  // Create our particles and root.
  updateParticles();
  updateRoot();

  // Register the collision detection to be checked
  // on every tick.
  onTick(function () {
    var particles = getParticles();
    var quadTree = d3.geom.quadtree(particles);

    var n = getParticles().length;
    for (var i = 1; i < n; i++) {
      // Map our collision function over the three.
      quadTree.visit(collide(particles[i]));
    }

    // Update the position of all circles.
    svg.selectAll("circle")
      .attr("cx", function (d) { return d.x; })
      .attr("cy", function (d) { return d.y; });
  });

  // Move the root node around whenever we move the mouse.
  svg.on("mousemove", function () {
    var p1 = d3.mouse(this);
    root.px = p1[0];
    root.py = p1[1];
    resumeForce();
  });

  // Our global event loop.
  // Could be refactored to use window.requestAnimationFrame.
  d3.timer(function () {
    // Set the strength of gravity and charge by getting them from
    // the slider.
    gravityStrength = gravitySlider.getValue()[0] * 2.5 + 0.00001;
    chargeStrength = chargeSlider.getValue()[0] * 10;

    // Set the number of particles and update them.
    numParticles = particleSlider.getValue()[0] * 2000;
    newParticles(numParticles);

    // Update our force with the new values.
    updateForce(getParticles(), gravityStrength, chargeFunction);

    // Reset the force's alpha.
    resetForce();
  }, 200);
});
