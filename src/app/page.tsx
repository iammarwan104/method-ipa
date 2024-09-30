import Image from "next/image";
import { getBooks } from "./libs/books_action";
import { GetBooks } from "./libs/typeObject";

export default async function Home() {
  const books: GetBooks = await getBooks();
  console.log(books)
  return (
<>
    <h1>Beranda</h1>
    {
      books.data?.map((item, index)=>{
        return(
          <p key={index}>{item.name}</p>
        )
      })
    }
</>
  );
}
