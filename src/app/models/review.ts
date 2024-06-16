export class Review{
  constructor (
    public id: number,
    public comment: string,
    public rate: number,
    public clientId: number,
    public mealId: number)
{}};
