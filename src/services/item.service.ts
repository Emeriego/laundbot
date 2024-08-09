import AppDataSource  from '../data-source';
import { Item } from '../models/item.model';
import { Shop } from '../models/shop.model';

export class ItemService {
  static async createItem(itemData: Partial<Item>) {
    try {
      const itemRepository = AppDataSource.getRepository(Item);
      const item = itemRepository.create(itemData);
      return await itemRepository.save(item);
    } catch (error) {
      console.error('Error creating item:', error);
      throw new Error('Unable to create item at the moment.');
    }
  }

  static async getAllItems() {
    try {
      const itemRepository = AppDataSource.getRepository(Item);
      return await itemRepository.find();
    } catch (error) {
      console.error('Error fetching items:', error);
      throw new Error('Unable to fetch items at the moment.');
    }
  }

  static async getItemById(id: string) {
    try {
      const itemRepository = AppDataSource.getRepository(Item);
      const item = await itemRepository.findOne({
        where: { id },
      });

      if (!item) {
        throw new Error('Item not found.');
      }

      return item;
    } catch (error) {
      console.error('Error fetching item:', error);
      throw new Error('Unable to fetch item at the moment.');
    }
  }

  static async updateItem(id: string, itemData: Partial<Item>) {
    try {
      const itemRepository = AppDataSource.getRepository(Item);
      let item = await itemRepository.findOne({
        where: { id },
      });

      if (!item) {
        throw new Error('Item not found.');
      }

      item = { ...item, ...itemData };
      return await itemRepository.save(item);
    } catch (error) {
      console.error('Error updating item:', error);
      throw new Error('Unable to update item at the moment.');
    }
  }

  static async deleteItem(id: string) {
    try {
      const itemRepository = AppDataSource.getRepository(Item);
      const result = await itemRepository.delete({ id });

      if (result.affected === 0) {
        throw new Error('Item not found or not authorized to delete.');
      }

      return { message: 'Item deleted successfully.' };
    } catch (error) {
      console.error('Error deleting item:', error);
      throw new Error('Unable to delete item at the moment.');
    }
  }
}
