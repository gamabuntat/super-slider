import Service from '../../src/slider/Service/Service';

test('create one instance (singleton)', () => {
  const instance1 = Service.getInstance();
  const instance2 = Service.getInstance();
  expect(instance1).toBe(instance2);
});

test('no added duplicate', () => {
  const addResp1 = Service.getInstance().add('test', {});
  expect(addResp1.isNew).toBe(true);
  const addResp2 = Service.getInstance().add('test', {});
  expect(addResp2.isNew).toBe(false);
});

test('remove model correctly', () => {
  Service.getInstance().removeModel('test');
  const addResp = Service.getInstance().add('test', {});
  expect(addResp.isNew).toBe(true);
});

describe('remove test model', () => {
  const cb = jest.fn();

  beforeEach(() => {
    cb.mockClear();
    Service.getInstance().removeModel('test');
  });

  test('subscribe on model update => call callback', () => {
    Service.getInstance().subscribe('test', cb);
    Service.getInstance().add('test', {});
    expect(cb.mock.calls.length).toBe(1);
  });

  test('update model correctly', () => {
    const service = Service.getInstance();
    service.subscribe('test', cb);
    const { model } = service.add('test', {});
    service.updateModel({ ...model, from: -123, max: 999.999 });
    expect(cb.mock.calls[1][0].max).toBe(999.999);
    expect(cb.mock.calls[1][0].from).toBe(-123);
  });
});

