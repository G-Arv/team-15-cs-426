import * as React from "react";
import Textfield from "./ui/textfield.tsx";
import { PrimaryButton } from "./Button.tsx";
import MagnifyingGlassIcon from "../assets/Search Icon.svg";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", value, onChange }) => {

  return (
    <div className="flex items-center">
      <MagnifyingGlassIcon />
      <Textfield
        className="flex-1 px-4 py-2 outline-none bg-transparent"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <PrimaryButton btnText="search" handleClick={undefined}></PrimaryButton>
    </div>
  );
};

export default SearchBar;
