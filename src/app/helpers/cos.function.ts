export const cos = (degrees: number): number => {
  let radians = degrees * Math.PI/180;
  return Math.cos(radians);
}
