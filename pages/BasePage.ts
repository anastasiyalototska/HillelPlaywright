export class BasePage {
    constructor(page) {
      this.page = page;
      this.baseUrl = 'https://guest:welcome2qauto@qauto.forstudy.space';
    }
  
    async open() {
      await this.page.goto(this.baseUrl);
    }
  }
  