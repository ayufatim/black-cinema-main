"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode, useState } from "react";
import { ThemeProvider } from "./ThemeProvider";

interface Props {
    children: ReactNode;
}

const Providers = (props: Props) => {
    const [client] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            })
    );
    return (
        <QueryClientProvider client={client}>
            <SessionProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {props.children}
                </ThemeProvider>
            </SessionProvider>
        </QueryClientProvider>
    )
};

export default Providers;
