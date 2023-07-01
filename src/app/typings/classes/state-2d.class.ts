import { Direction } from "src/app/typings/types/direction.type";
import { Vector } from "src/app/typings/interfaces/vector.interface";
import { IState2d } from "src/app/typings/interfaces/state-2d.interface";

export class State2d implements IState2d {
  constructor(state2d: IState2d) {
    Object.entries(state2d).forEach(([key, value]) => this[key] = value);
  }
  x: number;
  y: number;
  image?: HTMLElement;

  width: number;
  height: number;

  centerFromLeft: number;
  centerFromTop: number;

  rotationAngle: Direction;
  speed: Vector;
  massKg: number;
  g: 10;
  fps: 30;
  frameTimer: 0;

  get frameInterval() {
    return 1000/this.fps;
  }
}
