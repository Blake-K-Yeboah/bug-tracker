export interface Iuser {
    _id: string,
    profileIcon: string,
    name: string,
    email: string,
    password: string,
    bio: string | null,
    createdOn: Date
}

export interface IAuthStore {
    token: string | null,
    isAuthenticated: boolean,
    user: any, // jwt_decode returns type unknown
    error: string | null,
    setError: (err: string) => void,
    setCurrentUser: (user: Iuser | null) => void,
    setToken: (token: string | null) => void
}