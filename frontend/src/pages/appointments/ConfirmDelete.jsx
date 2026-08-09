import React, { useRef, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import useDeleteAppointment from '@/hooks/appointments/useDeleteAppointment';
import { useQueryClient } from '@tanstack/react-query';

const ConfirmDelete = ({id}) => {
    const { deleteAppointment, isPending } = useDeleteAppointment();
    const [open, setOpen] = useState(false);



    const handleDeleteAppointment = () => {
        deleteAppointment(id, {
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button className="bg-red-500 text-white rounded-lg h-9
                cursor-pointer hover:bg-red-600 flex items-center justify-center gap px-4
                text-sm" >
                    Delete
                </Button>} />
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className={"text-center p-4"}>
                        Are you sure you want to delete this appointment?
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-row items-center gap-4 justify-center">
                    <DialogFooter>
                        <DialogClose 
                        render={<Button variant="outline" className={"cursor-pointer"}>Cancel</Button>} />
                        <Button type="button" onClick={()=> handleDeleteAppointment()}
                        className={'bg-red-500 cursor-pointer text-white hover:bg-red-600'}>
                            {isPending ? 'Deleting...' : 'Confirm Delete'}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmDelete