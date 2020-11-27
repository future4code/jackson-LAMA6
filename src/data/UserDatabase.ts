import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import Migrations from "./Migrations";

export class UserDatabase extends BaseDatabase {
  public async signup(
    input: User
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: input.getId(),
          name: input.getName(),
          email: input.getEmail(),
          password: input.getPassword(),
          role: input.getRole()
        })
        .into(Migrations.getTableUsers());
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(Migrations.getTableUsers())
      .where({ email });

    return User.toUserModel(result[0]);
  }
}

export default new UserDatabase()