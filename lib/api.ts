import HttpException from "../exceptions/HttpException"

export interface Remark {
    fullname: string
    contact?: string
    bankAccount?: string
    nominal?: number
    message: string
    presence: number
}

export interface RemarkDoc extends Remark {
    _id: string
    createdAt: Date
    updatedAt: Date
    presenceText: string
}

export const getRemarks = async (): Promise<RemarkDoc[]> => {
    return await fetch(
        process.env.NEXT_PUBLIC_FUNCTION_HOST + '/api/remarks'
    ).then(res => res.json())
}

export const storeRemark: (remark: Remark) => Promise<boolean> = async ({
    fullname,
    contact,
    bankAccount,
    nominal,
    message,
    presence,
}) => {
    try {
        const resp = await fetch(
            `${process.env.NEXT_PUBLIC_FUNCTION_HOST}/api/store-remark`,
            {
                method: 'POST',
                body: JSON.stringify({
                    fullname,
                    contact,
                    bankAccount,
                    nominal,
                    message,
                    presence,
                }),
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
            }
        )
        const jsonResp = await resp.clone().json()

        if (!resp.ok) {
            throw new HttpException(
                resp.status,
                jsonResp.message || resp.statusText,
                jsonResp.stack
            )
        }

        return true
    } catch (error) {
        return false
    }
}
