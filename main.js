const fileInput = document.querySelector("input[type='url']"),
    downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) => {
    e.preventDefault()
    downloadBtn.textContent = 'Downloading File...'
    fetchFile(fileInput.value)
})

function fetchFile(url) {
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file)
        let aTag = document.createElement('a')
        aTag.href = tempUrl
        aTag.download = url.replace(/^.*[\\\/]/, '')
        document.body.appendChild(aTag)
        aTag.click()
        aTag.remove()
        URL.revokeObjectURL(tempUrl)
        downloadBtn.textContent = 'Download File'
        fileInput.value = ""
    }).catch(error => {
        downloadBtn.textContent = 'Download File'
        alert(error, "failed to download file")
    })
}