
interface Account{
    status : "unknown" | "authenticated" | "guest",
    pseudo? : string
}

export type {Account}