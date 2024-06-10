import bcrypt from 'bcrypt'

export const hashedPass = async(password: any) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword
}