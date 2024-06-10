'use client'

import { useFavorite } from "@/lib/utils"
import { SafeUser } from "@/types/types"
import { Bookmark } from "lucide-react";

interface HeartButtonProps {
    movieId: string
    currentUser?: SafeUser | null
    classNameCustom?: string
}

const FavoriteButton: React.FC<HeartButtonProps> = ({
    movieId,
    currentUser,
    classNameCustom
}) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        movieId,
        currentUser
    })

    return (
        <div
            className={hasFavorited
                ? `${classNameCustom} hover:bg-[#d4b60f] text-[#d4b60f] hover:text-[#fff] duration-300`
                : `${classNameCustom} hover:bg-[#fff] text-[#fff] hover:text-[#d4b60f] duration-300`
            }
            onClick={toggleFavorite}
        >
            {hasFavorited ?
                <Bookmark className={'w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] cursor-pointer text-[#fcbe11]'} fill="#fcbe11" />
                :
                <Bookmark className={'w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] cursor-pointer text-[#fcbe11]'} />
            }
        </div>
    )
}

export default FavoriteButton