var d3 = d3;
var Circle = Circle;

var width = window.innerWidth;
var height = window.innerHeight;

var between = function (min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

var particles = d3.range(2000).map(function () {
  return new Circle(
    between(10, width - 10),
    between(10, height - 10),
    between(4, 8));
});
var color = d3.scale.category10();

var force = d3.layout.force()
  .gravity(0.04)
  .charge(function (d, i) { return (i ? (Math.random() - 0.55) * 60 : -400); })
  .nodes(particles)
  .size([width, height]);

var root = particles[0];
root.r = 0;
root.fixed = true;

force.start();

var svg = d3.select("#main").append("svg:svg")
  .attr("width", width)
  .attr("height", height);

svg.selectAll("circle")
    .data(particles.slice(1))
  .enter().append("svg:circle")
    .attr("r", function (d) { return d.r; })
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; })
    .style("fill", function (d, i) { return color(i % 3); });

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

force.on("tick", function () {
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
  force.resume();
});

setInterval(function () { force.resume(); }, 10);
