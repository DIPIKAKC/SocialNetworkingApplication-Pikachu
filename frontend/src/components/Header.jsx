import { Bell, ChevronDown, Compass, Home, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router";

export default function Header() {
    const nav = useNavigate();
    return (
        <header className="bg-blue-50 border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div onClick={()=>{nav('/')}} className="text-2xl font-semibold font-serif text-gray-900 cursor-pointer">
                        Pikachu
                    </div>

                </div>

                {/* <nav className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="text-blue-500">
              <Home className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Compass className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </nav> */}

                <div className="flex items-center gap-8">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search"
                            className="w-64 pl-4 pr-4 py-2 bg-white border-1 rounded-lg"
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-2xl pr-2 cursor-pointer" onClick={()=>{nav('/profile')}}>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/api/placeholder/32/32" />
                            <AvatarFallback>RV</AvatarFallback>
                        </Avatar>
                        <ChevronDown className="size-4.5" />
                    </div>
                    {/* <span className="font-medium text-sm">Reinhard Van Zry</span> */}
                </div>
            </div>
        </header>
    )
}
