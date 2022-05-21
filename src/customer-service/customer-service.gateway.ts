import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { CustomerServiceService } from './customer-service.service';

@WebSocketGateway()
export class CustomerServiceGateway {
  constructor(
    private readonly customerServiceService: CustomerServiceService,
  ) {}

  @SubscribeMessage('customerService')
  test() {
    return this.customerServiceService.test();
  }
}
