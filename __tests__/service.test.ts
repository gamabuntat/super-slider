import Service from '../src/Service/Service';
import Model from '../src/Model/Model';

test('switch active button', () => {
  const service = new Service({} as Model);
  expect(service.getActiveButton()).toBe('buttonS');
});
