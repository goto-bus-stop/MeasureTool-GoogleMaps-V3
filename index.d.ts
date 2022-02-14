/// <reference types="google.maps" />

export enum UnitTypeId {
  METRIC,
  IMPERIAL,
  NAUTICAL,
}

export type SegmentPoint = {
  lat: number;
  lng: number;
};
export type SegmentLength = {
  text: string;
  value: number;
};
export type Segment = {
  end_location: SegmentPoint;
  length: SegmentLength;
  start_location: SegmentPoint;
};
export type MeasureToolOptions = {
  showSegmentLength?: boolean;
  showAccumulativeLength?: boolean;
  contextMenu?: boolean;
  tooltip?: boolean;
  unit?: UnitTypeId;
  initialSegments?: Segment[];
  language?: string;
  invertColor?: boolean;
};

export type MeasureResult = {
  area: number;
  areaText: string;
  length: number;
  lengthText: string;
  points: SegmentPoint[];
  segments: Segment[];
};

export type MeasureEvent = {
  result: MeasureResult;
};

export default class MeasureTool {
  readonly lengthText: string;
  readonly areaText: string;
  readonly length: number;
  readonly area: number;
  readonly segments: Segment[];
  readonly points: SegmentPoint[];
  static UnitTypeId: typeof UnitTypeId;

  constructor(map: google.maps.Map, options?: MeasureToolOptions);

  start(initialPoints?: SegmentPoint[]): void;
  end(): void;
  addListener(event: 'measure_start', cb: () => void): void;
  addListener(event: 'measure_end', cb: (event: MeasureEvent) => void): void;
  removeListener(event: 'measure_start' | 'measure_end'): void;

  setOption<K extends keyof MeasureToolOptions>(
    option: K,
    value: MeasureToolOptions[K]
  ): void;
}
