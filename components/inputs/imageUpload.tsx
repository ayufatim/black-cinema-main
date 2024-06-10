'use client'

import { ImageUp } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"

interface ImageUploadProps {
    onChange: (value: string) => void
    value: string
}

declare global {
    var cloudinary: any
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: any) => {
        const imageUrl = result.info.secure_url;
        onChange(imageUrl);
    }, [onChange]);

    return <CldUploadWidget
        onSuccess={handleUpload}
        uploadPreset='z6euuqyl'
    >
        {({ open }) => {
            return (
                <div onClick={() => open && open()}
                    className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                >
                    <ImageUp size={50} />
                    <div className="font-semibold text-lg">
                        Click to upload
                    </div>
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            alt={`Uploaded image`}
                            fill
                            style={{ objectFit: 'cover' }}
                            src={value}
                            loading="lazy"
                        />
                    </div>
                </div>
            )
        }}
    </CldUploadWidget>
}

export default ImageUpload