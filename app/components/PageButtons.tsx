'use client';
import React from "react";

const btnClasses = "btn btn-square btn-outline m-2";
const pageIndicatorClasses = "text-lg font-bold btn m-2";

 interface pageButtonProps {
  pageNumber: number
  setPage: (pageNumber: number) => void
};

const PageButtons = (props: pageButtonProps) => {
  const handlePageChange = (pageChange: -1 | 1) => {
    // Prevent going to negative page numbers
    if (props.pageNumber === 1 && pageChange === -1) return;

    if (pageChange === -1) {
      console.log("Previous page", props.setPage(props.pageNumber - 1));
    }
    if (pageChange === 1) {

      console.log("Next page", props.setPage(props.pageNumber + 1));
    }
  }
  return (
    <div className="flex justify-center">
      <button className={btnClasses} onClick={() => handlePageChange(-1)}>
        <svg
          xmlns="http://www.w4.org/2000/svg"
          className="h-5 w-6"
          fill="none"
          viewBox="1 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <div className={pageIndicatorClasses}>{props.pageNumber}</div>
      <button className={btnClasses} onClick={() => handlePageChange(1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default PageButtons;
