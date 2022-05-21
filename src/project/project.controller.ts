import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../company/roles.guard';
import { Roles } from '../company/roles.decorator';
import { ProjectService } from './project.service';
import { Project } from 'src/entities/project.entity';
import { Role } from 'src/entities/employee.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('company/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SERVICE)
  @Get('list')
  async getAllProjects() {
    return this.projectService.findAllProjects();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SERVICE)
  @Get('search')
  async searchProjects(@Query() queryData) {
    return this.projectService.searchProjects(queryData);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SERVICE)
  @Put()
  async updateProject(@Body() project: Project) {
    return this.projectService.updateProject(project);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SERVICE)
  @Delete()
  async deleteProject(@Body() project: Project) {
    return this.projectService.deleteProject(project);
  }
}
