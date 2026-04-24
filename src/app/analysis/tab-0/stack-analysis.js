import { Label } from "@mui/icons-material";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { convertMonthIndex } from "@/app/utils";

export const StackAnalysis = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [queriedData, setQueriedData] = useState({});
    const [orderedYM, setOrderedYM] = useState([]);

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
            setQueriedData(response.data.stacked);
            let temp_ym = [];
            for (let i = 0; i < response.data.distinct_ym.length; i++) {
                let temp = response.data.distinct_ym[i];
                temp_ym.push(`${convertMonthIndex(temp[1])} ${String(temp[0])}`);
            }
            console.log('orderedYM: ', temp_ym);
            setOrderedYM(temp_ym);
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
                        color: 'black',
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
                    xAxis={[
                        {
                            data: orderedYM,
                            label: 'Month Year', // label for the X axis
                        },
                    ]}
                    yAxis={[
                        {
                            label: 'Amount ($)', // label for the Y axis
                        },
                    ]}
                    margin={{ left: 30 }}
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