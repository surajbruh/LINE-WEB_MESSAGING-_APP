import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [dark]);

    return (
        <button
            onClick={() => setDark(!dark)}
            className="p-2 mx-6 border border-[var(--color-secondary-border)] rounded-full border-[var(--color-primary-border) bg-[var(--color-bg-base)] text-[var(--color-text-primary)] "
        >
            {dark ? "🌞" : "🌙"}
        </button>
    );
}
