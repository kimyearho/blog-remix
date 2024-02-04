import { Outlet, json, useLoaderData, useLocation } from "@remix-run/react"
import { IHomeLoader } from "~/interface/IProps";
import { Grid } from "@mui/material";
import Footer from "~/components/common/layouts/Footer"
import Header from "~/components/common/layouts/Header"
import MainFeaturedPost from "~/components/MainFeaturedPost";
import FeaturedPost from "~/components/FeaturedPost";
import Sidebar from "~/components/common/layouts/Sidebar";

export const loader = async () => {
    return json(
        {
            ok: true,
            data: {
                sections: [
                    { title: 'Technology', url: '#' },
                    { title: 'Design', url: '#' },
                    { title: 'Culture', url: '#' },
                    { title: 'Business', url: '#' },
                    { title: 'Politics', url: '#' },
                    { title: 'Opinion', url: '#' },
                    { title: 'Science', url: '#' },
                    { title: 'Health', url: '#' },
                    { title: 'Style', url: '#' },
                    { title: 'Travel', url: '#' },
                ],
                sidebar: {
                    title: 'About',
                    description:
                        'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
                    archives: [
                        { title: 'Movie 페이지', url: '/movie' },
                    ],
                },
                mainFeaturedPost: {
                    title: 'Title of a longer featured blog post',
                    description:
                        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
                    image: 'https://source.unsplash.com/random?wallpapers',
                    imageText: 'main image description',
                    linkText: 'Continue reading…',
                },
                featuredPosts: [
                    {
                        title: 'Featured post',
                        date: 'Nov 12',
                        description:
                            'This is a wider card with supporting text below as a natural lead-in to additional content.',
                        image: 'https://source.unsplash.com/random?wallpapers',
                        imageLabel: 'Image Text',
                    },
                    {
                        title: 'Post title',
                        date: 'Nov 11',
                        description:
                            'This is a wider card with supporting text below as a natural lead-in to additional content.',
                        image: 'https://source.unsplash.com/random?wallpapers',
                        imageLabel: 'Image Text',
                    },
                ]
            }
        }
    )
}

export const DefaultLayout = () => {
    const { ok, data } = useLoaderData<typeof loader>() as IHomeLoader
    if (!ok) return null

    const { sections, mainFeaturedPost, featuredPosts, sidebar } = data
    const location = useLocation()
    return (
        <>
            <Header title='Remix Blog' sections={sections} />
            <main>
                <MainFeaturedPost post={mainFeaturedPost} />
                {location.pathname === '/' && <Grid container spacing={4}>
                    {featuredPosts.map((post) => (
                        <FeaturedPost key={post.title} post={post} />
                    ))}
                </Grid>}
                <Grid container spacing={5} sx={{ mt: 3 }}>
                    <Sidebar
                        title={sidebar.title}
                        description={sidebar.description}
                        archives={sidebar.archives}
                    />
                    <Outlet />
                </Grid>
            </main>
            <Footer title="Footer"
                description="Something here to give the footer a purpose!" />
        </>
    )
}

export default DefaultLayout 