"use client";
import { toast } from "@/hooks/use-toast";
import { secureFetch } from "@/secure-fetch";
import React, { useState } from "react";

interface Props {
    files: { id: string; fileName: string }[];
}

export function ViewDetailFileType({ files }: Props) {
    const [loading, setLoading] = useState<boolean>();

    const handleDownload = async (filename: string) => {
        setLoading(true);
        try {
            const blob = await secureFetch(`/storage/file/${filename}`, {
                method: "GET",
                disableContentType: true,
                disableJsonResponse: true
            });


            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
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

    if (loading) {
        return <div>Buscando...</div>
    }

    return (
        <ul className="list-disc ml-4">
            {files.map((file) => (
                <li key={file.id}>
                    <button
                        onClick={() => handleDownload(file.fileName)}
                        className="text-primary hover:underline"
                    >
                        {file.fileName}
                    </button>
                </li>
            ))}
        </ul>
    );
}
