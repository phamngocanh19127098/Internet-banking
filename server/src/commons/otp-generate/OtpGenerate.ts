const otpGenerator = require('otp-generator')

export function generateOTPCode() {
    return otpGenerator.generate(6, {upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false});
}