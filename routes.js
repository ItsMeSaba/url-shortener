const express = require('express');
const router = express.Router();
const Urls = require('./models/urlsModel'); 
const shortid = require('shortid');


router.get('/', (req, res) => {
    res.render('random.ejs');
})

router.get('/custom', (req, res) => {
    res.render('custom.ejs');
})

router.get('/:id', async (req, res) => {
    let newUrl = req.params.id;

    try {
        let response = await Urls.findOne({
            newUrl : newUrl
        })

        if(response) {
            let url = response.url;
            
            if(url.includes('http')) {
                res.redirect(url);
                return true;
            }

            res.redirect(`https://${url}`);


            return true;
        }

        res.send('Wrong URL');
    } catch(e) {
        console.log('ERROR', e);
        res.send('Something Went Wrong');
    }
}) 


router.post('/createUrl', async (req, res) => {
    let { url, newUrl } = req.body;
    console.log(url, newUrl);
    newUrl = (newUrl || shortid.generate());

    try {
        let response = await Urls.findOne({
            url : url
        })

        if(!response) {
            await Urls.create({
                url : url,
                newUrl : newUrl
            });

            res.status(200).send(newUrl);
            return true;
        }
        
        //If url already exists you can rewrite it
        await Urls.updateOne({ url : url }, { $set : { newUrl : newUrl } });
        
        res.status(200).send(newUrl);
        return true;

    } catch(e) {
        console.log('Error', e);
        res.status(400).send();
    }
})

module.exports = router; 