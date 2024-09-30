"use client";

import { add_book, getCategoryBooks } from "@/app/libs/books_action";
import { AddBook, GetCategoryBooks } from "@/app/libs/typeObject";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export function InputBook() {
  const [state, action] = useFormState<AddBook, FormData>(add_book, {
    success: null,
    errors: null,
  });

  const [categories, setCategories] = useState<GetCategoryBooks>();

  async function getAllCategoryBooks() {
    const categories: GetCategoryBooks = await getCategoryBooks();
    setCategories(categories)
  }

  useEffect(() => {
    getAllCategoryBooks().then(res => res);
  }, []);
  return (
    <>
      {
        state.success === false ? <div className="bg-red-400 py-2 text-center">Add Book is Failed</div> : <div className="bg-green-400 py-2 text-center">Add Book is Success</div>
      }
      <form action={action} className="w-[50vw] mx-auto flex flex-col gap-4">
        <h2 className="text-center text-2xl font-semibold">Add Books</h2>
        <div className="flex gap-4">
          <label htmlFor="book-name">Nama buku</label>
          <input
            type="text"
            className="border-2 text-black"
            name="book-name"
            id="book-name"
            minLength={3}
            maxLength={50}
          />
        </div>
        {state.errors?.name?.map((item, index) => (
          <p key={index} className="text-red-500">
            {item}
          </p>
        ))}
        <div className="flex gap-4">
          <label htmlFor="publication-year-book">Tahun Terbit buku</label>
          <input
            type="text"
            className="border-2 text-black"
            name="publication-year-book"
            id="publication-year-book"
            minLength={3}
            maxLength={4}
          />
        </div>
        {state.errors?.publicationYear?.map((item, index) => (
          <p key={index} className="text-red-500">
            {item}
          </p>
        ))}
        <div className="flex gap-4">
          <label htmlFor="language-book">Bahasa buku</label>
          <input
            type="text"
            className="border-2 text-black"
            name="language-book"
            id="language-book"
            minLength={3}
            maxLength={20}
          />
        </div>
        {state.errors?.language?.map((item, index) => (
          <p key={index} className="text-red-500">
            {item}
          </p>
        ))}
        <div className="flex gap-4">
          <label htmlFor="pages-book">Jumlah Halaman buku</label>
          <input
            type="text"
            className="border-2 text-black"
            name="pages-book"
            id="pages-book"
            minLength={1}
            maxLength={5}
          />
        </div>
        {state.errors?.pages?.map((item, index) => (
          <p key={index} className="text-red-500">
            {item}
          </p>
        ))}
        <div className="flex gap-4">
          <label htmlFor="id-category-book">Kategori buku</label>
          <select name="id-category-book" id="id-category-book" className=" text-black">
            {
                categories?.data?.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)
            }
          </select>
        </div>
        {state.errors?.idCategoryBook?.map((item, index) => (
          <p key={index} className="text-red-500">
            {item}
          </p>
        ))}
        <button type="submit">Tambah</button>
      </form>
    </>
  );
}
