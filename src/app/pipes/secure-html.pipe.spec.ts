import { SecureHtmlPipe } from './secure-html.pipe';

describe('SecureHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new SecureHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
