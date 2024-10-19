export type UserInput = {
    id: string
    email: string
    name: string
    lastLoggedIn: string | null
    raw_password?: string | null
}

export type Teacher = {
    id: number
    email: string
    name: string
    lastLoggedIn: Date | null
    raw_password?: string
    created_at?: Date
    updated_at?: Date
}