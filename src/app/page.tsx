import { createDataByInterval, getBooks } from "./libs/books_action";
import { GetBooks } from "./libs/typeObject";
import Books from "./components/Books";
import { prisma } from "./libs/prisma_client";

export default async function Home() {
  return (
    <>
      <h1>Beranda</h1>
      <Books />
    </>
  );
}
