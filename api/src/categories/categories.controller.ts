import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Mockable } from '../shared/mockable.decorator';
import { MockableController } from '../shared/mockable.controller';
import { MOCK_CATEGORIES } from './mock/data.mock';
import { MockCategory } from './mock/category.mock';
import { Pretty } from '../types/utility';

@Controller('categories')
export class CategoriesController extends MockableController {
  constructor(private readonly categoriesService: CategoriesService) {
    super();
  }

  private handleMockCreate(createCategoryDto: CreateCategoryDto) {
    const nextIndex = MOCK_CATEGORIES.length;

    const newCategory = new MockCategory({ name: createCategoryDto.name, index: nextIndex });

    return this.simulateResponse(() => newCategory);
  }

  private handleMockGetMany() {
    return this.simulateResponse<typeof MOCK_CATEGORIES>(() => MOCK_CATEGORIES);
  }

  private async handleMockGetOne(id: number) {
    const found = await this.simulateResponse<typeof MOCK_CATEGORIES[number] | null>(() => {
      return MOCK_CATEGORIES.find((category) => category.id === id) ?? null;
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  private async handleMockUpdate(id: number, updateCategoryDto: UpdateCategoryDto) {
    const found = await this.handleMockGetOne(id);

    Object.assign(found, updateCategoryDto);

    return found;
  }

  private async handleMockDelete(id: number) {
    await this.handleMockGetOne(id);

    type Res = Pretty<DeleteResult>;

    return {
      raw: '',
      affected: 1
    } satisfies Res;
  }

  private async handleMockDeleteMany(ids: number[]) {
    return this.simulateResponse(() => {
      type Res = Pretty<DeleteResult>;

      return {
        raw: '',
        affected: ids.length
      } satisfies Res;
    });
  }


  @Post()
  create(
    @Mockable() mock: boolean,
    @Body() createCategoryDto: CreateCategoryDto
  ) {
    if (mock) {
      return this.handleMockCreate(createCategoryDto);
    }

    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Mockable() mock: boolean
  ) {
    if (mock) {
      return this.handleMockGetMany();
    }

    return this.categoriesService.findAll();
  }

  @Patch('delete')
  deleteMany(
    @Mockable() mock: boolean,
    @Body() ids: number[]
  ) {
    const parsedIds = ids;

    if (mock) {
      return this.handleMockDeleteMany(parsedIds);
    }

    return this.categoriesService.deleteMany(parsedIds);
  }

  @Get(':id')
  findOne(
    @Mockable() mock: boolean,
    @Param('id') id: string
  ) {
    if (mock) {
      return this.handleMockGetOne(+id);
    }

    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Mockable() mock: boolean,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    if (mock) {
      return this.handleMockUpdate(+id, updateCategoryDto);
    }

    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(
    @Mockable() mock: boolean,
    @Param('id') id: string
  ) {
    if (mock) {
      return this.handleMockDelete(+id);
    }

    return this.categoriesService.remove(+id);
  }
}
