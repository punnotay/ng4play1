import { Ng4play1Page } from './app.po';

describe('ng4play1 App', () => {
  let page: Ng4play1Page;

  beforeEach(() => {
    page = new Ng4play1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
