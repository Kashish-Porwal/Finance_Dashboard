import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('/api/docs', 302)
  getDocs() {
    // This will securely redirect visitors to the interactive documentation.
  }
}
