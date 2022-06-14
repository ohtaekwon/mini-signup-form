// TODO: 이 곳에 정답 코드를 작성해주세요.

// 1. autofocus
// 페이지가 로드 된 시점에 ID 입력 창에 Focus가 되어 있어야 합니다.
// 대상 : ID 입력 input 태그
// 이벤트 : 페이지(window)가 로드 되었을 때,
// 핸들러 : focus
const $id = document.getElementById('id')
window.addEventListener('load',()=>$id.focus())

// 2. 유효성 검사 로직
// ID, 비밀번호, 비밀번호 확인 필드에 대한 유효성 검사를 수행해야 합니다.
// 대상 : ID, 비밀번호, 비밀번호 확인 - input 필드
// 이벤트 : (1)input focus out (2)가입하기 버튼을 눌렀을 때
// 핸들러 : (1)해당 input의 유효성 검사 (2) 모든 필드의 유효성 검사
const $pw = document.getElementById('pw')
const $pwCheck = document.getElementById('pw-check')
const $submit = document.getElementById('submit')
const ID_REGX = new RegExp('^[a-z0-9-_]{5,20}$') // 5~20자. 영문 소문자, 숫자. 특수기호(_),(-)만 사용 가능
const PW_REGX = new RegExp('^[a-zA-Z0-9]{8,16}$') // 8~16자. 영문 대/소문자, 숫자 사용 가능

// 에러 메시지 
const $idMsg = document.getElementById('id-msg')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheckMsg = document.getElementById('pw-check-msg')

const ID_ERROR_MSG = {
  required :"필수 정보입니다.",
  invalid : "5-20자의 영문 소문자, 숫자의 특수기호(_),(-)만 사용 가능합니다."
}
// ID 유효성 검사
const checkIdValidation = (value)=>{
  // (공통) 모든 필드의 값이 빠짐 없이 입력해야 한다.
  // 5-20자의 영문 소문자, 숫자의 특수기호(_),(-)만 사용 가능합니다.
  // 3. 커스텀 에러 메시지
  if (value.length===0){
    isValidId = 'required'
    // console.log(isValidId)
  } else {
    isValidId = ID_REGX.test(value) 
      ? true
      : 'invalid'
    // console.log(isValidId)
  }
  if (isValidId !== true){
    // isValid -> invalid 또는 required
    $id.classList.add('border-red-600')
    $idMsg.innerText = ID_ERROR_MSG[isValidId]
  } else{
    // isValid -> true
    $id.classList.remove('border-red-600')
    $idMsg.innerText = ""
  }
}
// pw 유효성검사
const checkPwValidation = (value)=>{
  const isValidPw = PW_REGX.test(value)
  console.log(isValidPw)
}
// 비밀번호 확인
const checkPwCheckValidation = (value)=>{
  const isValidPwCheck = $pw.value === value
  console.log(isValidPwCheck)
}
$id.addEventListener('focusout',()=>checkIdValidation($id.value))
$pw.addEventListener('focusout',()=>checkPwValidation($pw.value))
$pwCheck.addEventListener('focusout',()=>checkPwCheckValidation($pwCheck.value))
$submit.addEventListener('click',(e)=>{
  e.preventDefault()
  const submitId = checkIdValidation($id.value)
  const submitPw = checkPwValidation($pw.value)
  const submitPwCheck = checkPwCheckValidation($pwCheck.value)
  submitId && submitPw && submitPwCheck ? console.log('true') : console.log('false')
})