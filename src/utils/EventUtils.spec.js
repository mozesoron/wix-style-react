import {chainEventHandlers} from './EventUtils';

describe('chainEventHandlers', () => {
  const newEvent = () => ({defaultPrevented: false});

  it('should run 2 handler', () => {
    const fn1 = jest.fn(), fn2 = jest.fn();
    chainEventHandlers(fn1, fn2)(newEvent());
    expect(fn1.mock.calls.length).toBe(1);
    expect(fn2.mock.calls.length).toBe(1);
  });

  it('should skip undefined handler', () => {
    const fn2 = jest.fn();
    chainEventHandlers(undefined, fn2)(newEvent());
    expect(fn2.mock.calls.length).toBe(1);
  });

  it('should skip undefined handler', () => {
    const fn2 = jest.fn();
    chainEventHandlers(undefined, fn2)(newEvent());
    expect(fn2.mock.calls.length).toBe(1);
  });

});
