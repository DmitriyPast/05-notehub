// export interface Movie {
//   id: number;
//   poster_path: string | null;
//   backdrop_path: string | null;
//   title: string;
//   overview: string;
//   release_date: string;
//   vote_average: number;
// }

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}
