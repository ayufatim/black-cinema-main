import prisma from '@/lib/prisma'

interface IParams {
    paymentCardId?: string
}

export default async function getPaymentCardById(
    params: IParams) {
    try {
        const { paymentCardId } = params

        const paymentCard = await prisma.paymentCard.findUnique({
            where: {
                id: paymentCardId
            }
        })
        if (!paymentCard) return null

        return {
            ...paymentCard
        }
    } catch (err: any) {
        throw new Error(err)
    }
}
