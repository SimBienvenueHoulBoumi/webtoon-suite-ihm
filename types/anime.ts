export interface Anime {
  id?: number;
  title: string;
  type: string;
  status: string;
  season?: number;
  episodes?: number;
  chapters?: number;
  currentEp?: number;
  currentChap?: number;
}
