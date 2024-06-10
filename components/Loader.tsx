export const Loader = () => {
    return (
        <div style={styles.container}>
            <img src="https://res.cloudinary.com/dutlw7bko/image/upload/v1717329323/Cinema/Logo/Loading_glnsrw.gif" alt="Loading" style={styles.image} />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'transparent',
    },
    image: {
        width: '500px',
        height: 'auto',
    },
};