var Vector = function (x, y) {
  this.x = x;
  this.y = y;
};

Vector.prototype.magnitude = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.scale = function (scalar) {
  return new Vector(scalar * this.x, scalar * this.y);
};

Vector.prototype.add = function (other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

Vector.prototype.normalize = function () {
  return this.scale(1 / this.magnitude());
};

Vector.prototype.subtract = function (other) {
  return this.add(other.scale(-1));
};

Vector.prototype.distance = function (other) {
  return this.subtract(other).magnitude();
};

Vector.prototype.isEqual = function (other) {
  return this.x === other.x && this.y === other.y;
};

Vector.prototype.invertX = function () {
  return new Vector(this.x * -1, this.y);
};

Vector.prototype.invertX = function () {
  return new Vector(this.x, this.y * -1);
};

Vector.prototype.invert = function () {
  return this.scale(-1);
};

Vector.prototype.dotProduct = function (other) {
  return (this.x * other.x) + (this.y * other.y);
};
