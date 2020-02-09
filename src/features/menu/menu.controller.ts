import { MenuService } from './menu.service';
import { Controller, Get, Param } from '@nestjs/common';

/* dtos */
import { MenuListDto } from './dto/menu.list.dto';

@Controller('menu')
export class MenuController {

    constructor (
        private readonly menuService: MenuService
    ) {}

    @Get('restaurantId/:restaurantId')
    list (@Param() menuListDto: MenuListDto): Promise<any>{

        return this.menuService.getMenu(menuListDto);
    }
}
