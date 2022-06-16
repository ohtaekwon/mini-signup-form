// TODO: 이 곳에 정답 코드를 작성해주세요.

// 1. autofocus
const $id = document.getElementById('id')
window.addEventListener('load',()=>$id.focus())

// 2. 유효성 검사 로직
const $pw = document.getElementById('pw')
const $pwCheck = document.getElementById('pw-check')
const ID_REGX = new RegExp('^[a-z0-9-_]{5,20}$') // 5~20자. 영문 소문자, 숫자. 특수기호(_),(-)만 사용 가능
const PW_REGX = new RegExp('^[a-zA-Z0-9]{8,16}$') // 8~16자. 영문 대/소문자, 숫자 사용 가능

// 에러 메시지 
const $idMsg = document.getElementById('id-msg')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheckMsg = document.getElementById('pw-check-msg')

const ERROR_MSG = {
  required : '필수 정보입니다.',
  invalidId : "5-20자의 영문 소문자, 숫자의 특수기호(_),(-)만 사용 가능합니다.",
  invalidPw : "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.",
  invalidPwCheck : "비밀번호가 일치하지 않습니다."
}
// 유효성 검사
const checkRegex = (target)=>{
  const {value, id} = target // value : target.value, id : target.id
  if (value.length===0){
    return 'required'
  } else {
    switch (id){
      case 'id':
        return ID_REGX.test(value) ? true : 'invalidId'
      case 'pw':
        return PW_REGX.test(value) ? true : 'invalidPw'
      case 'pw-check':
        return $pw.value === value ? true : 'invalidPwCheck'
    }
  }
}
// DOM 자체를 매개변수로한다.
const checkValidation = (target, msgTarget)=>{
  const isValid = checkRegex(target)
  if (isValid!==true){
    target.classList.add('border-red-600')
    msgTarget.innerText = ERROR_MSG[isValid]
  } else {
    target.classList.remove('border-red-600')
    msgTarget.innerText = ""
  }
  return isValid
}

$id.addEventListener('focusout',()=>checkValidation($id, $idMsg))
$pw.addEventListener('focusout',()=>checkValidation($pw, $pwMsg))
$pwCheck.addEventListener('focusout',()=>checkValidation($pwCheck, $pwCheckMsg))
 
// 4. 입력 확인 모달 창
const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')
const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')

$submit.addEventListener('click',(e)=>{
  e.preventDefault()
  const isValidForm = 
    checkValidation($id, $idMsg) === true &&
    checkValidation($pw, $pwMsg) === true &&
    checkValidation($pwCheck, $pwCheckMsg) === true
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
})
$decreaseFontBtn.addEventListener('click',()=>{
  onClickFontSizeControl("decrease")

})

// 리팩토링
const onClickFontSizeControl = (flag) =>{
  const fontSize = getHtmlFontSize()
  let newFontSize = flag === "increase" ? fontSize + 1 : fontSize -1
  $html.style.fontSize = newFontSize 
  $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE // true
  $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE // true
}