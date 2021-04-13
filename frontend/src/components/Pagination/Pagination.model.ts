export interface PaginationProps {
  page: number;
  loading: boolean;
  prevPage: () => void;
  nextPage: () => void;
  choosePage: (num: number) => void;
  minPage: number;
  maxPage: number;
}
