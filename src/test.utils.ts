import * as CryptoJS from 'crypto-js'

function createJWT(payload: object) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }

  const stringifiedHeader = JSON.stringify(header)
  const encodedHeader = Buffer.from(stringifiedHeader).toString('base64')

  const stringifiedData = JSON.stringify(payload)
  const encodedData = Buffer.from(stringifiedData).toString('base64')

  const token = encodedHeader + '.' + encodedData

  const secret = 'My very confidential secret!'

  let signature = CryptoJS.HmacSHA256(token, secret).toString()
  signature = Buffer.from(signature).toString('base64')

  const signedToken = token + '.' + signature

  return signedToken
}

function generateToken(
  minutes: number
): { stringToken: string; iat: number; exp: number } {
  const iat = new Date()
  const exp = new Date(iat.getTime() - minutes * 1000 * 60)

  const iatNumber = Number.parseInt((iat.getTime() / 1000).toFixed())
  const expNumber = Number.parseInt((exp.getTime() / 1000).toFixed())

  const stringToken = createJWT({
    sub: 'username',
    name: 'Firstname Lastname',
    iat: iatNumber,
    exp: expNumber
  })

  return { stringToken, iat: iatNumber, exp: expNumber }
}

export default generateToken
