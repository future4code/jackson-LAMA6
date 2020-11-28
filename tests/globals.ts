import { ParameterError } from "../src/error/ParameterError"
import { UserRole } from "../src/model/User"

export const validatorMockFalsy = jest.fn((input: any): any =>{
    return {isValid: false}
})

export const validatorMockTrue = jest.fn((input: any): any =>{
    return {isValid: true}
})

export const dataTokenRoleNormalMock = jest.fn((token: any): any =>{
    return {
        id:"id",
        role: "NORMAL"
    }
})

export const dataTokenRoleAdminMock = jest.fn((token: any): any =>{
    return {
        id:"id",
        role: "ADMIN"
    }
})

export const toUserInvalidRole = jest.fn((token: any): any =>{
    return false
})

export const toUserRoleNormal = jest.fn((role: any): any =>{
    return UserRole.NORMAL
})

export const toUserRoleAdmim = jest.fn((role: any): any =>{
    return UserRole.ADMIN
})

export const getUserByEmailUndefinedMock = jest.fn((email: any): any =>{
    return undefined
})

export const getUserByEmailMock = jest.fn((email: any): any =>{
    return {
        id: "id",
        name: "test",
        email: "test@email.com",
        password: "testando123",
        role: UserRole.NORMAL
    }
})

export const compareTrue = jest.fn((password: any, hashPassowrd: any): any =>{
    return true
})

export const compareFalse = jest.fn((password: any, hashPassowrd: any): any =>{
    return false
})