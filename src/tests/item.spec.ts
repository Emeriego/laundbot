//@ts-nocheck
import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';
import { ItemController } from '../controllers/item.controller';

jest.mock('../services/item.service'); // This will mock the entire module

describe('ItemController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    res = { status: jest.fn().mockReturnThis(), json: jsonMock };
  });

  it('should create items successfully', async () => {
    const itemsData = [{ name: 'Item 1' }, { name: 'Item 2' }];
    (ItemService.createItem as jest.Mock).mockImplementation(async (shopId: string, itemData: Partial<Item>) => ({ ...itemData, id: '1' }));

    req.body = { items: itemsData };
    req.shop = { id: 'shop1' };
    await ItemController.createItems(req as Request, res as Response);

    expect(ItemService.createItem).toHaveBeenCalledTimes(itemsData.length);
    itemsData.forEach((itemData, index) => {
      expect(ItemService.createItem).toHaveBeenCalledWith('shop1', itemData);
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      message: `${itemsData.length} item(s) created successfully.`,
      items: itemsData.map(item => ({ ...item, id: '1' })),
    });
  });

  it('should return error when no items data is provided', async () => {
    req.body = { items: [] };
    req.shop = { id: 'shop1' };
    await ItemController.createItems(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'No items data provided.' });
  });

  it('should return error when shop ID is not found', async () => {
    req.body = { items: [{ name: 'Item 1' }] };
    await ItemController.createItems(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Shop not found in request.' });
  });

  it('should get all items successfully', async () => {
    const items = [{ id: '1', name: 'Item 1' }];
    (ItemService.getAllItems as jest.Mock).mockResolvedValue(items);

    req.shop = { id: 'shop1' };
    await ItemController.getAllItems(req as Request, res as Response);

    expect(ItemService.getAllItems).toHaveBeenCalledWith('shop1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Items retrieved successfully.', items });
  });

  it('should return error when fetching items fails', async () => {
    (ItemService.getAllItems as jest.Mock).mockRejectedValue(new Error('Unable to fetch items'));

    req.shop = { id: 'shop1' };
    await ItemController.getAllItems(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Unable to fetch items' });
  });

  it('should get item by ID successfully', async () => {
    const item = { id: '1', name: 'Item 1' };
    (ItemService.getItemById as jest.Mock).mockResolvedValue(item);

    req.params = { id: '1' };
    req.shop = { id: 'shop1' };
    await ItemController.getItemById(req as Request, res as Response);

    expect(ItemService.getItemById).toHaveBeenCalledWith('shop1', '1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Item retrieved successfully.', item });
  });

  it('should return error when item by ID is not found', async () => {
    (ItemService.getItemById as jest.Mock).mockResolvedValue(null);

    req.params = { id: '1' };
    req.shop = { id: 'shop1' };
    await ItemController.getItemById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Item not found.' });
  });

  it('should return error when fetching item by ID fails', async () => {
    (ItemService.getItemById as jest.Mock).mockRejectedValue(new Error('Unable to fetch item'));

    req.params = { id: '1' };
    req.shop = { id: 'shop1' };
    await ItemController.getItemById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Unable to fetch item' });
  });

  it('should update item successfully', async () => {
    const updatedItem = { id: '1', name: 'Updated Item' };
    (ItemService.updateItem as jest.Mock).mockResolvedValue(updatedItem);

    req.params = { id: '1' };
    req.body = { name: 'Updated Item' };
    req.shop = { id: 'shop1' };
    await ItemController.updateItem(req as Request, res as Response);

    expect(ItemService.updateItem).toHaveBeenCalledWith('shop1', '1', { name: 'Updated Item' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Item updated successfully.', updatedItem });
  });

  it('should return error when updating item fails', async () => {
    (ItemService.updateItem as jest.Mock).mockRejectedValue(new Error('Unable to update item'));

    req.params = { id: '1' };
    req.body = { name: 'Updated Item' };
    req.shop = { id: 'shop1' };
    await ItemController.updateItem(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Unable to update item' });
  });

  it('should delete item successfully', async () => {
    (ItemService.deleteItem as jest.Mock).mockResolvedValue({ id: '1', name: 'Item 1' });

    req.params = { id: '1' };
    req.shop = { id: 'shop1' };
    await ItemController.deleteItem(req as Request, res as Response);

    expect(ItemService.deleteItem).toHaveBeenCalledWith('shop1', '1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Item deleted successfully.' });
  });

  it('should return error when deleting item fails', async () => {
    (ItemService.deleteItem as jest.Mock).mockRejectedValue(new Error('Unable to delete item'));

    req.params = { id: '1' };
    req.shop = { id: 'shop1' };
    await ItemController.deleteItem(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Unable to delete item' });
  });
});
