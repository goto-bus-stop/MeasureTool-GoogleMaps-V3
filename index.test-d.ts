import { expectError, expectType } from 'tsd';
import MeasureTool from '.';

declare const map: google.maps.Map;

{
  // Options
  new MeasureTool(map);
  new MeasureTool(map, {
    language: 'tr',
  });
}

{
  // Events
  const m = new MeasureTool(map);
  m.addListener('measure_start', () => {});
  m.addListener('measure_end', ({ result }) => {
    expectType<number>(result.length);
  });
  expectError(m.addListener('measure-end', () => {}));
  m.removeListener('measure_start');
  expectError(m.removeListener('unknown'));
}
