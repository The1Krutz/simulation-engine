"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = exports.Mover = void 0;
var Mover = /** @class */ (function () {
    function Mover(Id, Position, Velocity) {
        if (Position === void 0) { Position = new Vector2(); }
        if (Velocity === void 0) { Velocity = new Vector2(); }
        this.Id = Id;
        this.Position = Position;
        this.Velocity = Velocity;
        this.Color = randomColor();
    }
    Mover.prototype.Update = function (deltaTime) {
        this.Position.X += this.Velocity.X * deltaTime;
        this.Position.Y += this.Velocity.Y * deltaTime;
        if (this.Position.X > 500 || this.Position.X < 0) {
            this.Velocity.X *= -1;
        }
        if (this.Position.Y > 500 || this.Position.Y < 0) {
            this.Velocity.Y *= -1;
        }
    };
    Mover.prototype.toString = function () {
        return "Mover ".concat(this.Id, " - Pos: ").concat(this.Position.toString(), ", Vel: ").concat(this.Velocity.toString(), ", Color: ").concat(this.Color);
    };
    return Mover;
}());
exports.Mover = Mover;
var Vector2 = /** @class */ (function () {
    function Vector2(X, Y) {
        if (X === void 0) { X = 0; }
        if (Y === void 0) { Y = 0; }
        this.X = X;
        this.Y = Y;
    }
    Vector2.prototype.toString = function () {
        return "(X:".concat(this.X, ", Y:").concat(this.Y, ")");
    };
    Vector2.Random = function (max, min) {
        if (max === void 0) { max = 100; }
        if (min === void 0) { min = 0; }
        return new Vector2((Math.random() * (max - min)) + min, (Math.random() * (max - min)) + min);
    };
    return Vector2;
}());
exports.Vector2 = Vector2;
function randomColor() {
    function randomHexa() {
        var hexa = "0123456789ABCDEF";
        return hexa[Math.floor(Math.random() * hexa.length)];
    }
    return "#" + randomHexa() + randomHexa() + randomHexa() + randomHexa() + randomHexa() + randomHexa();
}
