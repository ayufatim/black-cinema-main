import SignUp from "./_components/SignUp";
import { getAllUser } from "@/app/_actions/get-all-user";

export default async function page() {
    const user = await getAllUser()
    
    return (
        <div
            className='min-w-screen min-h-screen'
            style={
                {
                    backgroundImage: 'url(https://cineverse.id/wp-content/uploads/2023/12/kungfu-panda.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed'
                }
            }
        >
            <SignUp user={user}/>
        </div>
    )
}