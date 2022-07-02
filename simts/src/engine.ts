import {float2} from './float2';
import {randomColor} from './helpers';

export class mover {
  public color: string;

  constructor(
    public id: number,
    public position = new float2(),
    public velocity = new float2()
  ) {
    this.color = randomColor();
  }

  public update(deltaTime: number) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;

    if (this.position.x > 500 || this.position.x < 0) {
      this.velocity.x *= -1;
    }
    if (this.position.y > 500 || this.position.y < 0) {
      this.velocity.y *= -1;
    }
  }

  public toString() {
    return `Mover ${this.id} - Pos: ${this.position.toString()}, Vel: ${this.velocity.toString()}, Color: ${this.color}`;
  }
}
