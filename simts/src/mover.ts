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
    return `mover ${this.id} - pos: ${this.position.toString()}, vel: ${this.velocity.toString()}, color: ${this.color}`;
  }

  public static fromRandom(id?: number, position?: float2, velocity?: float2): mover {
    return new mover(
      id != null ? id : mover.randomId(),
      position != null ? position : float2.fromRandom({max: 500, min: 50}),
      velocity != null ? velocity : float2.fromRandom({max: 150, min: 50}),
    );
  }

  private static randomId() {
    return Math.floor(Math.random() * 100000);
  }
}
