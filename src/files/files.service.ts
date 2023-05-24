import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';

export enum FileType{
  PHOTOS = 'photos',
  TRASH = 'trash'
}

@Injectable()
export class FilesService {  
  constructor(
    @InjectRepository(FileEntity) 
    private repository: Repository<FileEntity>){}
  
  create(file: Express.Multer.File, userId: number) {
    return this.repository.save( {
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype:file.mimetype,
      user: { id: userId},

    });
  }

  findAll(userId: number, fileType: FileType) {
    const qb = this.repository.createQueryBuilder('file');

    qb.where('file.userId = :userId', {userId})

    switch(fileType){
      case FileType.PHOTOS: 
        qb.andWhere('file.mimetype LIKE :type', { type: '%image%'})
      break
      case FileType.TRASH: 
        qb.withDeleted().andWhere('file.deletedAt IS NOT NULL');
      break
    }

    return qb.getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  async remove(userId: number, ids: string) {
    const idsArray = ids.split(',');

    const qb = this.repository.createQueryBuilder('file');

    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    })
    return qb.softDelete().execute();
  }
}
