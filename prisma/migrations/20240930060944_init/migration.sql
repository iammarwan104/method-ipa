-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Pria', 'Wanita');

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anggota" (
    "nis" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "class" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,

    CONSTRAINT "Anggota_pkey" PRIMARY KEY ("nis")
);

-- CreateTable
CREATE TABLE "Pinjam" (
    "id" SERIAL NOT NULL,
    "pickUpDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "idBook" INTEGER NOT NULL,
    "nisAnggota" TEXT NOT NULL,

    CONSTRAINT "Pinjam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "publicationYear" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "idPublisher" INTEGER NOT NULL,
    "idCategory" INTEGER NOT NULL,
    "idAuthor" INTEGER NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publishers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Publishers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pinjam" ADD CONSTRAINT "Pinjam_idBook_fkey" FOREIGN KEY ("idBook") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pinjam" ADD CONSTRAINT "Pinjam_nisAnggota_fkey" FOREIGN KEY ("nisAnggota") REFERENCES "Anggota"("nis") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_idPublisher_fkey" FOREIGN KEY ("idPublisher") REFERENCES "Publishers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_idAuthor_fkey" FOREIGN KEY ("idAuthor") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
