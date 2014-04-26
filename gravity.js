var d3 = d3;

var width = window.innerWidth;
var height = window.innerHeight;

var between = function (min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

var particles = d3.range(100).map(function () {
  return new Circle(
    between(10, width - 10),
    between(10, height - 10),
    5, 20);
});
