import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Customer } from '../customer/customer.entity';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Message } from '../interfaces/message.interface';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {
  }

  async getAllCategories(customer: Customer): Promise<Category[]> {
    return this.categoriesRepository.find({ customer });
  }

  async getCategoryById(id: number, customer: Customer): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ id, customer });
    if (!category) throw new NotFoundException(`Category with ID '${id}' doesn't exist.`);

    return category;
  }

  async createCategory(createCategoryDto: CreateCategoryDto, customer: Customer): Promise<Message> {
    const { category_name } = createCategoryDto;
    if (await this.categoriesRepository.findOne({ category_name, customer })) {
      throw new ConflictException(`Category with the name '${category_name}' already exists.`);
    }

    await this.categoriesRepository.insert({ ...createCategoryDto, customer });
    return { statusCode: 201, message: 'New category has been successfully created.' };
  }

  async deleteCategory(id: number, customer: Customer): Promise<Message> {
    const result = await this.categoriesRepository.delete({ id, customer });
    if (result.affected === 0) throw new NotFoundException(`Category with ID '${id}' doesn't exist.`);

    return { statusCode: 200, message: 'Category has been successfully deleted.' };
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto, customer: Customer): Promise<Message> {
    const { id, category_name, description } = updateCategoryDto;

    if (!category_name && !description) throw new BadRequestException('Nothing to update');

    if (!await this.categoriesRepository.findOne({ id, customer })) {
      throw new NotFoundException(`Category with ID '${id}' doesn't exist.`);
    }

    delete updateCategoryDto.id;
    await this.categoriesRepository.update({ id, customer }, updateCategoryDto);
    return { statusCode: 200, message: 'Category has been successfully updated.' };
  }
}
