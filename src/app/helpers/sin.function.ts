export function sin(degrees: number): number {
  let radians = degrees * Math.PI/180;
  return Math.sin(radians);
}
