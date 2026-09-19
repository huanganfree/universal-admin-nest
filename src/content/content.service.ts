import { Injectable } from '@nestjs/common';
import { CreateContentDto, PageQueryDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ContentStatus } from '../generated/prisma/enums';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: PageQueryDto) {
    const { page, pageSize, title, status } = query;
    const [count, records] = await this.prisma.$transaction([
      this.prisma.content.count({}),
      this.prisma.content.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          title: {
            contains: title,
          },
          status: status ? { in: status.split(',') as ContentStatus[] } : undefined,
        },
        include: {
          userContentCreatedByTouser: { select: { username: true } },
          userContentUpdatedByTouser: { select: { username: true } },
        },
      }),
    ]);

    const formattedList = records.map((item) => ({
      ...item,
      creatorName: item.userContentCreatedByTouser.username,
      updaterName: item.userContentUpdatedByTouser.username,
    }));

    return { count, records: formattedList };
  }

  create(createContentDto: CreateContentDto) {
    return 'This action adds a new content';
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
