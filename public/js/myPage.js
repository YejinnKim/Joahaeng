const updateUser = () => {
    const userid = document.getElementById('userid').value
    const newPassword = document.getElementById('newPassword').value
    const name = document.getElementById('name').value
    const phone = document.getElementById('phone').value
    const newPasswordCheck = document.getElementById('newPasswordCheck').value

    if (newPassword != newPasswordCheck) return alert('비밀번호가 일치하지 않습니다.')
    if (userid == newPassword) return alert('아이디와 비밀번호가 일치합니다.')
    if (newPassword.length < 8 ) return alert('비밀번호를 8글자 이상 입력하세요.')
    if (phone.length < 11 ) return alert('전화번호를 11글자 이상 입력하세요.')

    fetch('/myPage', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: newPassword,
            name: name,
            phone: phone
        })
    }).then((res) => {
        console.log(res)
        if (res.status == 200){
          alert('회원정보가 수정됐습니다.')
          location.reload()
        }else{
            return res.json()
        }
    }).then((data) => {
        alert(data.message)
    })

}

const deleteUser = () => {
    fetch('/myPage', {
        method: 'DELETE'
    }).then((res) => {
      alert('이용해 주셔서 감사합니다.')
      location.href = '/logout'
    })
}


//전화번호
const autoHyphen2 = (target) => {
    target.value = target.value
      .replace(/[^0-9]/g, '')
     .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
   }