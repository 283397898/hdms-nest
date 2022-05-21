import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { DecodeMiddleware } from './middleware/decode.middleware';
// import { CustomerServiceModule } from './customer-service/customer-service.module';
import { ClientModule } from './client/client.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '981221HpC',
      database: 'hdmsdb',
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    CompanyModule,
    // CustomerServiceModule,
    ClientModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecodeMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
