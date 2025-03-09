export interface WatchListContent {
  id: number;
  title: string;
  type: string;
  episodes: number;
  chapters: number;
}

export interface WatchList {
  id: number;
  content: WatchListContent;
  contentId: number;
  createdAt: string;
  currentChap: number | null;
  currentEp: number | null;
  status: string;
  updatedAt: string;
  userId: number;
  user: {
    id: number;
    email: string;
  };
}

export interface WatchItem {
  id: number;
  title: string;
  type: string;
  currentEp: number | null;
  currentChap: number | null;
  status: string;
}

export interface WatchData {
  watchlists: WatchList[];
  total: number;
  currentPage: number;
  totalPages: number;
}
