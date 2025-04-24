// components/ViewDetailSingleFileType.tsx
"use client";

import React, { useState } from "react";
import { secureFetch } from "@/secure-fetch";
import { toast } from "@/hooks/use-toast";

interface Props {
    fileName: string;
}

export function ViewDetailSingleFileType({ fileName }: Props) {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const blob = await secureFetch(`/storage/file/${fileName}`, {
                method: "GET",
                disableContentType: true,
                disableJsonResponse: true,
            });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error al descargar",
                description: (error as Error).message,
            });
        }
        setLoading(false);
    };

    if (loading) return <div>Buscando...</div>;

    return (
        <button
            onClick={handleDownload}
            className="text-primary hover:underline"
        >
            {fileName}
        </button>
    );
}
