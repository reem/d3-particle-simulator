var Vector = function (x, y) {
  this.x = x;
  this.y = y;
};

var Circle = function (x, y, r) {
  Vector.call(this, x, y);
  this.r = r;
};

Circle.prototype = Object.create(Vector.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.area = function () {
  return this.r * this.r * Math.PI;
};

Circle.prototype.diameter = function () {
  return this.r * 2;
};
