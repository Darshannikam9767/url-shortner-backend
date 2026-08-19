import { getShortUrl } from "../dao/shortUrl.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const createShortUrl = wrapAsync(async (req, res) => {
    const { url } = req.body
    
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
    console.log("in custom url route....")

    if (!req.user) {
        return res.status(401).json({
            message: "Login first to create custom url"
        })
    }

    const { url, slug } = req.body

    console.log(`url = ${url} \ncustom url = ${slug}`)

    try {
        const short_url = await createShortUrlWithUser(
            url,
            req.user._id,
            slug
        )

        return res.status(200).json({
            short_url: process.env.APP_URL + short_url
        })

    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Custom URL already exists"
            })
        }

        throw error
    }
})

export const redirectFromShortUrl = wrapAsync(async (req, res) => {

    const { id } = req.params
    const url = await getShortUrl(id)
    if (url) {
        res.redirect(url.full_url)
    } else {
        res.status(404).send("Not Found")
    }
})