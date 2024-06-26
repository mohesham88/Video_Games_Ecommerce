import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, Unique, UpdateDateColumn } from "typeorm";
import { UserRole } from "../utils/common/user-roles.enum";
import { UserGender } from "../utils/common/user-gender.enum";
import { genSalt, hash } from "bcrypt";
import { IsOptional } from "class-validator";
import { ProductEntity } from "src/products/entities/product.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";





@Entity("Users")
export class UserEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({length : 30, unique : true})
  username : string;


  @Column({ unique : true })
  email : string;


  @IsOptional()
  @Column({
    type: "enum",
    enum : UserRole,
    default: UserRole.CUSTOMER,
  })
  role? : UserRole

  @Column({
    type: "enum",
    enum : UserGender,
  })
  gender : UserGender

  @Column()
  address : string;
  
  @Column({select : false})
  password : string;

  @CreateDateColumn()
  createdAt : Timestamp;

  
  @UpdateDateColumn()
  upadatedAt : Timestamp;

  @OneToMany((type) => ProductEntity, (prod) => prod.addedBy)
  products : ProductEntity[];


  @OneToMany((type) => ReviewEntity, (rev) => rev.user)
  reviews : ReviewEntity[];

  @BeforeInsert()
  async hashPassword(password: string){
    const salt = await genSalt();
    this.password = await hash(password || this.password , salt);
  }



}

