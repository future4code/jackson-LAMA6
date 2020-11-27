import { Request, Response } from "express";
import { UserInput, LoginInput } from "../model/User";
import  userBusiness, { UserBusiness }  from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { validation } from "../utils/validation";
import  { stringToUserRole }  from '../model/User'

export class UserController {
  constructor(private userBusiness: UserBusiness) {}
  
  public signup = async (req: Request, res: Response) =>{
    try {
      const input: UserInput = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role
      };

      const token = await this.userBusiness.signup(input, validation, stringToUserRole);

      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: LoginInput = {
        email: req.body.email,
        password: req.body.password
      };

      const token = await userBusiness.login(loginData, validation);

      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
