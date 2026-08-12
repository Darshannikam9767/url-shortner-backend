import { getShortUrl } from "../dao/shortUrl.js"
import { createShortUrlWithoutUser } from "../services/short_url.service.js"

export const createShortUrl = async (req, res) => {
    const { url } = req.body
    const shortUrl = await createShortUrlWithoutUser(url)
    res.send(process.env.APP_URL + shortUrl)
}

export const redirectFromShortUrl = async (req, res) => {

    const { id } = req.params
    console.log(`In get route url = ${id}`);
    const url = await getShortUrl(id)
    if (url) {
        res.redirect(url.full_url)
    } else {
        res.status(404).send("Not Found")
    }
}