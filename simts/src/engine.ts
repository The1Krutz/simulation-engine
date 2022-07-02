import {Float2} from './float2';
import {randomColor} from './helpers';

export class Mover {
  public Color: string;

  constructor(
    public Id: number,
    public Position = new Float2(),
    public Velocity = new Float2()
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
