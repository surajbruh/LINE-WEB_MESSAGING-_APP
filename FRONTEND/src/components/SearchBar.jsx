import { Search } from "lucide-react";

export default function SearchBar({ handleChange }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Searching for:", query);
    };

    return (
        <div className="bg-[var(--color-bg-base)] sticky z-10 top-0 py-0.5">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg mx-auto my-2 px-2"
            >
                <div className="relative flex items-center text-[var(--color-text-primary)] ">
                    <Search className="absolute left-3 text-[var(--color-text-muted)]  w-5 h-5" />
                    <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 rounded-2xl border border-[var(--color-secondary-border)] outline-none bg-[var(--color-bg-surface)] shadow-sm text-sm md:text-base"
                    />
                </div>
            </form>
        </div>
    );
}
