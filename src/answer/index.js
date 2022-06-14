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
const PW_ERROR_MSG = {
  required:"필수 정보입니다.",
  invalid : "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
}
const PW_CHECK_ERROR_MSG = {
  required:"필수 정보입니다.",
  invalid : "비밀번호가 일치하지 않습니다."
}

// ID 유효성 검사
const checkIdRegex = (value)=>{
  if (value.length===0){
    return 'required'
    // console.log(isValidId)
  } else {
    return ID_REGX.test(value) 
      ? true
      : 'invalid'
  }
}

const checkIdValidation = (value)=>{
  // (공통) 모든 필드의 값이 빠짐 없이 입력해야 한다.
  // 5-20자의 영문 소문자, 숫자의 특수기호(_),(-)만 사용 가능합니다.
  // 3. 커스텀 에러 메시지
  const isValidId = checkIdRegex(value)

  if (isValidId !== true){
    // isValid -> invalid 또는 required
    $id.classList.add('border-red-600')
    $idMsg.innerText = ID_ERROR_MSG[isValidId]
  } else{
    // isValid -> true
    $id.classList.remove('border-red-600')
    $idMsg.innerText = ""
  }
  return isValidId
}
// PW 유효성검사
const checkPwRegex = (value)=>{
  if (value.length===0){
    return'required'
  } else {
    return PW_REGX.test(value)? true : 'invalid'
  }
}
const checkPwValidation = (value)=>{
  const isValidPw = checkIdRegex(value)

  if (isValidPw !== true){
    // isValidPw -> invalid 또는 required
    $pw.classList.add('border-red-600')
    $pwMsg.innerText = PW_ERROR_MSG[isValidPw] // required 또는 invalid
  } else {
    $pw.classList.remove('border-red-600')
    $pwMsg.innerText = ""
  }
  return isValidPw
}
const checkPwCheckRegex = (value)=>{
  if (value.length === 0 ){
    return 'required'
  } else {
    return $pw.value === value ? true : 'invalid'
  }
}
// PW 확인 유효성 검사
const checkPwCheckValidation = (value)=>{
  const isValidPwCheck = checkPwCheckRegex(value)

  if (isValidPwCheck !== true){
    $pwCheck.classList.add('border-red-600')
    $pwCheckMsg.innerText = PW_CHECK_ERROR_MSG[isValidPwCheck]
  } else{
    $pwCheck.classList.remove('border-red-600')
    $pwCheckMsg.innerText = ""
  }
  return isValidPwCheck
}
$id.addEventListener('focusout',()=>checkIdValidation($id.value))
$pw.addEventListener('focusout',()=>checkPwValidation($pw.value))
$pwCheck.addEventListener('focusout',()=>checkPwCheckValidation($pwCheck.value))

// 4. 입력 확인 모달 창
const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')
const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')

$submit.addEventListener('click',(e)=>{
  e.preventDefault()
  const isValidForm = 
    checkIdValidation($id.value) === true &&
    checkPwValidation($pw.value) === true &&
    checkPwCheckValidation($pwCheck.value) === true

    if (isValidForm){
      $confirmId.innerText = $id.value
      $confirmPw.innerText = $pw.value
      $modal.showModal()
    } 
})

// 4.1 취소하기 버튼
const $cancelBtn = document.getElementById('cancel-btn')
$cancelBtn.addEventListener('click',()=>{
  $modal.close()
})
// 4.2 가입하기 버튼
const $approveBtn = document.getElementById('approve-btn')
$approveBtn.addEventListener('click',()=>{
  alert('가입되었습니다 🥳')
  $modal.close()
})

// 5. 폰트 사이즈 조절 버튼
const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')

const $html = document.documentElement
const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const getHtmlFontSize = ()=>{
  // px을 빼고 숫자만 파싱
  return parseFloat(window.getComputedStyle($html).fontSize)
}

$increaseFontBtn.addEventListener('click',()=>{
  onClickFontSizeControl("increase")
  // const nextFontSize =  getHtmlFontSize() + 1
  // $html.style.fontSize = nextFontSize // 20px
  // // 만약 20px 이상이면 increase 버튼 비활성
  // if (nextFontSize >= MAX_FONT_SIZE){
  //   $increaseFontBtn.disabled = true
  // } 
  // if (nextFontSize > MIN_FONT_SIZE){
  //   $decreaseFontBtn.disabled = false
  // }
})

$decreaseFontBtn.addEventListener('click',()=>{
  onClickFontSizeControl("decrease")
  // const nextFontSize  =  getHtmlFontSize() -1 
  // $html.style.fontSize = nextFontSize 
  // if (nextFontSize <= MIN_FONT_SIZE){
  //   $decreaseFontBtn.disabled = true
  // } 
  // if (nextFontSize < MAX_FONT_SIZE){
  //   $increaseFontBtn.disabled = false
  // }
})

// 리팩토링
const onClickFontSizeControl = (flag) =>{
  const fontSize = getHtmlFontSize()
  let newFontSize = flag === "increase" ? fontSize + 1 : fontSize -1
  $html.style.fontSize = newFontSize 
  $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE // true
  $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE // true
}