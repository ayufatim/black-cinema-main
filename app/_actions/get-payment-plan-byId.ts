import prisma from '@/lib/prisma'

interface IParams {
    paymentPlanId?: string
}

export default async function getPaymentPlanById(
    params: IParams) {
    try {
        const { paymentPlanId } = params

        const paymentPlan = await prisma.paymentPlan.findUnique({
            where: {
                id: paymentPlanId
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
