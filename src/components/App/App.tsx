import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
// import type { Movie } from "../../types/note";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import SearchBar from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";

export default function App() {
  // const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [queryDebounced] = useDebounce(query, 1000);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", queryDebounced, page],
    queryFn: () => fetchNotes(queryDebounced, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && !data?.notes.length)
      toast("No notes found for your request.");
  }, [data, isSuccess]);

  // async function handleSubmit(query: string) {
  //   setQuery(query);
  //   setPage(1);
  // }

  // const handleSelect = (movie: Movie) => setSelectedMovie(movie);

  const handleClose = () => setModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {<SearchBar onChange={(query) => setQuery(query)} />}
        {/* Пагінація */}
        {data && data.totalPages > 0 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            setPage={(selected) => setPage(selected)}
          />
        )}
        {/* Кнопка створення нотатки */}
        {
          <button onClick={() => setModalOpen(true)} className={css.button}>
            Create note +
          </button>
        }
      </header>
      {query && isLoading && !data && <>Loading notes...</>}
      {query && isError && <>Error occured</>}
      {data && data.notes.length > 0 && <NoteList noteList={data.notes} />}
      {modalOpen && <Modal onClose={handleClose} />}
      <Toaster />
    </div>
  );
}

// <div className={css.app}>
//   <SearchBar onSubmit={handleSubmit} />

//   {query && isLoading && !data && <Loader />}

//   {query && isError && <ErrorMessage />}

//   {isSuccess && data.results.length > 0 && (
//     <>
//       {data.total_pages > 1 && (
//         <ReactPaginate
//           pageCount={data.total_pages}
//           pageRangeDisplayed={5}
//           marginPagesDisplayed={1}
//           onPageChange={({ selected }) => setPage(selected + 1)}
//           forcePage={page - 1}
//           containerClassName={css.pagination}
//           activeClassName={css.active}
//           nextLabel="→"
//           previousLabel="←"
//         />
//       )}

//       <MovieGrid onSelect={handleSelect} movies={data.results} />
//     </>
//   )}

//   {selectedMovie && (
//     <MovieModal movie={selectedMovie} onClose={handleClose} />
//   )}
//   <Toaster />
// </div>
