'use client'

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props {
    page: number;
    pageSize: number;
    pages: number;
    setPage: (page: number) => void;
    setPageSize: (page: number) => void;
    updatePreference: (key: string, value: any) => void;
    moduleName: string;
}

export function ViewListPagination({ page, pageSize, setPage, setPageSize, pages, updatePreference, moduleName }: Props) {
    return (
        <div className='flex flex-col items-center justify-end gap-2 space-x-2 py-2 sm:flex-row'>
            <div className='flex w-full items-center justify-between'>
                <div className='flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
                    <div className='flex items-center space-x-2'>
                        <p className='whitespace-nowrap text-sm font-medium'>Filas por página</p>
                        <Select
                            value={`${pageSize}`}
                            onValueChange={(value: string) => {
                                setPageSize(parseInt(value));
                                updatePreference(`${moduleName}-vlps`, value);
                            }}
                        >
                            <SelectTrigger className='h-8 w-[70px]'>
                                <SelectValue placeholder={pageSize} />
                            </SelectTrigger>
                            <SelectContent side='top'>
                                {[25, 50, 75, 100].map(item => (
                                    <SelectItem key={item} value={`${item}`}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className='flex w-full items-center justify-between gap-2 sm:justify-end'>
                <div className='flex w-[150px] items-center justify-center text-sm font-medium'>
                    Página {pages === 0 ? '0' : page + 1} de{" "}
                    {pages}
                </div>
                <div className='flex items-center space-x-2'>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => {
                            setPage(0);
                            updatePreference(`${moduleName}-vlp`, "0");
                        }}
                        disabled={page <= 0}
                    >
                        <span className="sr-only">Ir a la primera página</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            setPage((page - 1))
                            updatePreference(`${moduleName}-vlp`, (page - 1).toString());
                        }}
                        disabled={page <= 0}
                    >
                        <span className="sr-only">Regresar a la pagina anterior</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            setPage((page + 1))
                            updatePreference(`${moduleName}-vlp`, (page + 1).toString());
                        }}
                        disabled={page == (pages - 1) || pages == 0}
                    >
                        <span className="sr-only">Ir a la página siguiente</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => {
                            setPage((pages - 1))
                            updatePreference(`${moduleName}-vlp`, (pages - 1).toString());
                        }}
                        disabled={page == (pages - 1) || pages == 0}
                    >
                        <span className="sr-only">Ir a la última página</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>

        </div>
    )
}