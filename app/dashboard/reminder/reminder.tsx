import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { secureFetch } from "@/secure-fetch";
import DeleteReminder from "./delete-reminder";
import ReminderForm from "./reminder-form";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react";

interface Props {
    apiUserId: string;
}

export default async function Reminder({ apiUserId }: Props) {
    const notes = await secureFetch(`/note/search?apiUserId=${apiUserId}`);

    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Notas y Recordatorios</CardTitle>
                <CardDescription>Este es un espacio personal diseñado para que puedas crear notas y recordatorios</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {notes.data.content.map((note: { createdAt: string, modifiedAt: string, id: string, content: string }, index: number) =>
                        <div key={index} className="my-2 bg-muted rounded-md p-3">
                            <div className="font-medium flex justify-between items-center pb-4">
                                <p className="text-sm text-muted-foreground">{note.createdAt} <span className="text-xs italic">{note.modifiedAt && `(Modificado el ${note.modifiedAt})`}</span></p>

                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel><ReminderForm id={note.id} /></DropdownMenuLabel>
                                            <DropdownMenuLabel><DeleteReminder noteId={note.id} /></DropdownMenuLabel>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <p className="text-sm break-all">{note.content}</p>
                        </div>
                    )}
                </div>
                <div className="flex justify-end pt-4">
                    <ReminderForm />
                </div>
            </CardContent>
        </Card>
    );

}