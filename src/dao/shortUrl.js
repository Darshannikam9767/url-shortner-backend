import urlSchema from "../models/shortUrl.model.js"

export const saveShortUrl = async (url, shortUrl, userId) => {
    
    const newUrl = await new urlSchema({
        full_url: url,
        short_url: shortUrl
    })

    if (userId) {
        newUrl.user = userId
    }
    newUrl.save()
}

export const getShortUrl = async (id) => {
    return await urlSchema.findOneAndUpdate({short_url: id}, {$inc:{clicks : 1}})
}

export const getCustomShortUrl = async (customUrl) => {
    return await urlSchema.findOne({short_url:customUrl})
}