export class Review {
    constructor(
      public id: string,
      public content : string,
      public grade: number,
      public userId: string,
      public recipeId : string,
      public recipeName : string,
      public recipeAuthor : string,
      public recipePhoto : string
    ) {}
  }
  