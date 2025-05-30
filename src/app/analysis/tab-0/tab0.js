"use client";

import { Box, Button, MenuItem, TextField } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import axios from "axios";
import { useEffect, useState } from "react";

import PieChartIcon from '@mui/icons-material/PieChart';

export function Tab0() {
    // pi chart states
    const [pieYearOptions, setPieYearOptions] = useState([]);
    const [pieMonthOptions, setPieMonthOptions] = useState([]);
    const [pieCategoryOptions, setPieCategoryOptions] = useState([]);
    const [pieUserOptions, setPieUserOptions] = useState([]);
    const [pieSelectedYear, setPieSelectedYear] = useState("");
    const [pieSelectedMonth, setPieSelectedMonth] = useState("");
    const [pieSelectedCategory, setPieSelectedCategory] = useState("");
    const [pieSelectedUser, setPieSelectedUser] = useState("");
    const [pieChartData, setPieChartData] = useState({});
    const [selectedPieChartData, setSelectedPieChartData] = useState([]);
    const [pieChartGroupOptions, setPieChartGroupOptions] = useState([]);
    const [pieChartSelectedGroup, setPieChartSelectedGroup] = useState("");


    useEffect(() => {
        axios.get(
            '/api/proxy/analysis/get_params',
        ).then((response) => {
            console.log(response.data);
            setPieYearOptions(response.data['year']);
            setPieMonthOptions(response.data['month']);
            setPieCategoryOptions(response.data['category']);
            setPieUserOptions(response.data['name']);
        }).catch((error) => {
            console.error("Error fetching pie chart options:", error);
        });
    }, []);

    function getPieChartData() {
        var requestBody = {
            "month": pieSelectedMonth,
            "year": pieSelectedYear,
            "category": pieSelectedCategory,
            "assigned_user": pieSelectedUser
        }
        axios.post(
            '/api/proxy/analysis/get_pi_chart',
            requestBody,
        ).then((response) => {
            console.log(response.data);
            if (Object.keys(response.data).length > 0) {
                console.log(Object.keys(response.data));
                setPieChartData(response.data);
                setPieChartGroupOptions(Object.keys(response.data));
                if (pieChartSelectedGroup === "") {
                    setPieChartSelectedGroup(Object.keys(response.data)[0]);
                    setSelectedPieChartData(response.data[Object.keys(response.data)[0]]);
                }
            }
        }).catch(error => {
            console.error("Error fetching pie chart data:", error);
        });
    }

    useEffect(() => {
        // get histogram data (last 6 months category sums)
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                height: '87vh',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: 'calc(50% - 0.5rem)',
                    border: '1px solid gray',
                    borderRadius: '0.5rem',
                    mb: '1rem'
                }}
            >
                histogram
            </Box>
            <Box
                sx={{
                    height: 'fit-content',
                    minHeight: '22rem',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}
            >
                <Box
                    sx={{
                        flex: '1 1 50rem', // grow:1, shrink:1, basis:300px
                        height: 'fit-content',
                        minHeight: '100%',
                        border: '1px solid gray',
                        borderRadius: '0.5rem',
                        minWidth: 0, // to prevent overflow issues
                    }}
                >
                    <Box
                        sx={{
                            margin: '1rem',
                        }}
                    >
                        <h2>Dynamic Pie Chart</h2>
                    </Box>
                    <Box
                        sx={{
                            width: 'calc(100% - 2rem)', // subtract left + right margin (0.5rem each)
                            // minHeight: 'calc(100% - 2rem)', // subtract top + bottom margin
                            margin: '1rem',
                            // border: '1px solid gray',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box
                            sx={{
                                width: '50%',
                                // border: '1px solid black',
                                flex: '1 1 20rem',
                                minWidth: 0,
                                height: 'fit-content',
                            }}
                        >
                            <TextField
                                label="Year"
                                size="small"
                                value={pieSelectedYear}
                                onChange={(event) => setPieSelectedYear(event.target.value)}
                                sx={{
                                    margin: '0.5rem',
                                    width: '9rem'
                                }}
                                select
                            >
                                <MenuItem value=""></MenuItem>
                                {pieYearOptions.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Month"
                                size="small"
                                value={pieSelectedMonth}
                                onChange={(event) => setPieSelectedMonth(event.target.value)}
                                sx={{
                                    margin: '0.5rem',
                                    width: '9rem'
                                }}
                                select
                            >
                                <MenuItem value=""></MenuItem>
                                {pieMonthOptions.map((month) => (
                                    <MenuItem key={month} value={month}>
                                        {month}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Category"
                                size="small"
                                value={pieSelectedCategory}
                                onChange={(event) => setPieSelectedCategory(event.target.value)}
                                sx={{
                                    margin: '0.5rem',
                                    width: '9rem'
                                }}
                                select
                            >
                                <MenuItem value=""></MenuItem>
                                {pieCategoryOptions.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Assigned user"
                                size="small"
                                value={pieSelectedUser}
                                onChange={(event) => setPieSelectedUser(event.target.value)}
                                sx={{
                                    margin: '0.5rem',
                                    width: '9rem'
                                }}
                                select
                            >
                                <MenuItem value=""></MenuItem>
                                {pieUserOptions.map((user) => (
                                    <MenuItem key={user} value={user}>
                                        {user}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Box
                                sx={{
                                    paddingLeft: '0.5rem',
                                    paddingTop: '0.5rem',
                                    paddingBottom: '0.5rem',
                                }}
                            >
                                <Button
                                    size="small"
                                    endIcon={<PieChartIcon />}
                                    variant="outlined"
                                    sx={{
                                        justifyContent: 'flex-start',
                                        borderColor: 'rgba(0, 0, 0, 0.23)', // match MUI TextField
                                        color: 'rgba(0, 0, 0, 0.87)',
                                        fontSize: '16px',
                                        textTransform: 'none',
                                    }}
                                    onClick={() => getPieChartData()}
                                >
                                    Create pie chart
                                </Button>
                            </Box>
                            {pieChartGroupOptions.length > 0 && (
                                <TextField
                                    label="Group by"
                                    size="small"
                                    value={pieChartSelectedGroup}
                                    onChange={(event) => {
                                        let temp = event.target.value;
                                        setPieChartSelectedGroup(temp);
                                        setSelectedPieChartData(pieChartData[temp] || {});
                                    }}
                                    sx={{
                                        margin: '0.5rem',
                                        width: '9rem'
                                    }}
                                    select
                                >
                                    <MenuItem value=""></MenuItem>
                                    {pieChartGroupOptions.map((group) => (
                                        <MenuItem key={group} value={group}>
                                            {group}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        </Box>
                        {selectedPieChartData.length > 0 && (
                            <Box
                                sx={{
                                    width: '50%',
                                    // border: '1px solid black',
                                    flex: '1 1 20rem',
                                    minHeight: '20.5rem',
                                    minWidth: 0,
                                }}
                            >
                                <PieChart
                                    series={[{
                                        data: selectedPieChartData,
                                    }]}
                                    width={350}
                                    height={350}
                                    hideLegend={true}
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        flex: '1 1 50rem', // same here
                        minHeight: '20.5rem',
                        border: '1px solid gray',
                        borderRadius: '0.5rem',
                        minWidth: 0,
                    }}
                >
                    chat
                </Box>
            </Box>
        </Box >
    );
}