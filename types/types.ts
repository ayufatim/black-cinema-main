export type Timeframe = "month" | "year";
export type Period = { year: number; month: number };

import { User, Movie, Payment, PaymentPlan, PaymentCard, PaymentPromo } from '@prisma/client'

export type SafeUser = Omit<User,
    'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: Date | string
    updatedAt: Date | string
    emailVerified: string | null
}

export type SafeMovie = Omit<
    Movie,
    "createdAt"
> & {
    createdAt: Date | string
}

export type SafePayment = Omit<
    Payment,
    "createdAt"
> & {
    createdAt?: Date | string
}

export type SafePaymentPlan = Omit<
    PaymentPlan,
    "createdAt"
> & {
    createdAt?: Date | string,
}

export type SafePaymentCard = Omit<
    PaymentCard,
    "createdAt"
> & {
    createdAt?: Date | string
}

export type SafePaymentPromo = Omit<
    PaymentPromo,
    "createdAt"
> & {
    createdAt?: Date | string
}