import { Request, Response } from "express";
import { UserInput, LoginInput } from "../model/User";
import  UserBusiness  from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      const input: UserInput = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role
      };

      // const userBusiness = new UserBusiness();
      const token = await UserBusiness.createUser(input);

      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    // await BaseDatabase.destroyConnection();
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: LoginInput = {
        email: req.body.email,
        password: req.body.password
      };

      // const userBusiness = new UserBusiness();
      const token = await UserBusiness.getUserByEmail(loginData);

      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
