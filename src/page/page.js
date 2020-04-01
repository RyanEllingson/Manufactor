import React, { useState } from "react";

export const PageContext = React.createContext("page");

export function Page({ children }) {
    const [page, setPage] = useState("home");

    return (
        <PageContext.Provider
            value={{ page, setPage }}>
            {children}
        </PageContext.Provider>
    );
};