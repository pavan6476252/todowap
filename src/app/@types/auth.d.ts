
export type IAuthRefreshTokenReponse = {
      accessToken: string,
      refreshToken: string
}
export type IAuthLoginReponse = {
      accessToken: string,
      refreshToken: string
}

export type IAuthSignupReponse = null

export type IAuthSignUpDetails = {
      password: string,
       email: string,
        name: string
}

export type IAuthLoginDetails = {
      password: string, 
      email: string
}