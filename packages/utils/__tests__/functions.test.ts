import { callAllHandler, runIfFn } from '../src';

describe('Functions test', () => {
  test('should run function if function else return value', () => {
    expect(runIfFn(() => 1 + 1)).toStrictEqual(2);
    expect(runIfFn(2)).toStrictEqual(2);
  });

  test('should call all passed functions on event triggered', () => {
    const event = { target: { value: 1 } };

    let val1 = 0,
      val2 = 0;

    const func1 = (_event: any) => {
      val1 = _event.target.value + 1;

      return val1;
    };
    const func2 = (_event: any) => {
      val2 = _event.target.value + 2;

      return val2;
    };

    callAllHandler(func1, func2)(event);

    expect(val1).toStrictEqual(2);
    expect(val2).toStrictEqual(3);
  });
});
