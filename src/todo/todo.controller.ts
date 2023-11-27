import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoAddTDO } from './DTOs/TodoAddTDO';
import { TodoEntity } from './todo-entity/todo-entity';
import { TodoUpdateTDO } from './DTOs/TodoUpdateTDO';

@Controller('todo')
export class TodoController {

    constructor(
        private todoService: TodoService,
    )
    {

    }
    @Post('add')
    async AddTodo(@Body() todoDto: TodoAddTDO): Promise<TodoEntity>{
        return await this.todoService.addtodo(todoDto);
    } 
    @Patch('update/:id')
    async UpdateTodo(@Body() todoDto: Partial<TodoUpdateTDO>,@Param() id:number): Promise<TodoEntity>{
        return await this.todoService.UpdateToDo(id,todoDto);
    }
    @Delete('delete/:id')
    async DeleteToDo(@Param() id:number): Promise<void>
    {
        return await this.todoService.DeleteTodo(id);
    }
    @Get('status')
    async GetToDoStatus()
    {
        return await this.todoService.getToDoCountByStatus();
    }
    @Get('/todo-by')
    async getTodoByNameDescriptionStatus(
        @Query('name') name: string,
        @Query('description') description: string,
        @Query('status') status: string,
      ): Promise<TodoEntity[]> {
        return await this.todoService.getAll(
          name,
          description,
          status,
        );
      }
    @Get(':id')
    async GetById(@Param() id:number)
    {
        return await this.todoService.getById(id);
    }
    @Get('/todo-paginated')
      async getAllTodoPaginated(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
      ): Promise<TodoEntity[]> {
        return this.todoService.getAllTodosPaginated(page, pageSize);
      }
    
}
