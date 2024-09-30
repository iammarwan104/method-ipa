"use client";

import { useEffect, useState } from "react";
import { getBooks } from "../libs/books_action";
import { GetBooks } from "../libs/typeObject";

export default function Books() {
  const [datas, setDatas] = useState<GetBooks>();

  async function getAllBooks() {
    const datas: GetBooks = await getBooks();
    setDatas(datas);
  }

  useEffect(() => {
    getAllBooks().then((res) => res);
  }, []);
  return (
    <>
      {datas?.data?.map((item, index) => (
        <p key={index}>
          {item.name}
        </p>
      ))}
    </>
  );
}
