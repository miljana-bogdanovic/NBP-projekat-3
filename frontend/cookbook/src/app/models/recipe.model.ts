import { Ingridient } from './ingridient.model';
import { Review } from './review.model';

export class Recipe {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public photo: string,
    public author: string,
    public description: string,
    public ingredients: Ingridient[],
    public reviews : Review[]
  ) {}
}
