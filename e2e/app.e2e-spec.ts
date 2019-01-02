import { Mist19Page } from './app.po';

describe('mist19 App', () => {
  let page: Mist19Page;

  beforeEach(() => {
    page = new Mist19Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
