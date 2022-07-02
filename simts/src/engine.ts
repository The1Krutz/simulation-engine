
export class Mover {
  public Color: string;

  constructor(
    public Id: number,
    public Position = new Vector2(),
    public Velocity = new Vector2()
  ) {
    this.Color = randomColor();

  }

  public Update(deltaTime: number) {
    this.Position.X += this.Velocity.X * deltaTime;
    this.Position.Y += this.Velocity.Y * deltaTime;

    if (this.Position.X > 500 || this.Position.X < 0) {
      this.Velocity.X *= -1;
    }
    if (this.Position.Y > 500 || this.Position.Y < 0) {
      this.Velocity.Y *= -1;
    }
  }

  public toString() {
    return `Mover ${this.Id} - Pos: ${this.Position.toString()}, Vel: ${this.Velocity.toString()}, Color: ${this.Color}`;
  }
}

export class Vector2 {
  constructor(
    public X = 0,
    public Y = 0
  ) { }

  public toString() {
    return `(X:${this.X}, Y:${this.Y})`;
  }

  public static Random(max = 100, min = 0) {
    return new Vector2(
      (Math.random() * (max - min)) + min,
      (Math.random() * (max - min)) + min
    );
  }
}


function randomColor() {
  function randomHexa() {
    const hexa = '0123456789ABCDEF';
    return hexa[Math.floor(Math.random() * hexa.length)];
  }
  return '#' + randomHexa() + randomHexa() + randomHexa() + randomHexa() + randomHexa() + randomHexa();
}