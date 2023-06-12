import { Direction } from "src/app/typings/types/direction.type";
import { Vector } from "src/app/typings/interfaces/vector.interface";

export interface State2d {
  x: number;
  y: number;
  image?: HTMLElement;

  width: number;
  height: number;

  centerFromLeft: number;
  centerFromTop: number;

  rotationAngle: Direction;
  speed: Vector;
}
