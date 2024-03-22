
// import { MaxLength, MinLength } from "class-validator";
import slugify from "slugify";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp, Unique, UpdateDateColumn } from "typeorm";


@Entity("Products")
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;


  @Column(
    {
      unique : true,
    }
  )
  /* @MinLength(3)
  @MaxLength(100) */
  name : string;


  @Column()
  /* @MinLength(12)
  @MaxLength(250) */
  description : string;


  @Column({type : "decimal", precision : 10, scale : 2 , default : 0})
  price : number;


  @Column()
  stock : number;

  @Column('simple-array')
  images : string[]; // the url of the images


  @CreateDateColumn()
  createdAt : Timestamp;


  @UpdateDateColumn()
  updatedAt : Timestamp;


  
  // add slug for better SEO
  @Column(
    {
      unique : true,
    }
  )
  slug : string;


  @BeforeInsert()
  slugify_product() {
    this.slug = slugify(this.name , {
      lower: false,
      
    });
  }



  // one to one relationship with User
  @ManyToOne(type => UserEntity, (user) => user.products)
  addedBy : UserEntity;


  // one to many product can have multiple categories
  @ManyToOne((type) => CategoryEntity , (category) => category.products)
  category : CategoryEntity;

}
