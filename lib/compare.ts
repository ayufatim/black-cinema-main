import bcrypt from 'bcrypt';
import { getAllUser } from '@/app/_actions/get-all-user';
import Swal from 'sweetalert2';

export async function compare( email: string, password: string) {
    const users = await getAllUser();

    try {
        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Email and password are required',
            })
        }

        const foundUser = users.find((user: any) => user.email === email);

        if (foundUser && foundUser.password && await bcrypt.compare(password, foundUser.password)) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error(error);
    }
}
