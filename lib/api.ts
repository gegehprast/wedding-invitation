import HttpException from "../exceptions/HttpException"

export interface RemarkDoc {
    _id: string
    fullname: string
    message: string
    presence: number
    createdAt: Date
    updatedAt: Date
    presenceText: string
}

export const getRemarks = async () => {
    return await fetch(process.env.NEXT_PUBLIC_FUNCTION_HOST + '/api/remarks').then(res => res.json())
}

export const storeRemark = async (fullname: string, message: string, presence: number) => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_FUNCTION_HOST}/api/store-remark`, {
            method: 'POST',
            body: JSON.stringify({ fullname, message, presence }),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
        })
        const jsonResp = await resp.clone().json()

        if (!resp.ok) {
            throw new HttpException(resp.status, jsonResp.message || resp.statusText, jsonResp.stack)
        }

        return true
    } catch (error) {
        return false
    }
}
