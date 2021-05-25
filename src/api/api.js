import {get,post} from './http'

export const login = data => post('/app/v1_0/authorizations',data)

export const sendSms = (mobile) => get(`/app/v1_0/sms/codes/${mobile}`)