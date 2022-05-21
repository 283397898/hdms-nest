import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { RolesGuard } from '../company/roles.guard';
import { Roles } from '../company/roles.decorator';
import { User } from '../entities/user.entity';
import { Role } from '../entities/employee.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('company/user')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SERVICE)
  @Get('list')
  async getAllUsers() {
    return this.clientService.findAllUsers();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SERVICE)
  @Get('search')
  async searchUsers(@Query() queryData) {
    return this.clientService.searchUsers(queryData);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SERVICE)
  @Put()
  async updateUser(@Body() user: User) {
    return this.clientService.updateUser(user);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SERVICE)
  @Delete()
  async deleteUser(@Body() user: User) {
    return this.clientService.deleteUser(user);
  }
}
