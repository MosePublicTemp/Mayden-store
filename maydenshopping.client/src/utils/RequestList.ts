export interface RequestList {
  pageNumber: number;
  showing: number;
}

export const defaultState: RequestList = {
  pageNumber: 1,
  showing: 10,
};
