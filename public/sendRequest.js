(() => {
    let free = true;
    document.getElementById('mainForm').addEventListener('submit', async e => {
        e.preventDefault();
        if(!free) return false;

        let url = document.getElementById('url').value;
        let newUrl = document.getElementById('newUrl') ? document.getElementById('newUrl').value : false;

        free = false;
        let response = await fetch('/createUrl', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                url : url,
                newUrl : newUrl
            })
        })

        let aTag = document.getElementsByClassName('info')[0];

        if(response.status === 200) {
            let redirectUrl = await response.text();

            aTag.innerHTML = `${location.origin}/${redirectUrl}`;
            aTag.href = `${location.origin}/${redirectUrl}`;
            free = true;
            return true;
        }

        aTag.innerHTML = 'Something Went Wrong';
        free = true;
    })
})();