import { generateNanoId } from "../utils/helper.js"

import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js"

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = await generateNanoId(7)
    await saveShortUrl(url, shortUrl)
    return shortUrl
}

export const createShortUrlWithUser = async (url, userId, customUrl = null) => {
    console.log(userId);
    
    const shortUrl = customUrl || await generateNanoId(7)
    if (customUrl) {
        const exists = await getCustomShortUrl(customUrl)
        if(exists) throw new Error("Custom URL already exists!")
    }
    await saveShortUrl(url, shortUrl, userId)
    return shortUrl
}