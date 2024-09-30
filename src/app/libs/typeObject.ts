export type AddBook = { 
    success? : boolean|null
    errors? : {
        name? : string[],
        publicationYear? : string[],
        language? : string[],
        pages? : string[],
        idCategoryBook? : string[],
    } | null
}

export type GetCategoryBooks = {data? : {id: number, name: string}[], errors?: Error | string}
