import { Vector } from "src/app/typings/interfaces/vector.interface";
import { cos } from "../helpers/cos.function";
import { sin } from "../helpers/sin.function";

export const sumVectors = (...vectors): Vector => {
  let x = 0;
  let y = 0;

  vectors.forEach(({ direction, value }) => {
    x += cos(direction) * value;
    y += sin(direction) * value;
  });

  // calcAngleDegrees
  const direction = Math.atan2(y, x) * 180 / Math.PI;

  const value = Math.sqrt((x*x) + (y*y));

  return { direction, value };
}
