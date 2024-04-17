export type AqIndex = 0 | 1 | 2 | 3 | 4 | 5;

export interface Pollution {
  coord: [number, number];
  list: {
    dt: number;
    main: {
      aqi: AqIndex;
    };
  }[];
}
