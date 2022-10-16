const submitBoard = () => {
    const image = document.getElementById('image').value
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const tag = document.getElementById('tag').value
    const contentid = new URLSearchParams(location.search).get('contentid')
    
    if (!(image && location && content && tag)) 
        return alert('모든 값을 입력해주세요.')
    
    fetch('/board/write', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image: image,
            title: title,
            content: content,
            tag: tag,
            contentid: contentid
        })
    }).then((res) => {
        console.log(res)
        if (res.status == 200) 
            window.location.href = '/board'
        else
            return res.json()
    }).then((data) => {
        alert(data.message)
    })
}

const uploadImage = (event) => {
    const files = event.target.files;
    const fileArr = Array.prototype.slice.call(files)
    const uploadFile = new FormData();
    const photos = document.querySelector('input[type="file"][multiple]')
    let fileName = []

    for (let i = 0; i < photos.files.length; i++) 
        uploadFile.append('uploadFile', photos.files[i])
    fetch('/board/image', {
        method: 'POST',
        body: uploadFile,
    }).then((res) => res.json()).
    then((result) => {
        for (let i=0; i < result.fileInfo.length; i++)
            fileName.push(result.fileInfo[i].filename)
    }).then(() => {
        document.getElementById('image').value = fileName;
    })

    document.getElementById('imglabel').remove()
    var l = document.createElement('label')
    l.setAttribute("id", "imglabel")
    l.setAttribute("for", "uploadFile")
    document.getElementById('image_container').appendChild(l)
    for(f of fileArr){
        var reader = new FileReader();
        reader.onload = function (e) {
            let img = document.createElement('img')
            img.setAttribute("class","img-fluid rounded w-100");
            img.src = e.target.result;
            l.appendChild(img);
        }
        reader.readAsDataURL(f);
    }
}

const deleteBoard = () => {
    let id = document.getElementById('boardid').value
    fetch(`/board?boardid=${id}`, {
        method: 'DELETE'
    }).then((res) => {
        location.reload()
    })
}

const updateBoard = () => {
    const image = document.getElementById('image').value
    const location = document.getElementById('location').value
    const content = document.getElementById('content').value
    const tag = document.getElementById('tag').value
    const boardid = document.getElementById('boardid').value
    
    if (!(location && content && tag)) 
        return alert('모든 값을 입력해주세요.')
    
    fetch('/board', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image: image,
            location: location,
            content: content,
            tag: tag,
            boardid: boardid
        })
    }).then((res) => {
        console.log(res)
        if (res.status == 200) 
            window.location.href = '/mytrip/board'
        else
            return res.json()
    }).then((data) => {
        alert(data.message)
    })

}