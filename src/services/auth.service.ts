import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import { Shop } from '../models/shop.model';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import AppDataSource from '../data-source';
import config from '../config';
import {hashPassword} from '../utils/hash';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';


class AuthService {
  private userRepository: Repository<User>;
  private oauth2Client: OAuth2Client;


  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.oauth2Client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

  }

  async register(firstname: string, lastname: string, address: string, phone: string, email: string, password: string) {
    if (!password) {
      throw new Error('Password is required for traditional signups');
    }
    const hashedPassword = await hashPassword(password);
    const user = this.userRepository.create({ firstname, lastname, address, phone, email, password: hashedPassword });
    await this.userRepository.save(user);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }

    // Fetch the shop associated with the user
    const shopRepository = AppDataSource.getRepository(Shop);
    const shop = await shopRepository.findOne({
      where: { user: { id: user.id } },
    });

    // Include the shop ID in the token payload
    const tokenPayload = { id: user.id, firstname: user.firstname, address: user.address, phone: user.phone, email: user.email,  shopId: shop?.id };
    const token = jwt.sign(tokenPayload, config.TOKEN_SECRET!, { expiresIn: '1h' });
    return {shop, token };
  }
  //googleSignup
  async googleSignup(token: string) {
    const ticket = await this.oauth2Client.verifyIdToken({
      idToken: token,
      audience: config.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error('Google token verification failed');
    }

    const googleId = payload.sub; // Google user ID
    const email = payload.email!;
    const firstname = payload.given_name!;
    const lastname = payload.family_name!;

    const user = await this.findOrCreateUser({ googleId, email, firstname, lastname });

    return user;
  }

  async findOrCreateUser(profile: { googleId: string; email: string; firstname: string; lastname: string }) {
    let user = await this.userRepository.findOne({ where: { email: profile.email } });
  
    if (!user) {
      user = this.userRepository.create({
        googleId: profile.googleId,
        email: profile.email,
        firstname: profile.firstname,
        lastname: profile.lastname,
        provider: 'google',
        password: null,
      });
      await this.userRepository.save(user);
    } else if (!user.googleId) {
      user.googleId = profile.googleId;
      user.provider = 'google';
      await this.userRepository.save(user);
    }
    return user;
  }
  


}

export const authService = new AuthService();
