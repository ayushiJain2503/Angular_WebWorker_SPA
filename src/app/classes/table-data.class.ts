import { childData } from '../interfaces';

export class TableDataClass {
  id: string;
  int: number;
  float: number;
  color: string;
  child: childData;

  constructor(
    id: string,
    int: number,
    float: number,
    color: string,
    child: childData
  ) {
    this.id = id;
    this.int = int;
    this.float = float;
    this.color = color;
    this.child = child;
  }

  getId(): string {
    return this.id;
  }

  getInt(): number {
    return this.int;
  }

  getFloat(): number {
    return this.float;
  }

  getColor(): string {
    return this.color;
  }

  getChild(): childData {
    return this.child;
  }
}
