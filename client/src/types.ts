export interface Iuser {
    _id: string,
    profileIcon: string,
    name: string,
    email: string,
    password: string,
    bio: string,
    createdOn: Date
}

export interface IAuthStore {
    token: string | null,
    isAuthenticated: boolean,
    user: any, // jwt_decode returns type unknown
    error: any, // A lot of possible errors
    setError: (err: any) => void,
    setCurrentUser: (user: Iuser | null) => void,
    setToken: (token: string | null) => void
}

// For Components with Stores as props
export interface IStoreProps {
    [storeName: string]: any
}