"use client"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import {
    Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger
} from "@/components/ui/sheet"
import {
    useEffect, useMemo, useState
} from "react"
import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useDebouncedCallback } from "use-debounce"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    ArrowDownIcon, ArrowUpIcon, CaretSortIcon,
    EyeNoneIcon, PlusCircledIcon
} from "@radix-ui/react-icons"
import { getNestedValue } from "@/lib/utils"
import { secureFetch } from "@/secure-fetch"
import { Input } from "@/components/ui/input"
import { IconSearch } from "@tabler/icons-react"
import { ViewRelationPagination } from "./view-relation-pagination"
import { ChevronsUpDown, Loader2, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { nanoid } from "nanoid"

enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}

interface Field {
    name: string
    label: string
    sortable: boolean
    nestedField?: string
    sortKey?: string
}

interface Metadata {
    fields: Field[]
    singular: string
    plural: string
    mainField: string
}

interface Props {
    module: string
    onSelect: (selectedItem: ViewRelationListTableOption | null) => void
    defaultLabel?: string;
    selectedId?: number
    label?: boolean
}

export interface ViewRelationListTableOption {
    id: string
    label: string
}

export default function ViewRelationListTable({
    module,
    onSelect,
    selectedId,
    defaultLabel,
    label
}: Props) {
    const [loading, setLoading] = useState<boolean>(true)
    const [query, setQuery] = useState<string>("")
    const [sortColumn, setSortColumn] = useState<string | null>(null)
    const [sortOrder, setSortOrder] = useState<string | null>(null)
    const [page, setPage] = useState<number>(0)
    const [pages, setPages] = useState(0)
    const [data, setData] = useState([])
    const [metadata, setMetadata] = useState<Metadata>()
    const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set())

    const selectedLabel = useMemo(() => {
        if (!selectedId || !metadata) return undefined;
        const selectedItem = data.find((item: any) => item.id === selectedId);
        return selectedItem ? getNestedValue(selectedItem, metadata.mainField) : defaultLabel;
    }, [selectedId, data, metadata, defaultLabel]);

    const [open, setOpen] = useState<boolean>(false)

    const toggleColumnVisibility = (column: string) => {
        setHiddenColumns(prev => {
            const newHidden = new Set(prev)
            if (newHidden.has(column)) {
                newHidden.delete(column)
            } else {
                newHidden.add(column)
            }
            return newHidden
        })
    }

    const handleSort = (column: string, order: SortOrder) => {
        setSortColumn(column)
        setSortOrder(order)
    }

    const handleSearch = useDebouncedCallback(async (value: string) => {
        setQuery(value)
        setPages(0)
        setPage(0)
    }, 500)

    useEffect(() => {
        const fetchInitData = async () => {
            setLoading(true)
            let endpoint = `/${module}/search?`
            if (query !== "") endpoint += `query=${query}&`
            if (sortColumn && sortOrder) endpoint += `sort=${sortColumn},${sortOrder}&`
            endpoint += `page=${page}&`
            const response = await secureFetch(endpoint)
            setMetadata(response.metadata)
            setData(response.data.content)
            setPage(response.data.pageable.pageNumber)
            setPages(response.data.totalPages)
            setLoading(false)
        }

        fetchInitData()
    }, [module, sortColumn, sortOrder, query, page, pages])

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <div className="flex flex-1">
                <SheetTrigger asChild>
                    {label ? (
                        <Button variant="outline" disabled={loading && !open} className={`${selectedId ? "rounded-e-none" : ""}`}>
                            {loading && !open ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircledIcon className="mr-2 h-4 w-4" />}
                            {metadata?.singular || "Cargando"}
                            {selectedId && (
                                <>
                                    <Separator orientation="vertical" className="mx-2 h-4" />
                                    <div className="space-x-1 lg:flex">
                                        <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                            {selectedLabel || selectedId}
                                        </Badge>
                                    </div>
                                </>
                            )}
                        </Button>
                    ) : (
                        <Button variant="outline" className="w-full justify-between">
                            {selectedLabel ?? "Seleccionar..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    )}
                </SheetTrigger>
                {selectedId && label && (
                    <Button variant="outline" className="rounded-s-none" size="icon" onClick={() => onSelect(null)}>
                        <X />
                    </Button>
                )}
            </div>

            <SheetContent side="bottom" className="max-h-[80vh] h-[80vh]">
                <SheetHeader>
                    <SheetTitle>Buscar {metadata?.singular}</SheetTitle>
                    <SheetDescription>Busca un registro en la lista y haz tu elección.</SheetDescription>
                </SheetHeader>

                <div className="py-4 flex flex-col sm:flex-row justify-between items-center w-full sm:space-y-0 space-y-4 sm:space-x-4">
                    <div className="relative flex-grow w-full sm:w-fit">
                        <Input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full pl-9 peer"
                            defaultValue={query}
                            onChange={(e) => {
                                handleSearch(e.target.value)
                            }}
                        />
                        <IconSearch className="h-4 w-4 absolute left-0 top-1/2 -translate-y-1/2 ms-2 text-muted-foreground peer-focus:text-gray-800" />
                    </div>
                    <ViewRelationPagination page={page} pages={pages} setPage={setPage} />
                </div>

                <div className="overflow-y-auto max-h-[60vh]">
                    {loading ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <TableHead key={index}>
                                            <Skeleton className="h-4 w-full" />
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <TableRow key={index}>
                                        {Array.from({ length: 5 }).map((_, secondIndex) => (
                                            <TableCell key={`${index}-${secondIndex}`}>
                                                <Skeleton className="h-4 w-full" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {metadata?.fields
                                        .filter((field: Field) => !hiddenColumns.has(field.name))
                                        .map((field: Field) => (
                                            <TableHead key={field.name}>
                                                <div className="flex items-center space-x-2">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="-ml-3 h-8 data-[state=open]:bg-accent text-wrap my-2 py-5"
                                                            >
                                                                {field.label}
                                                                {sortColumn === (field.sortKey || field.name) && sortOrder === SortOrder.DESC ? (
                                                                    <ArrowDownIcon className="ml-2 h-4 w-4" />
                                                                ) : sortColumn === (field.sortKey || field.name) && sortOrder === SortOrder.ASC ? (
                                                                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                                                                ) : (
                                                                    <CaretSortIcon className="ml-2 h-4 w-4" />
                                                                )}
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="start">
                                                            {field.sortable && (
                                                                <>
                                                                    <DropdownMenuItem onClick={() => handleSort(field.sortKey || field.name, SortOrder.ASC)}>
                                                                        <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                                                        Orden Ascendente
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => handleSort(field.sortKey || field.name, SortOrder.DESC)}>
                                                                        <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                                                        Orden Descendente
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                </>
                                                            )}
                                                            <DropdownMenuItem onClick={() => toggleColumnVisibility(field.name)}>
                                                                <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                                                Ocultar Columna
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableHead>
                                        ))}
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((item: any) => (
                                    <TableRow key={nanoid()}>
                                        {metadata?.fields?.filter(field => !hiddenColumns.has(field.name)).map(field => {
                                            const nestedField = field.nestedField || field.name
                                            const fieldValue = getNestedValue(item, nestedField)
                                            return (
                                                <TableCell key={`${item.id}-${field.name}`}>
                                                    {fieldValue}
                                                </TableCell>
                                            )
                                        })}
                                        <TableCell>
                                            {selectedId === item.id ? (
                                                <Button size="sm" disabled>Seleccionado</Button>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        onSelect(item.id)
                                                        // setSelectedLabel(getNestedValue(item, metadata?.mainField || item.id));
                                                        setOpen(false)
                                                    }}
                                                >
                                                    Seleccionar
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
