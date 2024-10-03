"use client";

import { DataSiswa, SWRFetchData } from "@/app/lib/interface";
import useSWR from "swr";
import ModalAdd from "./ModalAdd";
import DeleteSiswaButton from "./DeleteSiswaButton";
import ModalUpdate from "./ModalUpdate";
import { useSearchParams } from "next/navigation";
import ComponentPagination from "./Pagination";
import { Button, Spinner } from "flowbite-react";

export default function TebleStudents() {
  const params = useSearchParams();
  const page = params.get("page");
  const fetcher = () =>
    fetch(`/api/siswa?page=${page || 1}`).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/siswa?page=${page || 1}`,
    fetcher
  );
  if (error)
    return (
      <div className="flex justify-center items-center w-screen h-[60vh] text-center mt-4">
        Failed to load
      </div>
    );
  if (isLoading)
    return (
      <div className="w-screen h-[60vh] flex items-center justify-center">
        <div className="flex items-center justify-center gap-4 text-center mt-4">
          <Spinner color={"warning"} />
          <p className="mt-2">loading table</p>
        </div>
      </div>
    );
  if (data.success === false) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center w-screen text-center mt-4">
        <h3>{data.message}</h3>
        <Button className="bg-yellow-500 hover:bg-yellow-600">
          Kembali ke halaman sebelumnya
        </Button>
      </div>
    );
  }
  const totalPages = data.totalPages;
  const totalSiswa = data.totalSiswa;
  return (
    <>
      <div className="md:col-start-1 md:col-end-3">
        <div className="w-full flex gap-4">
          <div>
            <ModalAdd />
          </div>
          <form action="" className="flex gap-4 w-full">
            <div className="w-full">
              <input
                type="search"
                name=""
                id=""
                autoFocus
                className="w-full font-normal text-black rounded-lg"
              />
            </div>
            <Button
              type="submit"
              className="bg-green-400 hover:bg-green-500 mb-4">
              Cari
            </Button>
          </form>
        </div>
        <div className="relative overflow-x-auto rounded-xl mb-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Jenis Kelamin
                </th>
                <th scope="col" className="px-6 py-3">
                  Nomor
                </th>
                <th scope="col" className="px-6 py-3">
                  Sudah Menilai
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data?.map((item: DataSiswa, index: number) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.name}
                    </th>
                    <td className="px-6 py-4">{item.gender}</td>
                    <td className="px-6 py-4">{item.phoneNumber}</td>
                    <td className="px-6 py-4">
                      {!item.status ? "Belum" : "Sudah"}
                    </td>
                    <td className="px-6 py-4 flex gap-4">
                      <ModalUpdate dataSiswa={item} />
                      <DeleteSiswaButton id={item.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <ComponentPagination totalPages={totalPages} />
        <p className="mt-2 text-center">{totalSiswa} siswa terdaftar</p>
      </div>
    </>
  );
}
