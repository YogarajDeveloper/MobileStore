import React from 'react'
import Arrows from './Arrows';
import ReactPaginate from "react-paginate";

const Pagination = ({ paginationData, setPaginationData ,isRounded=true} ) => {    

    const { pageIndex, pageSize, totalPages, total } = paginationData;

    const startIndex = pageIndex * pageSize + 1;
    const endIndex = Math.min((pageIndex + 1) * pageSize, total);

    const handlePageClick = ({ selected }) => setPaginationData((prev) => ({ ...prev, pageIndex: selected }));

    const PaginationButton = ({ image, disabled, onClick }) => (
        <button
            className={`text-label px-2 ${disabled ? "pagination_disabled" : "cursor-pointer"}`}
            onClick={!disabled ? onClick : undefined}
        >
            <Arrows image={image} disabled={disabled} />
        </button>
    );

    return (
        <div
            className={`flex flex-col lg:flex-row items-center w-full h-full bg-secondary z-5 px-5 py-2 sticky bottom-0 border-t border-t-[#E5E6E8] overflow-hidden ${isRounded ? "rounded-[20px]" : "rounded-b-[20px]"}`}
        >

            {/* MOBILE COUNT (TOP) */}
            <div className="text-xs text-label lg:hidden mb-1">
                {startIndex}-{endIndex} of {total} items
            </div>

            {/* PAGINATION */}
            <div className="flex flex-1 justify-center items-center gap-3">

                <PaginationButton
                    image="double-left"
                    disabled={paginationData.pageIndex === 0}
                    onClick={() => setPaginationData(prev => ({ ...prev, pageIndex: 0 }))}
                />

                <PaginationButton
                    image="left"
                    disabled={paginationData.pageIndex === 0}
                    onClick={() =>
                        setPaginationData(prev => ({
                            ...prev,
                            pageIndex: Math.max(prev.pageIndex - 1, 0),
                        }))
                    }
                />

                <ReactPaginate
                    breakLabel="..."
                    // pageRangeDisplayed={3}
                    // marginPagesDisplayed={1}
                    // onPageChange={handlePageClick}
                    containerClassName="flex items-center gap-4 text-[#7B777F]"
                    activeClassName="bg-switchBorder cursor-pointer w-[30px] h-[30px] flex items-center justify-center rounded-[10px]"
                    pageClassName="cursor-pointer"
                    forcePage={paginationData.pageIndex}
                    pageCount={totalPages}
                    // previousLabel={null}
                    // nextLabel={null}
                />

                <PaginationButton
                    image="right"
                    disabled={paginationData.pageIndex === totalPages - 1}
                    onClick={() =>
                        setPaginationData(prev => ({
                            ...prev,
                            pageIndex: Math.min(prev.pageIndex + 1, totalPages - 1),
                        }))
                    }
                />

                <PaginationButton
                    image="double-right"
                    disabled={paginationData.pageIndex === totalPages - 1}
                    onClick={() =>
                        setPaginationData(prev => ({
                            ...prev,
                            pageIndex: totalPages - 1,
                        }))
                    }
                />
            </div>

            {/* DESKTOP COUNT (RIGHT) */}
            <div className="hidden lg:block text-sm text-label font-poppins-normal">
                {startIndex}-{endIndex} of {total} items
            </div>
        </div>

    )
}

export default Pagination