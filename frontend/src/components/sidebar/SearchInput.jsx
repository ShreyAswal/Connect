import { MdPersonSearch } from "react-icons/md";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-pink-500 text-white">
        {/* Imported from react icons for search button*/}
        <MdPersonSearch className="w-6 h-6 outline-none"/>
      </button>
    </form>
  );
}

export default SearchInput;
