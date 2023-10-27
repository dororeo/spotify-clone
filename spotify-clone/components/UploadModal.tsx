"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState();
    const uploadModal = useUploadModal();

    const {register, handleSubmit, reset} = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null, //files, not strings
        }
    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        //upload to supabase

    }

    return ( 
        <Modal
        title="Add a Song"
        description="Upload an mp3 file"
        isOpen={uploadModal.isOpen}
        onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input 
                id="title"
                disabled={isLoading}
                {...register('title', { required: true })} //spread props and attributes needed e.g. onchange, onblur, etc
                placeholder="Song Title"
                />
            </form>
        </Modal>
     );
}
 
export default UploadModal;