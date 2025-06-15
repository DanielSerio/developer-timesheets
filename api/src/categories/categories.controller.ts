import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Mockable } from 'src/shared/mockable.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  create(
    @Mockable() mock: boolean,
    @Body() createCategoryDto: CreateCategoryDto
  ) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Mockable() mock: boolean
  ) {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(
    @Mockable() mock: boolean,
    @Param('id') id: string
  ) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Mockable() mock: boolean,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(
    @Mockable() mock: boolean,
    @Param('id') id: string
  ) {
    return this.categoriesService.remove(+id);
  }
}
