import { z } from "zod";

export const add_book_validation = z.object({
    name: z.string().min(3).max(50),
    publicationYear: z.number().gte(3),
    language: z.string().min(3).max(50),
    pages: z.number().gte(1),
    idCategoryBook: z.number().gte(1),
}).required()