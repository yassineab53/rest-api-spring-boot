import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page items
  const getPageItems = () => {
    const items = [];
    
    // Previous button
    items.push(
      <BootstrapPagination.Prev 
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );
    
    // First page
    items.push(
      <BootstrapPagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        1
      </BootstrapPagination.Item>
    );
    
    // Ellipsis if needed
    if (currentPage > 3) {
      items.push(<BootstrapPagination.Ellipsis key="ellipsis1" disabled />);
    }
    
    // Pages around current page
    for (let page = Math.max(2, currentPage - 1); page <= Math.min(totalPages - 1, currentPage + 1); page++) {
      if (page === 1 || page === totalPages) continue; // Skip first and last page as they're always shown
      items.push(
        <BootstrapPagination.Item
          key={page}
          active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </BootstrapPagination.Item>
      );
    }
    
    // Ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(<BootstrapPagination.Ellipsis key="ellipsis2" disabled />);
    }
    
    // Last page if there are more than 1 page
    if (totalPages > 1) {
      items.push(
        <BootstrapPagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </BootstrapPagination.Item>
      );
    }
    
    // Next button
    items.push(
      <BootstrapPagination.Next
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );
    
    return items;
  };

  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  return (
    <BootstrapPagination className="pagination">
      {getPageItems()}
    </BootstrapPagination>
  );
};

export default Pagination;