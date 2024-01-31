import { Divider, Grid, Typography } from "@mui/material";
import Markdown from "./Markdown";

interface MainProps {
    posts: ReadonlyArray<any>;
    title: string;
}

export default function MainPost(props: MainProps) {
    const { posts, title } = props;

    return (
        <Grid
            item
            xs={12}
            md={8}
            sx={{
                '& .markdown': {
                    py: 3,
                },
            }}
        >
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Divider />
            {/* <Markdown className="markdown">{Post2}</Markdown> */}
            {posts.map((post) => (
                <Markdown className="markdown" key={post.substring(0, 40)}>
                    {post}
                </Markdown>
            ))}
        </Grid>
    );
}