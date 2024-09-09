import { authService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { Request, Response } from 'express';

jest.mock('../services/auth.service');  // This will mock the entire module

describe('AuthController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let authController: AuthController;

  beforeEach(() => {
    authController = new AuthController();
    req = {};
    jsonMock = jest.fn();
    res = { status: jest.fn().mockReturnThis(), json: jsonMock };
  });

  it('should register a user successfully', async () => {
    // Mock the authService.register function
    (authService.register as jest.Mock).mockResolvedValue({ id: 1, email: 'test@example.com' });

    req.body = { firstname: 'John', lastname: 'Doe', address: '123 Street', phone: '1234567890', email: 'test@example.com', password: 'password' };
    await authController.register(req as Request, res as Response);

    expect(authService.register).toHaveBeenCalledWith('John', 'Doe', '123 Street', '1234567890', 'test@example.com', 'password');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'User successfully registered', user: { id: 1, email: 'test@example.com' } });
  });

  it('should return error on invalid registration', async () => {
    // Mock the authService.register function to throw an error
    (authService.register as jest.Mock).mockRejectedValue(new Error('Password is required'));

    req.body = { email: 'test@example.com', password: '' };
    await authController.register(req as Request, res as Response);

    expect(authService.register).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: 'Password is required' });
  });

  it('should login a user successfully', async () => {
    // Mock the authService.login function
    (authService.login as jest.Mock).mockResolvedValue({ shop: { id: '123' }, token: 'abc123' });

    req.body = { email: 'test@example.com', password: 'password' };
    await authController.login(req as Request, res as Response);

    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ shop: { id: '123' }, token: 'abc123' });
  });

  it('should return error on invalid login', async () => {
    // Mock the authService.login function to throw an error
    (authService.login as jest.Mock).mockRejectedValue(new Error('Invalid email or password'));

    req.body = { email: 'test@example.com', password: 'wrongpassword' };
    await authController.login(req as Request, res as Response);

    expect(authService.login).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: 'Invalid email or password' });
  });
});
