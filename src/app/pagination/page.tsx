import { getDataSiswa } from "../lib/action";
import ComponentPagination from "./components/Pagination";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getDataSiswa(1);
  if (!Array.isArray(data)) {
    console.error("Error fetch data ", data);
    return;
  }
  const page = searchParams["page"] || "1";
  const per_page = searchParams["per_page"] || "5";
  const totalPages = Math.ceil(data.length / Number(per_page));
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);
  const enteries = data.slice(start, end);
  console.log(data.length);

  return (
    <div className="bg-cuslor-1">
      {enteries.map((item, index) => {
        return <p key={index}>{item.name}</p>;
      })}
      <ComponentPagination totalPages={totalPages} />
    </div>
  );
}
