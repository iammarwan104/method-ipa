"use client";

import { useEffect, useState } from "react";
import { createDataByInterval, getBooks } from "../libs/books_action";
import { GetBooks } from "../libs/typeObject";
import useSWR from "swr";

export default function Books() {
  // const [datas, setDatas] = useState<GetBooks>();

  // async function getAllBooks() {
  //   const datas: GetBooks = await getBooks();
  //   setDatas(datas);
  // }

  // function interval() {
  //   setInterval(async () => {
  //     await createDataByInterval();
  //   }, 3600000);
  // }

  const fetcher = () => fetch("/api/siswa").then(res => res.json())

  async function handleUpdate() {
    await createDataByInterval();
  }

  // useEffect(() => {
  //   getAllBooks().then((res) => res);
  //   interval();
  // }, []);
  const { data, error, isLoading } = useSWR('/api/siswa', fetcher)
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  console.log(data)
  // render data
  return <div>
    <button onClick={handleUpdate}>update</button>
    {
      data.data.map((item: {id: number, name:string}, index: number)=>{
        return(
          <p key={index}>{item.name}</p>
        )
      })
    }
    </div>
}
