import { Box, Card, Chip, Divider, Stack, Typography } from '@mui/material';

export default function IntroDivider() {
    return (
        <Card variant="outlined" sx={{ maxWidth: 360 }}>
            <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h5" component="div">
                        Toothbrush
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        $4.50
                    </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                    Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
                    just down the hall.
                </Typography>
            </Box>
            <Divider light />
            <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="body2">
                    Select type
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Chip color="primary" label="Soft" size="small" />
                    <Chip label="Medium" size="small" />
                    <Chip label="Hard" size="small" />
                </Stack>
            </Box>
        </Card>
    );
}