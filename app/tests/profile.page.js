import { Selector } from 'testcafe';

class ProfilePage {
  constructor() {
    this.pageId = '#list-item-nav';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const profilePage = new ProfilePage();
