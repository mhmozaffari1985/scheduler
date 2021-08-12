import {
  reducer
} from 'reducers/application';

describe("Application Reducer", () => {
  it.skip("thows an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /Tried to reduce with unsupported action type: /i
    );
  });
});