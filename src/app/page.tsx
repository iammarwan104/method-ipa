import { getBooks } from "./libs/books_action";
import { GetBooks } from "./libs/typeObject";
import Books from "./components/Books";

export default async function Home() {
  return (
    <>
      <h1>Beranda</h1>
      <Books />
    </>
  );
}
