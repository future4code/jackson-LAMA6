
export const stringToUserRole = (input: string): UserRole =>{

  switch (input.toUpperCase()) {
    case "NORMAL":
      return UserRole.NORMAL;
    case "ADMIN":
      return UserRole.ADMIN;
    default:
      throw new Error("Invalid user role");
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
  email: string;
  password: string;
  name: string;
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

