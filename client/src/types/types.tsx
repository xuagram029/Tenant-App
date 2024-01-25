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

export interface IBill {
    payment_id?: number,
    month: string,
	user_electricity: string,
	user_water: string,
	user_monthly: string,
	status: string,
	user_firstname: string,
	user_lastname: string ,
	user_mobile?: number
}