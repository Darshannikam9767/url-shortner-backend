import { getShortUrl } from "../dao/shortUrl.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const createShortUrl = wrapAsync(async (req, res) => {
    const { url } = req.body
    console.log(req.user);
    
    
    let shortUrl
    if (req.user) {
        
        shortUrl = await createShortUrlWithUser(url, req.user._id)
    } else {
        shortUrl = await createShortUrlWithoutUser(url)
    }
    res.json({
        "short_url": process.env.APP_URL + shortUrl
    })
})

export const createCustomShortUrl = wrapAsync(async (req, res) => {
    const { url, customUrl } = req.body
    const short_url = await createShortUrlWithUser(url, short_url)
    res.status(200).json({
        short_url: process.env.APP_URL + short_url
    })
}
)
export const redirectFromShortUrl = wrapAsync(async (req, res) => {

    const { id } = req.params
    console.log(`In get route url = ${id}`);
    const url = await getShortUrl(id)
    if (url) {
        res.redirect(url.full_url)
    } else {
        res.status(404).send("Not Found")
    }
})