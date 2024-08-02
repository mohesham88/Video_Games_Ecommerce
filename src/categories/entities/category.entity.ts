import { MaxLength, MinLength } from "class-validator";
import { ProductEntity } from "src/products/entities/product.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";


@Entity("Categories")
export class CategoryEntity {
  
  @PrimaryGeneratedColumn("uuid")
  id : string;


  @Column()
  title : string;

  @Column()
  @MinLength(12)
  @MaxLength(500)
  description : string;


  @CreateDateColumn()
  createdAt : Timestamp;


  @UpdateDateColumn()
  updatedAt : Timestamp;

  // product have one or more categories
  @OneToMany((type) => ProductEntity, (prod) => prod.category)
  products : ProductEntity[];



  // category can be a combination of other categories
  @OneToMany((type) => CategoryEntity, (category) => category.childCategories)
  childCategories : CategoryEntity[]

  @ManyToOne((type) => CategoryEntity, (category) => category.parentCategory)
  parentCategory : CategoryEntity;
}