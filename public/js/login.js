const login = () => {
    let userid = document.getElementById('userid').value
    let userpw = document.getElementById('userpw').value

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: userid,
            pw: userpw
        })
    }).then((res) => {
        if (res.status == 200)
            location.href = '/'
        else if (res.status == 400)
            return res.json()
    }).then((data) => {
        alert(data.message)
    })
}

const join = () => {
    let userid = document.getElementById('userid').value
    let userpw = document.getElementById('userpw').value
    let userpwck = document.getElementById('userpwck').value
    let username = document.getElementById('username').value
    let userphone = document.getElementById('userphone').value

    if (!(userid && userpw && userpwck && username && userphone)) return alert('모든 값을 입력해주세요.')
    if (userpw != userpwck) return alert('비밀번호가 일치하지 않습니다.')

    fetch('/join', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: userid,
            pw: userpw,
            name: username,
            phone: userphone
        })
    }).then((res) => {
        if (res.status == 200) {
            location.href = '/login'
        } else if (res.status == 400)
            return res.json()
    }).then((data) => {
        alert(data.message)
    })
}