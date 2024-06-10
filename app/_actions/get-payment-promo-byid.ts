import prisma from '@/lib/prisma'

interface IParams {
    paymentPromoId?: string
}

export default async function getPaymentPromoById(
    params: IParams) {
    try {
        const { paymentPromoId } = params

        const paymentPlan = await prisma.paymentPromo.findUnique({
            where: {
                id: paymentPromoId
            }
        })
        if (!paymentPlan) return null

        return {
            ...paymentPlan
        }
    } catch (err: any) {
        throw new Error(err)
    }
}
