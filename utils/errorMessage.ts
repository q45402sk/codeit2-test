const ERROR_MESSAGE = {
  MUST: "값을 입력해주세요.",
  ID: {
    MIN: "최소 5자 이상 입력해 주세요.",
    MAX: "최대 글자수는 15자 입니다. ",
  },
  EMAIL: {
    FORMAT: "이메일 형식에 맞게 작성해 주세요.",
    IN_USE: "이미 사용중인 이메일 입니다.",
  },
  PASSWORD: {
    FORMAT: "영문 숫자 혼합 8자~20자로 입력해 주세요.",
  },
  PASSWORD_CONFIRM: {
    FORMAT: "영문 숫자 혼합 8자~20자로 입력해 주세요.",
    EQUAL: "비밀번호가 일치하지 않습니다.",
  },
};

export default ERROR_MESSAGE;
