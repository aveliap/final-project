import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = (props) => {
    const { handlePageClick, paging } = props;
    return (
        <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={paging.totalPages}
            marginPagesDisplayed={0}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"page pagination"}
            activeClassName={"active"}
        />
    );
};

export default Pagination;
