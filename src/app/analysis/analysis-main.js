"use client";

import { Box, Tab, Tabs } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Tab1 } from './tab-1/tab1';
import { Tab0 } from './tab-0/tab0';

export function AnalysisMain() {
    const [tabValue, setTabValue] = useState(0);

    return (
        <Box>
            <Tabs
                value={tabValue}
                onChange={(event, newValue) => setTabValue(newValue)} // Make sure newValue is passed
                sx={{
                    marginBottom: '1rem',
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#1976d2', // Custom color for the indicator
                    },
                    '& .MuiTab-root': {
                        fontSize: '1rem', // Custom font size for tabs
                    },
                }}
            >
                <Tab label="Basic Analysis" value={0} />
                <Tab label="AI Analysis" value={1} />
            </Tabs>
            {tabValue === 0 && (
                <Tab0 />
            )}
            {tabValue === 1 && (
                <Tab1 />
            )}
        </Box>
    );
}