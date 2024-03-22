import { CanActivate, ExecutionContext, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductsService } from "../products.service";




@Injectable()
export class MatchUserIdWithProductGuard implements CanActivate {

  constructor(private readonly productService: ProductsService){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
      
    const request  = context.switchToHttp().getRequest();
    const {user} = request;
    const {id : productId} = request.params;
    // console.log(`${productId} ${user.id}`)
    const product = await this.productService.findOneWithRelations(productId);
    if(!product){
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    request.product = product;

    return (String(product.addedBy.id) === user.id);
  }
}