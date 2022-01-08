import Service from './Service';

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

  test('validate to value correctly', () => {
    const { model } = Service.getInstance().add('test', {
      to: 9,
      isInterval: true,
    });
    expect(model.to).toBe(9);
  });

  test('validate step value correctly', () => {
    const service = Service.getInstance();
    const model1 = service.add('test', { step: 0 }).model;
    expect(model1.step).not.toBe(0);
  });

  test('added various models whith various id', () => {
    const service = Service.getInstance();
    const model1 = service.add('', {}).model;
    const model2 = service.add('', {}).model;
    const id1 = model1.id;
    const id2 = model2.id;
    service.removeModel(id1);
    service.removeModel(id2);
    expect(id1).not.toBe(id2);
  });
});
