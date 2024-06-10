"use client";

import SkeletonWrapper from "@/components/SkeletonWrapper";
import { DataTableMovies } from "@/components/tables/movies/DataTableMovies";
import { columnsMovies } from "@/components/tables/movies/columns";
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export default function TableMovies() {
    const movies = useQuery<Movie[]>({
        queryKey: ["movies"],
        queryFn: () =>
            fetch(
                `/api/movie`
            ).then((res) => res.json()),
    });
    
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className="w-full">
            <SkeletonWrapper isLoading={movies.isLoading}>
                <DataTableMovies
                    data={movies.data || []}
                    columns={columnsMovies}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </SkeletonWrapper>
        </div>
    );
}
