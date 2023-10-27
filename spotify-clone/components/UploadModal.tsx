"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";


const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            artist: '',
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
        try{
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if(!imageFile || !songFile || !user) {
                toast.error("Missing fields");
                return; //prevent anything further
            }

            const uniqueID = uniqid(); //safely upload songs

            //upload song
            const {
                data: songData,
                error: songError,
                // songs bucket in supabase
             } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueID}`, songFile, {
                cacheControl: '3600',
                //When upsert is set to true, the file is overwritten if it exists. When set to false, an error is thrown if the object already exists. Defaults to false.
                upsert: false
             });

             if (songError) {
                setIsLoading(false);
                return toast.error("failed song upload..");
             }

             //upload image
             const {
                data: imageData,
                error: imageError,
                // songs bucket in supabase
             } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueID}`, imageFile, {
                cacheControl: '3600',
                //When upsert is set to true, the file is overwritten if it exists. When set to false, an error is thrown if the object already exists. Defaults to false.
                upsert: false
             });

             if (imageError) {
                setIsLoading(false);
                return toast.error("failed image upload..");
             }

             const {
                error: supabaseError
             } = await supabaseClient.from('songs').insert({
                user_id: user.id,
                title: values.title,
                artist: values.artist,
                image_path: imageData.path,
                song_path: songData.path
             })

             if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
             }

             router.refresh();
             setIsLoading(false);
             toast.success('Upload successful');
             reset();
             uploadModal.onClose();


        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <Modal
            title="Add a Song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })} //spread props and attributes needed e.g. onchange, onblur, etc
                    placeholder="Song Title"
                />
                <Input
                    id="artist"
                    disabled={isLoading}
                    {...register('artist', { required: true })} //spread props and attributes needed e.g. onchange, onblur, etc
                    placeholder="Song Artist"
                />
                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"
                        {...register('song', { required: true })} //spread props and attributes needed e.g. onchange, onblur, etc
                    />
                </div>
                <div>
                    <div className="pb-1">
                        Select cover image
                    </div>
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register('image', { required: true })} //spread props and attributes needed e.g. onchange, onblur, etc
                    />
                </div>
                <Button disabled={isLoading} type="submit">Upload</Button>
            </form>
        </Modal>
    );
}

export default UploadModal;