import { Recipe } from "./recipe.model";

export class User {
    constructor(
      public id: string,
      public username : string,
      public name: string,
      public lastName: string,
      public photo: string,
      public password: string,
      public recipes : Recipe[],
      public favourites : Recipe[],
      public reviews : string[]
    ) {}
  }
  