export class SubCategory {
  id: number;
  name: string;
  subCategories: SubCategory[];

  constructor(id: number, name: string, subCategories: SubCategory[] = []) {
    this.id = id;
    this.name = name;
    this.subCategories = subCategories;
  }
}
