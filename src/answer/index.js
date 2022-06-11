// TODO: 이 곳에 정답 코드를 작성해주세요.

// 1. autofocus
// 페이지가 로드 된 시점에 ID 입력 창에 Focus가 되어 있어야 합니다.
// 대상 : ID 입력 input 태그
// 시점 : 페이지(window)가 로드 되었을 때,
// 이벤트 : focus
const $id = document.getElementById('id')
window.addEventListener('load',()=>$id.focus())


// 2. 유효성 검사 로직
// ID, 비밀번호, 비밀번호 확인 필드에 대한 유효성 검사를 수행해야 합니다.









// idInput.addEventListener('input',()=>{
//   idInput.setCustomValidity('')
//   idInput.checkValidity()
// })

// idInput.addEventListener('invalid',()=>{
//   if (idInput.value===''){
//     idInput.setCustomValidity('아이디를 입력해주세요')
//   } else{
//     idInput.setCustomValidity('ㅁㄴㅇㅁㄴㅇ')
//   }
// })