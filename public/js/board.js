const submitBoard = () => {
    const image = document.getElementById('image').value
    const location = document.getElementById('location').value
    const content = document.getElementById('content').value
    const tag = document.getElementById('tag').value
    
    if (!(image && location && content && tag)) 
        return alert('모든 값을 입력해주세요.')
    
    fetch('/board/write', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image: image,
            location: location,
            content: content,
            tag: tag
        })
    }).then((res) => {
        console.log(res)
        if (res.status == 200) {
            console.log(res.status)
            window.location.href = '/board'
        } else
            return res.json()
    }).then((data) => {
        alert(data.message)
    })
}

const uploadImage = (event) => {
    const files = event.target.files;
    const fileArr = Array.prototype.slice.call(files)
    const src = document.querySelector("div#image_container")
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

    $("#image_container").empty()
    for(f of fileArr){
        var reader = new FileReader();
        reader.onload = function (e) {
            let img = document.createElement('img')
            img.setAttribute("class","img-fluid rounded w-100");
            img.src = e.target.result;
            src.appendChild(img);
        }
        reader.readAsDataURL(f);
    }
}