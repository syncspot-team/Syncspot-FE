import IconArrow from '@src/assets/icons/IconTriangle.svg?react';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: IPaginationProps) {
  const currentGroup = Math.floor(currentPage / 5);
  const startPage = currentGroup * 5;
  const endPage = Math.min(startPage + 5, totalPages);

  return (
    <div className="h-[0.7fr] flex items-center justify-center gap-4 mt-4">
      {currentGroup > 0 && (
        <IconArrow
          className="size-5 hover:cursor-pointer text-blue-light02"
          onClick={() => onPageChange(startPage - 1)}
        />
      )}
      {Array.from({ length: endPage - startPage }, (_, i) => startPage + i).map(
        (page) => (
          <button
            key={page}
            className={`flex items-center justify-center size-8 rounded-lg ${
              currentPage === page
                ? 'bg-blue-100 text-blue-dark01'
                : 'hover:bg-gray-light text-gray-dark'
            }`}
            onClick={() => onPageChange(page)}
          >
            {page + 1}
          </button>
        ),
      )}
      {endPage < totalPages && (
        <IconArrow
          className="rotate-180 size-5 hover:cursor-pointer text-blue-light02"
          onClick={() => onPageChange(endPage)}
        />
      )}
    </div>
  );
}
