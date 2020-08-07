export class MathUtils {
  static randomRange(min: number, max: number) {
    return min + Math.random() * (max - min);
  }

  static randomInt(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  static lerp(x: number, v0: number, v1: number) {
    return v0 * (1 - x) + v1 * x;
  }

  static norm(value: number, min: number, max: number) {
    return (value - min) / (max - min);
  }

  static shuffle(o: any[]) {
    for (let j, x, i = o.length; i; j = parseInt(`${Math.random() * i}`), x = o[--i], o[i] = o[j], o[j] = x);

    return o;
  }

  static clamp(value: number, min: number, max: number) {
    return Math.max(Math.min(value, max), min);
  }
}
