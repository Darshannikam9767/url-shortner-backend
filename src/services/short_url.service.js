import { generateNanoId } from "../utils/helper.js"

import { saveShortUrl } from "../dao/shortUrl.js"

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = await generateNanoId(7)
    await saveShortUrl(url, shortUrl)
    return shortUrl
}

export const createShortUrlWithUser = async (url) => {
    const shortUrl = await generateNanoId(7)
    await saveShortUrl(url, shortUrl,userID)
    return shortUrl
}