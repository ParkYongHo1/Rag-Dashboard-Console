import arrow from "@/assets/dashboard-list/arrow.svg";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex w-full justify-end p-3 gap-[10px]">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="cursor-pointer"
        aria-label="이전 페이지"
      >
        <img src={arrow} alt="이전" />
      </button>

      <div>
        {currentPage} / {totalPages}
      </div>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="cursor-pointer"
        aria-label="다음 페이지"
      >
        <img src={arrow} alt="다음" className="transform rotate-180" />
      </button>
    </div>
  );
};

export default Pagination;
