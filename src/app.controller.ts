import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('General')
@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({
    summary: 'Check the health of the server.',
    description: 'This endpoint is used to check if the server is online and healthy.',
  })
  @ApiResponse({
    status: 200,
    description: 'Server is online and healthy.',
  })
  @ApiResponse({
    status: 503,
    description: 'Server is unavailable or not healthy.',
  })
  getHealth(): string {
    return this.appService.checkHealth();
  }
}
