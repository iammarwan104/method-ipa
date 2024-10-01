import { Suspense } from "react"
import { getDataSiswa } from "../lib/action"
import Kopi from "./Kopi"
import useSWR from "swr";

export default async function Page(){
    // const data = await getDataSiswa()
    // console.log(data)
    // const fetcher = () => fetch("/api/siswa").then(r => r.json())
    
    //   const { data, error, isLoading } = useSWR('/api/siswa', fetcher);
    
    //   console.log({ data, error, isLoading });
return(
<>
<h1>Test Page</h1>
<Suspense fallback={<p>Loading...</p>}>
<Kopi />
</Suspense>
</>
)
}