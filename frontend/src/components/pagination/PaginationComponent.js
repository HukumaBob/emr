import React from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";

const PaginationComponent = ({ currentPage, totalPages, setCurrentPage }) => {
  const dispatch = useDispatch();

  return (
    <Pagination className="justify-content-center pb-3">
      <Pagination.First onClick={() => dispatch(setCurrentPage(1))} />
      <Pagination.Prev
        onClick={() =>
          dispatch(setCurrentPage(currentPage > 1 ? currentPage - 1 : 1))
        }
      />
      {totalPages > 1 && (
        <Pagination.Item onClick={() => dispatch(setCurrentPage(1))}>
          {1}
        </Pagination.Item>
      )}

      {/* Показываем номера страниц вокруг текущей страницы */}
      {totalPages > 2 && currentPage > 2 && (
        <Pagination.Item
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        >
          {currentPage - 1}
        </Pagination.Item>
      )}
      {totalPages > 2 && currentPage > 1 && currentPage < totalPages && (
        <Pagination.Item active>{currentPage}</Pagination.Item>
      )}
      {totalPages > 2 && currentPage < totalPages - 1 && (
        <Pagination.Item
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        >
          {currentPage + 1}
        </Pagination.Item>
      )}

      {totalPages > 1 && (
        <Pagination.Item onClick={() => dispatch(setCurrentPage(totalPages))}>
          {totalPages}
        </Pagination.Item>
      )}
      <Pagination.Next
        onClick={() =>
          dispatch(
            setCurrentPage(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          )
        }
      />
      <Pagination.Last onClick={() => dispatch(setCurrentPage(totalPages))} />
    </Pagination>
  );
};

export default PaginationComponent;
