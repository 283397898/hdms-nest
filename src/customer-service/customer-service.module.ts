import { Module } from '@nestjs/common';
import { CustomerServiceService } from './customer-service.service';
import { CustomerServiceGateway } from './customer-service.gateway';

@Module({
  providers: [CustomerServiceGateway, CustomerServiceService],
})
export class CustomerServiceModule {}
