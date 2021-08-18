import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfirmedAccountGuard } from '../customer/confirmed-account.guard';
import { CategoryService } from './category.service';
import { GetCustomer } from '../customer/get-customer.decorator';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Message } from '../interfaces/message.interface';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
@UseGuards(AuthGuard(), ConfirmedAccountGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {
  }

  @Get()
  getAllCategories(@GetCustomer() customer): Promise<Category[]> {
    return this.categoryService.getAllCategories(customer);
  }

  @Get(':id')
  getCategoryById(@Param('id', ParseIntPipe) id: number, @GetCustomer() customer): Promise<Category> {
    return this.categoryService.getCategoryById(id, customer);
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto, @GetCustomer() customer): Promise<Message> {
    return this.categoryService.createCategory(createCategoryDto, customer);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number, @GetCustomer() customer): Promise<Message> {
    return this.categoryService.deleteCategory(id, customer);
  }

  @Patch()
  updateCategory(@Body() updateCategoryDto: UpdateCategoryDto, @GetCustomer() customer): Promise<Message> {
    return this.categoryService.updateCategory(updateCategoryDto, customer);
  }
}

