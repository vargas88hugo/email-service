import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Test1: Please go to the path /api to use Swagger Documentation';
  }
}
