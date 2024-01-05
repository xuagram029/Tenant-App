export interface IUser { 
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    email:string,
    mobile: number | null
}

export interface UserLogin { 
    username: string, 
    password: string
  }