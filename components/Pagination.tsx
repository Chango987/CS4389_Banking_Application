'use client';

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useState, useEffect } from "react";
import axios from "axios";

export const Pagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // States for dynamic page and totalPages
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Parse page number from query params
    const queryPage = Number(searchParams.get("page")) || 1;
    setPage(queryPage);

    // Fetch total pages dynamically
    const fetchPaginationData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/pagination'); // Replace with actual API
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching pagination data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaginationData();
  }, [searchParams]);

  const handleNavigation = (type) => {
    const pageNumber = type === "prev" ? page - 1 : page + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageNumber.toString(),
    });

    setPage(pageNumber);
    router.push(newUrl, { scroll: false });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-between gap-3">
      <Button
        size="lg"
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={() => handleNavigation("prev")}
        disabled={Number(page) <= 1}
      >
        <Image
          src="/icons/arrow-left.svg"
          alt="arrow"
          width={20}
          height={20}
          className="mr-2"
        />
        Prev
      </Button>
      <p className="text-14 flex items-center px-2">
        {page} / {totalPages}
      </p>
      <Button
        size="lg"
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={() => handleNavigation("next")}
        disabled={Number(page) >= totalPages}
      >
        Next
        <Image
          src="/icons/arrow-left.svg"
          alt="arrow"
          width={20}
          height={20}
          className="ml-2 -scale-x-100"
        />
      </Button>
    </div>
  );
};
