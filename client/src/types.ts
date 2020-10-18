export interface Iuser {
    _id: string,
    profileIcon: string,
    name: string,
    email: string,
    password: string,
    role: string,
    bio: string,
    createdOn: Date
}

// Auth Store Interface
export interface IAuthStore {
    token: string | null,
    isAuthenticated: boolean,
    user: any, // jwt_decode returns type unknown
    error: boolean,
    setError: (err: boolean) => void,
    setCurrentUser: (user: Iuser | null) => void,
    setToken: (token: string | null) => void
}

// Users Store Interface
export interface IUsersStore {
    users: Iuser[],
    fetchUsers: () => void,
    userCount: number
}

// Change Store Interface
export interface IChangeStore {
    changes: IChange[],
    fetchChanges: () => void
}

// Change Interface
export interface IChange {
    _id: string,
    userId: string,
    message: string,
    date: Date
}

// For Components with Stores as props
export interface IStoreProps {
    [storeName: string]: any
}

// For Statistics component
export interface IStat {
    title: string,
    value: number,
    icon: any // Icon has weird type
}