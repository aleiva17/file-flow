import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth(): string {
    // You can add more complex logic here: to check database connections, external services, etc.
    return 'Server is online and healthy!';
  }
}