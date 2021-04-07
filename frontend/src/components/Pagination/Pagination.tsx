import React, { FC } from 'react';
import { PaginationProps } from './Pagination.model';

const Pagination: FC<PaginationProps> = ({
  page,
  minPage,
  maxPage,
  loading,
  nextPage,
  prevPage,
  choosePage,
}) => (
  <nav className="pagination is-centered" role="navigation" aria-label="pagination">
    <button
      className="pagination-previous"
      disabled={page === minPage || loading}
      onClick={prevPage}
    >
            Previous
    </button>
    <button
      className="pagination-next"
      disabled={page === maxPage || loading}
      onClick={nextPage}
    >
      Next page
    </button>
    <ul className="pagination-list">
      {
        page !== minPage
          ? <>
            {
              page > minPage + 4 ?
                <>
                  <li>
                    <button
                      className="pagination-link"
                      aria-label="Goto page 1"
                      onClick={() => choosePage(page - 4)}
                      disabled={loading}
                    >
                      {page - 4}
                    </button>
                  </li>
                  <li><span className="pagination-ellipsis">&hellip;</span></li>
                </>
                :
                <></>
            }
            <li>
              <button
                className="pagination-link"
                aria-label="Goto page 45"
                onClick={() => choosePage(page - 1)}
                disabled={loading}
              >
                {page - 1}
              </button>
            </li>
          </>
          : <></>
      }
      <li>
        <button
          className="pagination-link is-current"
          aria-label="Page 46" aria-current="page"
        >
          {page}
        </button>
      </li>
      {
        page !== maxPage
          ? <>
            <li>
              <button
                className="pagination-link"
                aria-label="Goto page 45"
                onClick={() => choosePage(page + 1)}
                disabled={loading}
              >
                {page + 1}
              </button>
            </li>
            {
              page < maxPage - 4 ?
                <>
                  <li><span className="pagination-ellipsis">&hellip;</span></li>
                  <li>
                    <button
                      className="pagination-link"
                      aria-label="Goto page 1"
                      onClick={() => choosePage(page + 4)}
                      disabled={loading}
                    >
                      {page + 4}
                    </button>
                  </li>
                </>
                :
                <></>
            }
          </>
          : <></>
      }
    </ul>
  </nav>
);

export default Pagination;
