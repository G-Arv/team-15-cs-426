import { useState } from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

export function Profile () {
    const [searchTerm, setSearchTerm] = useState("");

    return (
    <>
        <header>Profile Page</header>
        <NavBar />
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search items..." />
    </>
    );
}

export default Profile;