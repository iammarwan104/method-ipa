"use server"

import { prisma } from "./prisma_client"
import { AddBook, GetBooks, GetCategoryBooks } from "./typeObject"
import { add_book_validation } from "./zodSchema"

export async function add_book( prevState : AddBook, formData: FormData): Promise<AddBook>{
    const req = {
        name: formData.get("book-name"),
        publicationYear: Number(formData.get("publication-year-book")),
        language: formData.get("language-book"),
        pages: Number(formData.get("pages-book")),
        idCategoryBook: Number(formData.get("id-category-book"))
    }
    console.log(req, "formData")

    const res = add_book_validation.safeParse({
        name: req.name,
        publicationYear: req.publicationYear,
        language: req.language,
        pages: req.pages,
        idCategoryBook: req.idCategoryBook
    })

    if(res.success === false){
        return {success:false, errors : res.error?.flatten().fieldErrors}
    }

    await prisma.books.create({
        data:{
            name: res.data.name,
            publicationYear: res.data.publicationYear,
            language: res.data.language,
            pages: res.data.pages,
            idCategory: res.data.idCategoryBook,
        }
    })
    return {
        success: true,
        errors: null
    }
}


export async function getBooks(): Promise<GetBooks>{
    try {
        const getBooks = await prisma.books.findMany()
        return {data : getBooks}
    } catch (error) {
        if(error instanceof Error){
            return {errors: {
                message: error.name,
                success:false
            }}
        }
        return {errors: {
            message: "error tidak diketahui",
            success:false
        }}
    }
}

export async function getCategoryBooks(): Promise<GetCategoryBooks>{
    try {
        const getBooks = await prisma.category.findMany()
        return {data : getBooks}
    } catch (error) {
        if(error instanceof Error){
            return {errors: error}
        }
        return {errors: "error tidak diketahui"}
    }
}

export async function createDataByInterval(){
        try {
          await prisma.books.create({
            data: {
              name: "Tes Interval",
              publicationYear: 2024,
              language: "Bugis",
              pages: 123,
              idCategory: 1,
            },
          });
        } catch (error) {
          if (error instanceof Error) {
            return { errors: error };
          }
          return { errors: "error tidak diketahui" };
        }
}