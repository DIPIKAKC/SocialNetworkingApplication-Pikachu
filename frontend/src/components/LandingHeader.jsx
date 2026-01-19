

export default function LandingHeader() {
return (
    <header className="bg-blue-50 border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-8">
                <div className="text-xl sm:text-2xl font-semibold font-serif text-blue-600 cursor-pointer">
                    Pikachu
                    <p className="text-xs sm:text-sm font-extralight -mt-1 text-gray-400">Make me a buddy</p>
                </div>

            </div>
        </div>
    </header>
)
}
