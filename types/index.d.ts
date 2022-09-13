export type Poster = {
  id: number;
  name: string;
  avatar_url: string;
  rating?: number;
};

export type SubsiteMetaData = {
  name: string;
  avatar: string;
  cover?: string;
  url: string;
  id: number;
  priority?: number;
};

export type SubsiteDataSorted = {
  meta: SubsiteMetaData;
  posters: Poster[];
};

export type CollectionSorted = {
  [subsiteURL: string]: SubsiteDataSorted;
};

export type TopPostersData = {
  domain: 'https://dtf.ru/' | 'https://tjournal.ru/';
  name: 'DTF' | 'TJournal';
  subsites: CollectionSorted;
  time: number;
};
