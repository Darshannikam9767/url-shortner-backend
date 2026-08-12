import urlSchema from "../config/models/shortUrl.model.js"

export const saveShortUrl = async (url, shortUrl, userId) => {
    const newUrl = await new urlSchema({
        full_url: url,
        short_url: shortUrl
    })

    if (userId) {
        newUrl.userId = userId
    }
    newUrl.save()
}

export const getShortUrl = async (id) => {
    return await urlSchema.findOne({short_url: id})
}