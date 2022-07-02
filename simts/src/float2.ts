
export class float2 {
  constructor(
    public x = 0,
    public y = 0
  ) { }

  public toString() {
    return `(X:${this.x}, Y:${this.y})`;
  }

  public static fromRandom({max = 100, min = 0}) {
    return new float2(
      (Math.random() * (max - min)) + min,
      (Math.random() * (max - min)) + min
    );
  }
}
