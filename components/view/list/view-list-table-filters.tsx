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
    filterEndpoints?: string[];
    filters: Filter[];
    setPage: (page: number) => void;
    setQuery: (query: string) => void;
    setFilters: (filters: Filter[]) => void;
    updatePreference: (key: string, value: any) => void;
}

export const ViewListTableFilters = ({
    moduleName,
    query,
    setQuery,
    updatePreference,
    setPage,
    filterEndpoints,
    filters,
    setFilters
}: ViewListTableFiltersProps) => {

    const handleSearch = useDebouncedCallback(async (value: string) => {
        setQuery(value);
        setPage(0);
        updatePreference(`${moduleName}-vlp`, "0");
        updatePreference(`${moduleName}-vlq`, value);
    }, 500);

    const handleSelect = (selectedItem: ViewRelationListTableOption, endpoint: string) => {
        setFilters(prevFilters => {
            let updatedFilters = prevFilters.filter(filter => filter.name !== endpoint);

            if (selectedItem) {
                // Agregar solo si selectedItem no es null
                updatedFilters = [...updatedFilters, { name: endpoint, value: selectedItem.id }];
                updatePreference(`${moduleName}-vlf`, updatedFilters);
            } else {
                // Si selectedItem es null, eliminar de las preferencias
                updatePreference(`${moduleName}-vlf`, updatedFilters);
            }

            return updatedFilters;
        });
    };


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

            <div className="flex flex-row items-center space-x-4">
                {filterEndpoints && filterEndpoints.map((filter, index) => (
                    <React.Fragment key={index}>
                        <ViewRelationListTable
                            module={filter}
                            onSelect={(selectedItem: any) => handleSelect(selectedItem, filter)}
                            label={true}
                            defaultOptionId={
                                filters.find(f => f.name === filter)
                                    ? filters.find(f => f.name === filter)!.value 
                                    : undefined
                            }
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}