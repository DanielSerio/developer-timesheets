import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Mockable } from '../shared/mockable.decorator';
import { MockableController } from '../shared/mockable.controller';
import { MOCK_CATEGORIES } from './mock/data.mock';

@Controller('categories')
export class CategoriesController extends MockableController {
  constructor(private readonly categoriesService: CategoriesService) {
    super();
  }

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
    if (mock) {
      return this.simulateResponse<typeof MOCK_CATEGORIES>(() => MOCK_CATEGORIES);
    }

    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(
    @Mockable() mock: boolean,
    @Param('id') id: string
  ) {
    if (mock) {
      const found = await this.simulateResponse<typeof MOCK_CATEGORIES[number] | null>(() => {
        return MOCK_CATEGORIES.find((category) => category.id === +id) ?? null;
      });

      if (!found) {
        throw new NotFoundException();
      }

      return found;
    }

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
