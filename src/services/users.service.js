// Local Modules
import bCrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { UsersModel, UsersStorageModel, StorageInfoModel } from '../models';

export default class UsersService {
  static async sendMail(name, email, text) {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        // company mail
        user: process.env.user,
        pass: process.env.pass
      }
    });

    const mailOptions = {
      // company mail
      from: process.env.user,
      to: process.env.user,
      subject: 'Email',
      text: `From ${name}, ${email}, ${text}`
    };

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(`Email sent: ${info.response}`);
        }
      });
    });
  }

  static async addBranchAdress(payload, users_id) {
    return UsersModel.addBranchAddress(payload, users_id);
  }

  static async add(payload) {
    const password = await bCrypt.hash(payload.password, 10);
    delete payload.password;
    return UsersModel.create({ ...payload, password });
  }

  static async edit(id, payload) {
    return UsersModel.edit(id, payload);
  }

  static async getUser(usersId, role,id) {
    return UsersModel.findByUsersId(usersId, role, id);
  }

  static async getAllUsers() {
    return UsersModel.getAllUsers();
  }

  static async delete(id) {
    return UsersModel.delete(id);
  }

  static async getCompanyDataWithLimit(category, companyName, limit) {
    return UsersModel.getCompanyDataWithLimit(category, companyName, limit);
  }

  // Storage Name
  static async getStorageName() {
    return UsersStorageModel.getStorageName();
  }

  static async addStorageName(payload) {
    return UsersStorageModel.addStorageName(payload);
  }

  // Stotrage Info
  static async addStorageInfo(payload) {
    return StorageInfoModel.addStorageInfo(payload);
  }

  static async getAllStorageInfo(users_id, branch_address) {
    return StorageInfoModel.getAllStorageInfo(users_id, branch_address);
  }

  static async getStorageInfoByCategory(users_id, branch_address, category_name) {
    return StorageInfoModel.getStorageInfoByCategory(users_id, branch_address, category_name);
  }

  static async getPrice(info) {
    return StorageInfoModel.getPrice(info);
  }

  static async editStorageDetails(info, id) {
    return StorageInfoModel.editStorageDetails(info, id);
  }

  static async deleteStorageDetails(id) {
    return StorageInfoModel.deleteStorageDetails(id);
  }
  static async getFullProduct(users_id,category_name,branch_address) {
    return StorageInfoModel.getFullProduct(users_id,category_name,branch_address);
  }
  

  static async getmincount(users_id) {
    return StorageInfoModel.getmincount(users_id);
  }
}
