"use client";

import { Box, TextField } from "@mui/material";

export function Tab1() {
    return (
        <Box>
            <TextField
                size="small"
                label="Ask me anything about your finances!"
                sx={{
                    width: "100%",
                }}
            />
        </Box>
    );
}