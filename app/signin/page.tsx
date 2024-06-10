import SignIn from "./_components/SingIn";

export default async function page() {
    return (
        <div
            className='min-w-screen min-h-screen bg-gray-700'
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
            <SignIn/>
        </div>
    )
}