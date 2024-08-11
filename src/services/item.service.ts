import { Repository } from 'typeorm';
import { Item } from '../models/item.model';
import AppDataSource from '../data-source';

export class ItemService {
  private static itemRepository: Repository<Item> = AppDataSource.getRepository(Item);

  static async createItem(shopId: string, itemData: Partial<Item>) {
    const item = this.itemRepository.create({ ...itemData, shop: { id: shopId } });
    await this.itemRepository.save(item);
    return item;
  }

  static async getAllItems(shopId: string) {
    return this.itemRepository.find({ where: { shop: { id: shopId } } });
  }

  static async getItemById(shopId: string, itemId: string) {
    return this.itemRepository.findOne({ where: { id: itemId, shop: { id: shopId } } });
  }

  static async updateItem(shopId: string, itemId: string, itemData: Partial<Item>) {
    const item = await this.getItemById(shopId, itemId);
    if (!item) throw new Error('Item not found');

    Object.assign(item, itemData);
    return this.itemRepository.save(item);
  }

  static async deleteItem(shopId: string, itemId: string) {
    const item = await this.getItemById(shopId, itemId);
    if (!item) throw new Error('Item not found');

    return this.itemRepository.remove(item);
  }
}
