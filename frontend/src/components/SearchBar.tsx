import { Input } from "./ui/input.tsx";
import { Button } from "./ui/button.tsx";
// import MagnifyingGlassIcon from "../assets/Search Icon.svg";

function SearchBar() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Search.." />
      <Button type="submit">Search</Button>
    </div>
  )
}

export default SearchBar;
