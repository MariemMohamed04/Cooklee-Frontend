export class Meal {
  // id?: number;
  // mealName?: string;
  // mealDescription?: string;
  // isHealthy?: boolean;
  // price?: number;
  // rate?: number;
  // image?:string;
  // tags?:string[];
  // chefPageName?:string;
  // chefPageId?:number;
  constructor(
    public id: number,
    public mealName: string,
    public mealDescription: string,
    public isHealthy: boolean,
    public price: number,
    public rate: number,
    public image: string,
    public tags: string[],
    public chefPageName: string,
    public chefPageId: number,
  ) {}
} //public Image: string, public Rate:Number, public Tags:Array<String>