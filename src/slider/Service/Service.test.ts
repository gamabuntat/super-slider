import Service from './Service';

const getDefaultModel = () => ({
  min: 0,
  max: 10,
  from: -Infinity,
  to: Infinity,
  step: 1,
  isInterval: false,
  isVertical: false,
  isLabel: true,
  isScale: true,
  id: 'test',
});

test('create one instance (singleton)', () => {
  const instance1 = Service.getInstance();
  const instance2 = Service.getInstance();
  expect(instance1).toBe(instance2);
});

test('remove model correctly', () => {
  Service.getInstance().add('test', {});
  Service.getInstance().removeModel('test');
  expect(Service.getInstance().findModelIndex('test')).toBe(-1);
});

test('no added duplicate', () => {
  Service.getInstance().add('test', {});
  expect(Service.getInstance().findModelIndex('test')).toBe(0);
  Service.getInstance().add('test', {});
  expect(Service.getInstance().findModelIndex('test')).toBe(0);
});

describe('remove test model', () => {
  const service = Service.getInstance();
  const cb = jest.fn((model: Model) => model);

  beforeEach(() => {
    cb.mockClear();
    Service.getInstance().removeModel('test');
  });

  test('subscribe on model update => call callback', () => {
    service.subscribe('test', cb);
    service.add('test', {});
    expect(cb.mock.calls.length).toBe(1);
  });

  test('update model correctly', () => {
    service.subscribe('test', cb);
    service.updateModel({ ...getDefaultModel(), from: -123, max: 999.999 });
    expect(cb.mock.calls[0][0].max).toBe(999.999);
    expect(cb.mock.calls[0][0].from).toBe(-123);
  });

  test('validate to value correctly', () => {
    service.subscribe('test', cb);
    service.add('test', { to: 11, isInterval: true });
    expect(cb.mock.results[0].value.to).toBe(10);
  });

  test('validate step value correctly', () => {
    const f = jest.fn((model: Model) => model);
    service.subscribe('test', f);
    service.add('test', { step: 0 });
    expect(f.mock.results[0].value.step).not.toBe(0);
  });
});
