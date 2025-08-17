"use client";

import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";

export function YtConverter() {
    // function checkForSubmit(event) {
    //     if (event.key === 'Enter') {
    //         console.log('Send urls to backend');
    //         downloadFiles();
    //     }
    // }

    function downloadFiles() {
        let urls = document.getElementById('yt-urls').value;
        let requestBody = urls.split(/\s+/).filter(Boolean);
        let valid = true;
        for (let i = 0; i < requestBody.length; i++) {
            if (!requestBody[i].startsWith('https://www.youtube.com/')) {
                console.log(`${requestBody[i]} is an invalid URL`);
                valid = false;
            }
        }

        // If not valid, stop the process
        if (!valid) return;

        // Prepare the request body
        requestBody = { urls: requestBody };

        // Make the POST request to get file names
        axios.post(
            '/api/proxy/tools/yt_mp3/convert', 
            requestBody
        ).then(response => {
            console.log('Response from backend:', response.data);
        })
        .catch(error => {
            console.error('Error during download:', error);
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