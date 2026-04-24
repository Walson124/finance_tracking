"use client";

import { Box, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export function Tab1() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
                gap: 2,
                color: "rgb(160, 160, 160)",
            }}
        >
            <AutoAwesomeIcon sx={{ fontSize: 48, opacity: 0.4 }} />
            <Typography variant="h6" sx={{ opacity: 0.6 }}>
                AI Analysis — Coming Soon
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.4, textAlign: "center", maxWidth: 380 }}>
                Ask questions about your spending, get trend summaries, and receive personalized insights.
            </Typography>
        </Box>
    );
}
