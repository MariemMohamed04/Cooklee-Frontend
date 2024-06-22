export class OrderItem {
  constructor(
    public mealId: number,
    public mealName: string,
    public image: string,
    public price: number,
    public quantity: number,
  ) {}
}
