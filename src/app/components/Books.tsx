"use client";

import { useEffect, useState } from "react";
import { createDataByInterval, getBooks } from "../libs/books_action";
import { GetBooks } from "../libs/typeObject";

export default function Books() {
  const [datas, setDatas] = useState<GetBooks>();

  async function getAllBooks() {
    const datas: GetBooks = await getBooks();
    setDatas(datas);
  }

  function interval() {
    setInterval(async () => {
      await createDataByInterval();
    }, 3600000);
  }

  async function handleUpdate() {
    await createDataByInterval();
  }

  useEffect(() => {
    getAllBooks().then((res) => res);
    interval();
  }, []);
  return (
    <>
      <button onClick={handleUpdate}>update</button>
      {!datas ? (
        <div>Kosong</div>
      ) : (
        datas?.data?.map((item, index) => <p key={index}>{item.name}</p>)
      )}
    </>
  );
}
