// "use server"
// import{z} from "zod"

// import { PrismaClient } from "@prisma/client"
// import { redirect } from "next/navigation"
// import { revalidatePath } from "next/cache"
// import { File } from "buffer"
// import fs from "node:fs"
// import {fileTypeFromBuffer} from 'file-type';
// const prisma = new PrismaClient()

// export async function getProduct(){
//     const prisma = new PrismaClient()
//     return await prisma.products.findMany()
// }


// const createProduct = z.object({
//     nama: z.string(),
//     price: z.string(),
//     image: z.instanceof(File).refine(file => {
//         const typeImage = ["image/jpeg","image/jpg", "image/png", "image/webp"]
//         return typeImage.includes(file.type)
//     },{
//         message: "Invalid file type."
//     }).refine(file => file.size <= 1 * 1024 * 1024, {
//         message: "File size should be less than 1 mb."
//     })
// })
// export async function create(formData : FormData){
//     try {
//     const {nama, price, image} = createProduct.parse({
//         nama : await formData.get("nama"),
//         price : await formData.get("price"),
//         image: await formData.get("image")
//     })
//     const buffer = await image.arrayBuffer();
//     const imageBuffer = Buffer.from(buffer);
//     const imageType = ['image/jpeg','image/jpg', 'image/png','image/webp'];
//     const checkFileType = await fileTypeFromBuffer(imageBuffer)
//     if(!imageType.includes(checkFileType?.mime as string)){
//         throw new Error("Invalid file type.")
//     }
//     await fs.writeFile(`./public/image/${image.name}`, imageBuffer, err => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log("file written successfully");
          
//         }
//       });
//         console.log(`image/${image.name}`);
//         await prisma.products.create({
//         data: {
//           nama: nama,
//           price: price,
//           image: `/image/${image.name}`
//           }})
//     } catch (error: unknown) {
//         console.error(error)
//     }
//     revalidatePath("/")
//     redirect("/")
// }

// export async function getBooks (){
//     const users = await prisma.books.findMany({
//         relationLoadStrategy: 'join', // or 'query'
//         include: {
//           author: true,
//           publisher: true,
//           category:true
//         },
//       })
//     return users;
// }