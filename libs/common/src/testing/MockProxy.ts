import { MockType } from './MockType';

/**
 * Used to mock some instance methods automatically.
 * @usage
 const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: MyService, useFactory: MockProxy },
      ],
    }).compile();
 const myServiceMock = module.get(MyService);


 it(... {
      myServiceMock.mockReturnValueOnce('data');
      const result = await foo();
      expect(myServiceMock.bar).toBeCalledWith('fooArgs');
      expect(result).toEqual('data');
    });
 *
 * @constructor
 */

export const MockProxy = <T>(): MockType<T> => {
  return new Proxy(
    {},
    {
      get(target: {}, property: PropertyKey, receiver: any): any {
        if (property === 'then') {
          return Promise.resolve();
        }
        if (property in target) {
          return target[property];
        }
        const fn = jest.fn(() => receiver);
        target[property] = fn;
        return fn;
      },
    },
  ) as MockType<T>;
};
