var updateForce, resetForce, resumeForce, onTick;
var d3 = d3;

(function () {
  var force = d3.layout.force();

  updateForce = function (particles, gravity, charge, size) {
    force
      .gravity(gravity || 0.8)
      .charge(charge || function (d, i) { return (i ? (Math.random() - 0.6) * 200 : -4000); })
      .nodes(particles)
      .size(size || [window.innerWidth, window.innerHeight]);
  };

  resetForce = function () {
    force.start();
  };

  resumeForce = function () {
    force.resume();
  };

  onTick = function (callback) {
    force.on("tick", callback);
  };
}());

var collide = function (node) {
  var r = node.r + 2,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.r + quad.point.r;
      if (l < r) {
        l = (l - r) / l * 0.5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
};
