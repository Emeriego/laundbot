import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import AppDataSource from '../data-source';
import config from '../config';
import {hashPassword} from '../utils/hash';
import bcrypt from 'bcrypt';

class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async register(firstname: string, lastname: string, address: string, phone: string, email: string, password: string) {
    const hashedPassword = await hashPassword(password);
    const user = this.userRepository.create({ firstname, lastname, address, phone, email, password: hashedPassword });
    await this.userRepository.save(user);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ id: user.id }, config.TOKEN_SECRET!, { expiresIn: '1h' });
    return { user, token };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new Error('Email not found');
    
    const resetToken = uuidv4();
    // const resetPasswordUrl = `${config.FRONTEND_URL}/reset-password/${resetToken}`;

    // Here you would save the token to the database and associate it with the user.
    // For simplicity, we are skipping that step.

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: config.SMTP_USER,
      to: user.email,
      subject: 'Password Reset',
    //   text: `Reset your password by clicking the link: ${resetPasswordUrl}`,
    });
  }

  async googleSignup(token: string) {
    // Implement Google Signup using Google's OAuth2 API
  }
}

export const authService = new AuthService();
