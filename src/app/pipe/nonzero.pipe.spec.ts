import { NonzeroPipe } from './nonzero.pipe';

describe('NonzeroPipe', () => {
  it('create an instance', () => {
    const pipe = new NonzeroPipe();
    expect(pipe).toBeTruthy();
  });
});
