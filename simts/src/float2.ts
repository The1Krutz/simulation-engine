
export class Float2 {
  constructor(
    public X = 0,
    public Y = 0
  ) { }

  public toString() {
    return `(X:${this.X}, Y:${this.Y})`;
  }

  public static Random(max = 100, min = 0) {
    return new Float2(
      (Math.random() * (max - min)) + min,
      (Math.random() * (max - min)) + min
    );
  }
}
