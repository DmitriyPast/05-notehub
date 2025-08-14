import axios from "axios";
import type { Note, NoteFormValues } from "../types/note";

// const myKey = import.meta.env.VITE_TMDB_TOKEN;
const ApiKey = import.meta.env.VITE_NOTEHUB_TOKEN;
// console.log(myKey);

// interface MovieHttpResponse {
//   results: Movie[];
//   total_pages: number;
// }
// export async function fetchMovies(
//   query: string,
//   page: number
// ): Promise<MovieHttpResponse> {
//   const url = "https://api.themoviedb.org/3/search/movie";
//   const res = await axios.get<MovieHttpResponse>(url, {
//     params: {
//       query,
//       page,
//     },
//     headers: {
//       Authorization: `Bearer ${myKey}`,
//     },
//   });
//   return res.data;
// }
// export const imgURL = "https://image.tmdb.org/t/p/w500";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes/";
axios.defaults.headers.common["Authorization"] = `Bearer ${ApiKey}`;
const url = "https://notehub-public.goit.study/api/notes";

export async function fetchNotes(
  search: string,
  page: number
): Promise<FetchNotesResponse> {
  const res = await axios.get<FetchNotesResponse>(url, {
    params: {
      search,
      page,
      perPage: 12,
    },
    // headers: {
    //   Authorization: `Bearer ${ApiKey}`,
    // },
  });
  return res.data;
}

export async function createNote(formData: NoteFormValues) {
  return await axios.post(url, formData);
}

export async function deleteNote(noteId: string) {
  return await axios.delete(`${noteId}`);
}
