//사용중인 이메일인지 확인하는 함수
// export function emailInUse(text: string) {
//   try {
//     const emailtext = { email: text };

//     if (response.ok) {
//       //사용 가능한 이메일일 때 (사용중인 이메일이 아닐 때)
//       return false;
//     } else {
//       return true;
//     }
//   } catch (err) {
//     alert("서버 오류가 발생했습니다.");
//   }
// }

export function isEmailFormat(emailString: string) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(emailString);
}

//최소 x자 이상인지 판별
export function isMinLength(text: string, number: number) {
  return text.length >= number;
}

//최소 x자 미만인지 판별
export function isMaxLength(text: string, number: number) {
  return text.length <= number;
}

//영어 또는 숫자로만 이루어져있는지 검사
export function isAlphanumeric(input: string) {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(input);
}

export function isPasswordConfirmEqualToPassword(
  password: string,
  confirm: string
) {
  return password === confirm;
}
