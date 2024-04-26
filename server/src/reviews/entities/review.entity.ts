import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";


@Entity({
  name : 'Reviews'
})
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id : string;
  

  @Column({
    type : "decimal",
  })
  rating : number;


  @Column()
  comment : string;


  @CreateDateColumn()
  createdAt : Timestamp;

  @UpdateDateColumn()
  updatedAt : Timestamp;


  // one user can make many reviews
  @ManyToOne(ReviewEntity => UserEntity, user => user.reviews)
  user : UserEntity;


  // one product has many reviews 
  @ManyToOne(() => ProductEntity, product => product.reviews)
  product : ProductEntity;
}

