// import toast from "react-hot-toast";
import css from "./SearchBox.module.css";

interface searchBarProps {
  onChange: (query: string) => void;
}

export default function SearchBar({ onChange }: searchBarProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value.trim();
    // if (query === "") {
    //   toast("Please enter your search query.");
    //   return;
    // }
    onChange(query);
  }

  return (
    <input
      onChange={handleChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
