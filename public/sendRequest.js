(() => {
    let free = true;
    document.getElementById('mainForm').addEventListener('submit', async e => {
        e.preventDefault(); // Prevents page from refreshing
        if(!free) return false; // Indicates that request is already sent

        let url = document.getElementById('url').value;

        // if 'newUrl' exists takes it as custom new url
        // else it generates random url
        let newUrl = document.getElementById('newUrl') ? document.getElementById('newUrl').value : false;

        free = false; // at this point request is sending

        // Async request using fetch api
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

        // Successful response
        if(response.status === 200) {
            let redirectUrl = await response.text();

            aTag.innerHTML = `${location.origin}/${redirectUrl}`;
            aTag.href = `${location.origin}/${redirectUrl}`;
            free = true; // End of request

            return true;
        }

        // At this point something failed
        aTag.innerHTML = 'Something Went Wrong';
        free = true;
    })
})();