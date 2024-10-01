"use client";

import { Pagination } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ComponentPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    router.push(`/pagination?page=${currentPage}&per_page=5`);
  }, [currentPage]);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
