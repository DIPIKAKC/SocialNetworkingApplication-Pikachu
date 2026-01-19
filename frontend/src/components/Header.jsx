import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router";
import { useState } from "react";
import DropdownProfile from "./DropdownProfile";
import { useSelector } from "react-redux";

export default function Header() {
    const nav = useNavigate();
    const [query, setQuery] = useState("");
    const { user } = useSelector((state) => state.userSlice); //userslice ko matra initial state taneko

    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim()) {
            nav(`/search?q=${query}`);
            setQuery(""); 
        }
    };
    return (
        <header className="bg-blue-50 border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-8">
                    <div onClick={() => { nav('/') }} className="text-xl sm:text-2xl font-semibold font-serif text-blue-600 cursor-pointer">
                        Pikachu
                        <p className="text-xs sm:text-sm font-extralight -mt-1 text-gray-400">Make me a buddy</p>
                    </div>

                </div>

                <div className="flex items-center gap-2 sm:gap-8">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search users"
                            className="w-32 sm:w-48 md:w-64 pl-2 sm:pl-4 pr-2 sm:pr-4 py-2 bg-white border-1 rounded-lg text-sm sm:text-base"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleSearch} //
                        />
                    </div>

                    <DropdownProfile user={user} />

                </div>
            </div>
        </header>
    )
}