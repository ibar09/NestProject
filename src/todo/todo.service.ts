import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoAddTDO } from './DTOs/TodoAddTDO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo-entity/todo-entity';
import { TodoUpdateTDO } from './DTOs/TodoUpdateTDO';
import { StatusEnum } from './enum/StatusEnum';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository:Repository<TodoEntity>,
    ){}

    /**
     * 
     * @param addedTodo 
     * @returns 
     */    
    async addtodo(addedTodo:TodoAddTDO):Promise<TodoEntity>{    
        return await this.todoRepository.save(addedTodo);

    }
    async UpdateToDo(id:number,updatedToDo:Partial<TodoUpdateTDO>):Promise<TodoEntity>{

        return await this.todoRepository.preload({
            id,
            ...updatedToDo,
            
        });

    }
    async DeleteTodo(id:number):Promise<void>{
        const todo= await this.todoRepository.findOneBy({
            id
        })
        if(todo!=null)
         await this.todoRepository.softDelete(todo);
        else
        throw new NotFoundException();

    }
    async RestoreTodo(id:number):Promise<void>
    {
    
         await this.todoRepository.restore(id);

    }
    async getToDoCountByStatus()
    {
        const statusCounts= {};
        for(const status of Object.values(StatusEnum))
        {
            const count = await this.todoRepository.count({
                where: {status}
            });
            statusCounts[status]= count;
        }
        return statusCounts;
    }
    async getAll(name:string, description:string,status:string): Promise<TodoEntity[]>
    {
        const queryBuilder = this.todoRepository.createQueryBuilder('todo')
        .select(['todo.name','todo.description','todo.status']);
        if(name)
        {
            queryBuilder.where('todo.name LIKE :nom', {nom: `%${name}%`});
        }
        if(description)
        {
            queryBuilder.orWhere('todo.description LIKE :description', {description: `%${description}%`})
        }
        if(status)
        {
            queryBuilder.andWhere('todo.status = :st', {st:status});
        }
        return await queryBuilder.getMany();
    }
    async getById(id:number): Promise<TodoEntity>
    {
        const todo= await this.todoRepository.findOneBy({
            id
        });
        if(todo!=null)
         return todo;
        else
        throw new NotFoundException();
    }
    async getAllTodosPaginated(
        page: number,
        pageSize: number,
      ): Promise<TodoEntity[]> {
        const todos = await this.todoRepository
          .createQueryBuilder('todo')
          .skip((page - 1) * pageSize)
          .take(pageSize)
          .getMany();
        return todos;
      }

    

}
