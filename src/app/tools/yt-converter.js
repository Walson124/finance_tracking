"use client";

import { Box, Button, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export function YtConverter() {
    const [status, setStatus] = useState(null);
    const [jobId, setJobId] = useState(null);

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
        axios.post('/api/proxy/tools/yt_mp3/convert', requestBody)
            .then(response => {
                console.log('Response from backend:', response.data);
                setJobId(response.data.job_id);
                checkJobStatus(response.data.job_id);  // Start checking status after starting download
            })
            .catch(error => {
                console.error('Error during download:', error);
            });
    }

    function checkJobStatus(jobId) {
        setStatus("In progress...");

        // Poll the backend every 3 seconds to check job status
        const interval = setInterval(() => {
            axios.get(`/api/proxy/tools/yt_mp3/status/${jobId}`)
                .then(response => {
                    const data = response.data;
                    console.log('Job status:', data);
                    setStatus(`Completed: ${data.completed}/${data.total}`);

                    if (data.status === "completed") {
                        clearInterval(interval);  // Stop polling when done
                        alert('Download finished!');
                    }
                })
                .catch(error => {
                    clearInterval(interval);  // Stop polling on error
                    console.error('Error checking job status:', error);
                    setStatus("Error occurred during download.");
                });
        }, 3000);  // Poll every 3 seconds
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box>
                <TextField
                    multiline
                    label="Insert links here (separated by space or new line)"
                    size="small"
                    sx={{ width: '100%' }}
                    id='yt-urls'
                />
            </Box>
            <Box
                sx={{
                    mt: '1rem',
                }}
            >
                <Button
                    variant="contained"
                    size="small"
                    onClick={downloadFiles}
                >
                    Submit
                </Button>
            </Box>
            {status && <Box sx={{ mt: 2 }}>{status}</Box>}
        </Box>
    );
}
