export default interface Embed {
  author: {
    name: string,
    url: string,
    icon_url: string,
  },
  body: {
    title: string,
    description: string,
    url: string,
    color: string,
  },
  images: {
    image_url: string,
    thumbnail_url: string,
  },
  footer: {
    text: string,
    icon_url: string,
    timestamp: string,
  },
  fields: {
    name: string,
    inline: boolean,
    value: string,
  }[]
}
