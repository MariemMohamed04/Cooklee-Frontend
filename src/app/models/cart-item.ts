export class CartItem {
  constructor(
    public id:number,
    public mealName:string,
    public pictureUrl:string,
    public quantity:number,
    public price:number
  ){}
}
