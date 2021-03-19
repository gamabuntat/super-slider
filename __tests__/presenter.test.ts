import Presenter from '../src/Presenter/Presenter';

test('', () => {
  const s = {
    service: {
      sendButtonData: jest.fn(),
    }
  };
  Presenter.prototype.getButtonData.call(s, [42]);
  expect(s.service.sendButtonData.mock.calls.length).toBe(1);
  expect(s.service.sendButtonData.mock.calls[0][0]).toBe(42);
});
