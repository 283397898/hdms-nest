import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { ILike, Repository } from 'typeorm';
import { QueryData } from '../class/QueryData';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async findAllProjects(): Promise<Project[]> {
    try {
      return await this.projectRepository
        .createQueryBuilder('project')
        .select([
          'project.projectId',
          'project.address',
          'project.progress',
          'project.username',
          'project.area',
          'project.structure',
        ])
        .where({ status: true })
        .getMany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async insertProject(project: Project): Promise<Project[]> {
    try {
      await this.projectRepository
        .createQueryBuilder()
        .insert()
        .into(Project)
        .values(project)
        .execute();
      return;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchProjects(query: QueryData): Promise<Project[]> {
    const queryStr = `%${query.data.split('').join('%')}%`;
    try {
      return await this.projectRepository
        .createQueryBuilder('project')
        .select([
          'project.projectId',
          'project.address',
          'project.progress',
          'project.username',
          'project.area',
          'project.structure',
        ])
        .where({ status: true })
        .andWhere({ [query.type]: ILike(queryStr) })
        .take(5)
        .getMany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateProject(project: Project): Promise<Project[]> {
    try {
      await this.projectRepository
        .createQueryBuilder()
        .update(Project)
        .set({
          address: project.address,
          progress: project.progress,
          username: project.username,
          area: project.area,
          structure: project.structure,
        })
        .where({ projectId: project.projectId })
        .execute();
      return await this.findAllProjects();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteProject(project: Project): Promise<Project[]> {
    try {
      await this.projectRepository
        .createQueryBuilder()
        .update(Project)
        .set({ status: false })
        .where({ projectId: project.projectId })
        .execute();
      return await this.findAllProjects();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
