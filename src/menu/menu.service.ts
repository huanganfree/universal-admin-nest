import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserMenusByRoleId(req: any) {
    const roleWithMenus = await this.prisma.role.findUnique({
      where: {
        id: Number(req.user?.roleId),
      },
      include: {
        // 1. 先 include 显式中间表
        roleMenu: {
          // 2. 在中间表中 include 关联的 menu，并在 menu 内部按状态过滤
          where: {
            menu: {
              status: 1, //  在这里直接过滤关联的 menu 状态
            },
          },
          include: {
            menu: true, // 带出 menu 的数据
          },
        },
      },
    });

    // 如果只需要菜单数组，可以这样提取：
    const menus = roleWithMenus?.roleMenu.map((item) => item.menu) || [];
    const finalData = menus.map((item) => {
      return {
        ...item,
        type: Number(item.type.replace('type_', '')),
      };
    });
    return finalData;
  }

  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new menu';
  }

  findAll() {
    return `This action returns all menu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
