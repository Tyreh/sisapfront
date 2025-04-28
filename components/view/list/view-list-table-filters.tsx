'use client'

import ViewRelationListTable, { ViewRelationListTableOption } from "../relation/view-relation-list-table";
import { useDebouncedCallback } from "use-debounce";
import { IconSearch } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import React from "react";

export interface ViewListTableFilterFieldsProps {
    title: string,
    type: string,
    name: string,
    option: string,
    depend?: string
}

export interface Filter {
    name: string;
    value: string;
}

interface ViewListTableFiltersProps {
    moduleName: string;
    query: string;
    setPage: (page: number) => void;
    setQuery: (query: string) => void;
    updatePreference: (key: string, value: any) => void;
}

export const ViewListTableFilters = ({
    moduleName,
    query,
    setQuery,
    updatePreference,
    setPage,
}: ViewListTableFiltersProps) => {

    const handleSearch = useDebouncedCallback(async (value: string) => {
        setQuery(value);
        setPage(0);
        updatePreference(`${moduleName}-vlp`, "0");
        updatePreference(`${moduleName}-vlq`, value);
    }, 500);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:space-y-0 space-y-4 sm:space-x-4">
            <div className="relative flex-grow w-full sm:w-fit">
                <Input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full pl-9 peer"
                    defaultValue={query}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                />
                <IconSearch className="h-4 w-4 absolute left-0 top-1/2 -translate-y-1/2 ms-2 text-muted-foreground peer-focus:text-gray-800" />
            </div>

    
        </div>
    );
}