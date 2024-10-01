import { getBooks } from "@/app/libs/books_action";
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest){
    try{const searchParams = request.nextUrl.searchParams;
        const data = await getBooks()
        return Response.json(data)
    }catch(error){
        if(error instanceof Error){
            console.error(error, " error in route")
            return Response.json(error)

        }else{
            return Response.json({error: "error tidak diketahui"})

        }
    }
}