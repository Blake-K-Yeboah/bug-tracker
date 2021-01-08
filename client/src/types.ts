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
    fetchChanges: () => void,
    changeCount: number
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

// Project Interface
export interface Iproject {
    _id: string,
    name: string,
    description: string,
    usersList: string[],
    owner: string,
    ticketList: string[],
    createdOn: Date
}

// Project Store Interface
export interface IProjectStore {
    projects: Iproject[],
    fetchProjects: () => void,
    projectCount: number
}

// Comment Interface
export interface Icomment {
    _id: string,
    text: string,
    user: string,
    for: { type: string, typeId: string },
    createdOn: Date
}

// Comment Store Interface