import { generateNanoId } from "../utils/helper.js"
import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js"

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = await generateNanoId(7)
    await saveShortUrl(url, shortUrl)
    return shortUrl
}

export const createShortUrlWithUser = async (url, userId, slug = null) => {

    console.log(`url = ${url} \n custom url = ${slug}`);

    const shortUrl = slug || await generateNanoId(7)
    if (slug) {
        const exists = await getCustomShortUrl(slug)
        if (exists) throw new Error("Custom URL already exists!")
    }
    await saveShortUrl(url, shortUrl, userId)
    return shortUrl
}