import prisma from '@/lib/prisma'

interface IParams {
    paymentId?: string
}

export default async function getPaymentById(
    params: IParams) {
    try {
        const { paymentId } = params

        const payment = await prisma.payment.findUnique({
            where: {
                id: paymentId
            }
        })
        if (!payment) return null

        return {
            ...payment
        }
    } catch (err: any) {
        throw new Error(err)
    }
}
