"use client";

import { Box, Button, TextField } from "@mui/material";
import React from "react";

export function YtConverter() {
    // function checkForSubmit(event) {
    //     if (event.key === 'Enter') {
    //         console.log('Send urls to backend');
    //         downloadFiles();
    //     }
    // }

    function downloadFiles() {
        // make sure input make sense
        let urls = document.getElementById('yt-urls').value;
        let requestBody = urls.split(/\s+/).filter(Boolean);
        let valid = true;
        for (let i = 0; i < requestBody.length; i++) {
            if (!requestBody[i].startsWith('https://www.youtube.com/')) {
                console.log(`${requestBody[i]} is an invalid url`);
                valid = false;
            }
        }
        // make post request to backend through proxy with urls
        if (!valid) {
            return;
        }
        axios.post(
            `/api/proxy/tools/yt-mp3/convert`,
            requestBody
        ).then(response => {
            console.log('Response from api:', response.data);
        }).catch(error => {
            console.error("Error converting:", error);
        });
    }

    return (
        <Box
            sx={{
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <TextField
                    multiline
                    label="insert links here (separated by space or new line)"
                    // onKeyDown={checkForSubmit}
                    size="small"
                    sx={{
                        width: '100%'
                    }}
                    id='yt-urls'
                />
                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        ml: '0.5rem'
                    }}
                    onClick={() => downloadFiles()}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    )
}