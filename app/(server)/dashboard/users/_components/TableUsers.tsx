"use client";

import SkeletonWrapper from "@/components/SkeletonWrapper";
import { DataTableUsers } from "@/components/tables/users/DataTableUsers";
import { columnsUsers } from "@/components/tables/users/columns";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function TableUsers() {
    const users = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () =>
            fetch(
                `/api/user`
            ).then((res) => res.json()),
    });

    const [searchQuery, setSearchQuery] = useState('')

    console.log('data = ', users)

    return (
        <div className="w-full">
            <SkeletonWrapper isLoading={users.isLoading}>
                <DataTableUsers
                    data={users.data || []}
                    columns={columnsUsers}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </SkeletonWrapper>
        </div>
    );
}
