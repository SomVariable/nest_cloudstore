import { UserEntity } from "src/user/entities/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity( 'files' )
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;
    
    @Column()
    originalName: string;
    
    @Column()
    size: number;
    
    @Column()
    mimetype: string;
    
    @ManyToOne( () => UserEntity, user => user.files)
    user: UserEntity;

    @DeleteDateColumn()
    deletedAt?: Date;
}
