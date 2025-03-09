export type Content = {
  id?: number;
  title: string;
  type: string;
  status: string;
  episodes?: number;
  chapters?: number;
  currentEpisode?: number;
  currentChapter?: number;
};
