"use client";

import { Box, Button, IconButton, MenuItem, TextField } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import axios from "axios";
import { useEffect, useState } from "react";
import StackAnalysis from "./stack-analysis";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PieChartIcon from '@mui/icons-material/PieChart';

export function Tab0() {
    // pi chart states
    const [pieYearOptions, setPieYearOptions] = useState([]);
    const [pieMonthOptions, setPieMonthOptions] = useState([]);
    const [pieCategoryOptions, setPieCategoryOptions] = useState([]);
    const [pieUserOptions, setPieUserOptions] = useState([]);

    const [pieChartLabels, setPieChartLabels] = useState([]);

    const [pieSelectedYears, setPieSelectedYears] = useState([]);
    const [pieSelectedMonths, setPieSelectedMonths] = useState([]);
    const [pieSelectedCategorys, setPieSelectedCategorys] = useState([]);
    const [pieSelectedUsers, setPieSelectedUsers] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [selectedPieChartData, setSelectedPieChartData] = useState([]);
    const [pieChartGroupOptions, setPieChartGroupOptions] = useState([]);
    const [pieChartSelectedGroups, setPieChartSelectedGroups] = useState([]);

    function addPieChart() {
        setPieChartLabels((prevState) => [...prevState, `Dynamic Pie Chart ${prevState.length + 1}`]);
        setPieSelectedYears((prevState) => [...prevState, ""]);
        setPieSelectedMonths((prevState) => [...prevState, ""]);
        setPieSelectedCategorys((prevState) => [...prevState, ""]);
        setPieSelectedUsers((prevState) => [...prevState, ""]);
        setPieChartData((prevState) => [...prevState, {}]);
        setSelectedPieChartData((prevState) => [...prevState, []]);
        setPieChartGroupOptions((prevState) => [...prevState, []]);
        setPieChartSelectedGroups((prevState) => [...prevState, ""]);
    }

    function deletePieChart(index) {
        function helper(prev_state) {
            let temp = [...prev_state];
            temp.splice(index, 1);
            return temp
        }
        setPieChartLabels((prevState) => {
            return helper(prevState);
        });
        setPieSelectedYears((prevState) => {
            return helper(prevState);
        });
        setPieSelectedMonths((prevState) => {
            return helper(prevState);
        });
        setPieSelectedCategorys((prevState) => {
            return helper(prevState);
        });
        setPieSelectedUsers((prevState) => {
            return helper(prevState);
        });
        setPieChartData((prevState) => {
            return helper(prevState);
        });
        setSelectedPieChartData((prevState) => {
            return helper(prevState);
        });
        setPieChartGroupOptions((prevState) => {
            return helper(prevState);
        });
        setPieChartSelectedGroups((prevState) => {
            return helper(prevState);
        });
    }

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

    function getPieChartData(chart_num) {
        var requestBody = {
            "month": pieSelectedMonths[chart_num],
            "year": pieSelectedYears[chart_num],
            "category": pieSelectedCategorys[chart_num],
            "assigned_user": pieSelectedUsers[chart_num]
        }
        axios.post(
            '/api/proxy/analysis/get_pi_chart',
            requestBody,
        ).then((response) => {
            console.log(response.data);
            if (Object.keys(response.data).length > 0) {
                setPieChartData((prevState) => {
                    let temp = [...prevState];
                    temp[chart_num] = response.data;
                    return temp;
                })
                setPieChartGroupOptions((prevState) => {
                    let temp = [...prevState];
                    temp[chart_num] = Object.keys(response.data);
                    return temp;
                })
                if (Object.keys(response.data).includes(pieChartSelectedGroups[chart_num])) {
                    setSelectedPieChartData((prevState) => {
                        let temp = [...prevState];
                        temp[chart_num] = response.data[pieChartSelectedGroups[chart_num]];
                        return temp;
                    })
                } else {
                    setPieChartSelectedGroups((prevState) => {
                        let temp = [...prevState];
                        temp[chart_num] = Object.keys(response.data)[0];
                        return temp;
                    })
                    setSelectedPieChartData((prevState) => {
                        let temp = [...prevState];
                        temp[chart_num] = response.data[Object.keys(response.data)[0]];
                        return temp;
                    })
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
            }}
        >
            <StackAnalysis/>
            <Box
                sx={{
                    width: '100%',
                    height: 'auto', // 'calc(50% - 0.5rem)',
                    border: '1px solid gray',
                    borderRadius: '0.5rem',
                    mb: '1rem',
                    mt: '1rem'
                }}
            >
                <Button
                    onClick={() => addPieChart()}
                    endIcon={<AddIcon />}
                >
                    New Pie Chart
                </Button>
                {pieChartData.length > 0 &&
                    <Box
                        sx={{
                            height: 'fit-content',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            // border: '1px solid black',
                            width: '100%',
                        }}
                    >
                        {selectedPieChartData.map((data, index) => (
                            <Box
                                key={index}
                                sx={{
                                    flex: '1 1 50rem',
                                    minWidth: 0,
                                    height: 'fit-content',
                                    border: '1px solid gray',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    margin: '1rem 1rem 1rem 1rem',
                                    paddingBottom: '0.5rem',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '50%',
                                        minWidth: '20rem', // filters at least 2 in a row
                                    }}
                                >
                                    <Box
                                        sx={{
                                            margin: '1rem',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: '1rem'
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => { deletePieChart(index) }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <h2
                                            contentEditable={true}
                                            suppressContentEditableWarning={true}
                                        >
                                            {pieChartLabels[index] || `Dynamic Pie Chart ${index + 1}`}
                                        </h2>
                                    </Box>
                                    {/* Box to hold textfields (choices) --> */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <TextField
                                            label="Year"
                                            size="small"
                                            value={pieSelectedYears[index]}
                                            onChange={(event) =>
                                                setPieSelectedYears((prevState) => {
                                                    let temp = [...prevState];
                                                    temp[index] = event.target.value;
                                                    return temp;
                                                })
                                            }
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
                                            value={pieSelectedMonths[index]}
                                            onChange={(event) =>
                                                setPieSelectedMonths((prevState) => {
                                                    let temp = [...prevState];
                                                    temp[index] = event.target.value;
                                                    return temp;
                                                })
                                            }
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
                                            value={pieSelectedCategorys[index]}
                                            onChange={(event) =>
                                                setPieSelectedCategorys((prevState) => {
                                                    let temp = [...prevState];
                                                    temp[index] = event.target.value;
                                                    return temp;
                                                })
                                            }
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
                                            value={pieSelectedUsers[index]}
                                            onChange={(event) =>
                                                setPieSelectedUsers((prevState) => {
                                                    let temp = [...prevState];
                                                    temp[index] = event.target.value;
                                                    return temp;
                                                })
                                            }
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
                                                marginLeft: '0.5rem'
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
                                                    paddingTop: '0.3rem',
                                                    paddingBottom: '0.3rem'
                                                }}
                                                onClick={() => getPieChartData(index)}
                                            >
                                                Create pie chart
                                            </Button>
                                        </Box>
                                        {pieChartGroupOptions[index].length > 0 && (
                                            <TextField
                                                label="Group by"
                                                size="small"
                                                value={pieChartSelectedGroups[index]}
                                                onChange={(event) => {
                                                    let new_value = event.target.value;
                                                    setPieChartSelectedGroups((prevState) => {
                                                        let temp = [...prevState];
                                                        temp[index] = new_value;
                                                        return temp;
                                                    })
                                                    setSelectedPieChartData((prevState) => {
                                                        let temp = [...prevState];
                                                        temp[index] = pieChartData[index][new_value] || {};
                                                        return temp;
                                                    })
                                                }}
                                                sx={{
                                                    margin: '0.5rem',
                                                    width: '9rem'
                                                }}
                                                select
                                            >
                                                <MenuItem value=""></MenuItem>
                                                {pieChartGroupOptions[index].map((group) => (
                                                    <MenuItem key={group} value={group}>
                                                        {group}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )}
                                    </Box>
                                </Box>
                                {/* Box for plot --> */}
                                {data.length > 0 && (
                                    <Box
                                        sx={{
                                            width: '50%',
                                        }}
                                    >
                                        <PieChart
                                            series={[{
                                                data: data,
                                                highlightScope: { fade: 'global', highlight: 'item' },
                                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                            }]}
                                            width={350}
                                            height={350}
                                            hideLegend={true}
                                        />
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Box>
                }
            </Box>
        </Box >
    );
}