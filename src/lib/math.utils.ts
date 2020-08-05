export class MathUtils {
  static randomRange(min: number, max: number) {
    return min + Math.random() * (max - min);
  }

  static randomInt(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  static map(value: number, min1: number, max1: number, min2: number, max2: number) {
    return MathUtils.lerp(MathUtils.norm(value, min1, max1), min2, max2);
  }

  static lerp(value: number, min: number, max: number) {
    return min + (max - min) * value;
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
