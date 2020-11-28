import { ParameterError } from "../error/ParameterError";

export const stringToUserRole = (input: string): any =>{
  if(input.toUpperCase() === "NORMAL"){
    return UserRole.NORMAL
  }
  if(input.toUpperCase() === "ADMIN"){
    return UserRole.ADMIN
  }
  if(!(input.toUpperCase() in UserRole)){
    return false
  }
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: UserRole
  ) {}

  static toUserModel(user: any): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      stringToUserRole(user.role)
    );
  }

  public getId = (): string => this.id;
  public getName = (): string => this.name;
  public getEmail = (): string => this.email;
  public getPassword = (): string => this.password;
  public getRole = (): UserRole => this.role;
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export enum UserRole {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}

