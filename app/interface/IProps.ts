interface ISection {
  title: string
  url: string
}

interface IData {
  sections: ISection[]
  sidebar: ISidebar
  mainFeaturedPost: IMainPost
  featuredPosts: IFeaturePost[]
}

interface ISidebar {
  title: string
  description: string
  archives: ISection[]
  // social: any[]
}

interface IMainPost {
  title: string
  description: string
  image: string
  imageText: string
  linkText: string
}

interface IFeaturePost {
  title: string
  date: string
  description: string
  image: string
  imageLabel: string
}

export interface IProps {
  ok: boolean
  id: string
}

export interface IHomeLoader {
  ok: boolean
  data: IData
}