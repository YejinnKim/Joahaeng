const zzim = (id) => {
    let heart = document.getElementById(id).classList

    if (heart.contains('far')) {
        fetch('/mytrip/zzim', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contentid: id
            })
        }).then((res) => {
            if (res.status == 200)
                heart.replace('far', 'fa')
            else
                return res.json()
        }).then((data) => {
            alert(data.message)
        })
    } else {
        fetch('/mytrip/zzim', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contentid: id
            })
        }).then((res) => {
            if (res.status == 200)
                heart.replace('fa', 'far')
        })
    }
}