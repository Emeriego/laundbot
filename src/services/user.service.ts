import AppDataSource  from '../data-source';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';

export class UserService {
  static async createUser(userData: Partial<User>) {
    try {
      const userRepository = AppDataSource.getRepository(User);

      // Check if user already exists
      const existingUser = await userRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        throw new Error('User with this email already exists.');
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;

      const user = userRepository.create(userData);
      return await userRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Unable to create user at the moment.');
    }
  }

  static async getAllUsers() {
    try {
      const userRepository = AppDataSource.getRepository(User);
      return await userRepository.find();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Unable to fetch users at the moment.');
    }
  }

  static async getUserById(id: string) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new Error('User not found.');
      }

      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Unable to fetch user at the moment.');
    }
  }

  static async updateUser(id: string, userData: Partial<User>) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      let user = await userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new Error('User not found.');
      }

      // If updating the password, hash it
      if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
      }

      user = { ...user, ...userData };
      return await userRepository.save(user);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Unable to update user at the moment.');
    }
  }

  static async deleteUser(id: string) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const result = await userRepository.delete({ id });

      if (result.affected === 0) {
        throw new Error('User not found or not authorized to delete.');
      }

      return { message: 'User deleted successfully.' };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Unable to delete user at the moment.');
    }
  }
}
