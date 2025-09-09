import { Label } from "@mui/icons-material";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const StackAnalysis = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [queriedData, setQueriedData] = useState({
        'category1': [1, 2, 3, 4, 5],
        'category2': [6, 7, 8, 9, 10],
        'category3': [15, 14, 13, 12, 11]
    });

    const handleCategoryChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
    }

    useEffect(() => {
        axios.get(
            '/api/proxy/analysis/get_stack_chart',
        ).then((response) => {
            console.log(response.data);
            if (response.data.length == 0) {
                return;
            }
            setQueriedData(response.data);
        }).catch((error) => {
            console.error("Error fetching stack chart options:", error);
        });
    }, []);

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Typography
                    sx={{
                        mr: '1rem',
                    }}
                >
                    Monthly Spending Chart:
                </Typography>
                <TextField
                    size="small"
                    label="Categories to Include"
                    value={selectedCategories}
                    onChange={handleCategoryChange}
                    sx={{
                        width: `${Math.max(selectedCategories.toString().length * 0.7, 13)}rem`,
                    }}
                    slotProps={{
                        select: {
                            multiple: true
                        }
                    }}
                    select
                >
                    {Object.keys(queriedData).map(category => {
                        const isSelected = selectedCategories.includes(category);
                        return (
                            <MenuItem
                                value={category}
                                sx={{
                                    '&.Mui-selected': {
                                        backgroundColor: 'lightblue'
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: 'lightblue'
                                    }
                                }}
                            >
                                {category}
                            </MenuItem>
                        )
                    })}
                </TextField>
            </Box>
            {selectedCategories.length > 0 && selectedCategories.every(category => queriedData[category]) && (
                <BarChart
                    height={300}
                    series={selectedCategories.map(category => ({
                        data: queriedData[category],
                        label: category,
                        stack: 'total'
                    }))}
                />
            )}
        </Box>
    )
}
export default StackAnalysis;