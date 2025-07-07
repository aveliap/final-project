import React, { useEffect, useState } from "react";

const InputSearch = (props) => {
    const { name, handleSearch, filter } = props;

    const [query, setQuery] = useState("");

    useEffect(() => {
        handleSearch("");
        setQuery("");
    }, [filter]);

    const handleChange = (e) => {
        setQuery(e.target.value || "");

        if (e.target.value.length === 0) {
            return handleSearch("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-end mb-2 gap-1">
                <input
                    value={query}
                    onChange={handleChange}
                    className={`lg:px-5 lg:py-3 px-3 py-2 text-sm lg:text-base w-full max-w-md outline-none rounded-md border focus:shadow-sm bg-white`}
                    placeholder={`Search the ${name}`}
                />
                <button className="lg:px-7 lg:py-3 px-3 py-1 text-sm font-medium outline-none bg-primary hover:bg-emerald-600 rounded-md text-light lg:text-lg">
                    Search
                </button>
            </div>
        </form>
    );
};

export default InputSearch;
