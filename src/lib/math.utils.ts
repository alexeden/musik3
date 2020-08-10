export class MathUtils {
  static lerp(x: number, v0: number, v1: number) {
    return v0 * (1 - x) + v1 * x;
  }

  static randomInt(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  static randomRange(min: number, max: number) {
    return min + Math.random() * (max - min);
  }
}
