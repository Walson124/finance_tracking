"use client";

import { Box, Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function IncomeInput({
    users
}) {
    const [userOptions, setUserOptions] = useState([]);
    const [user, setUser] = useState("");
    const [year, setYear] = useState("");

    const [incomeData, setIncomeData] = useState({});
    const [incomeView, setIncomeView] = useState({})

    useEffect(() => {
        setUserOptions(users);
        axios.get(
            '/api/proxy/insert/get_income'
        ).then(response => {
            console.log('get_income response:', response.data);
            setIncomeData(response.data);
        }).catch(error => {
            console.error("Error fetching income:", error);
        });
    }, []);

    useEffect(() => {
        if (user && year) {
            if (incomeData && incomeData[user] && incomeData[user][year]) {
                let temp = incomeData[user][year];
                setIncomeView({
                    "January": temp["January"] || 0,
                    "February": temp["February"] || 0,
                    "March": temp["March"] || 0,
                    "April": temp["April"] || 0,
                    "May": temp["May"] || 0,
                    "June": temp["June"] || 0,
                    "July": temp["July"] || 0,
                    "August": temp["August"] || 0,
                    "September": temp["September"] || 0,
                    "October": temp["October"] || 0,
                    "November": temp["November"] || 0,
                    "December": temp["December"] || 0,
                })
            } else {
                setIncomeView({
                    "January": 0,
                    "February": 0,
                    "March": 0,
                    "April": 0,
                    "May": 0,
                    "June": 0,
                    "July": 0,
                    "August": 0,
                    "September": 0,
                    "October": 0,
                    "November": 0,
                    "December": 0,
                })
            }
        } else {
            setIncomeView({});
        }
    }, [user, year])

    function saveIncome() {
        let requestBody = {
            "user": user,
            "year": year,
            "income": incomeView,
        }
        axios.post(
            '/api/proxy/insert/save_income',
            requestBody
        ).then(response => {
            console.log('save_income response:', response.data);
        }).catch(error => {
            console.error("Error saving income:", error);
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
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Box>
                        <TextField
                            label="User"
                            value={user}
                            select={true}
                            size="small"
                            sx={{
                                minWidth: '100px',
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                mr: '10px',
                            }}
                            onChange={(e) => setUser(e.target.value)}
                        >
                            <MenuItem value={""} sx={{ fontSize: "0.8rem", minHeight: 28, py: 0.25 }} />
                            {userOptions.map((u, index) => (
                                <MenuItem key={index} value={u}>{u}</MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box>
                        <TextField
                            label="Year"
                            value={year}
                            select={true}
                            size="small"
                            sx={{
                                minWidth: '100px',
                                backgroundColor: 'white',
                                borderRadius: '10px',
                            }}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <MenuItem value={""} sx={{ fontSize: "0.8rem", minHeight: 28, py: 0.25 }} />
                            {Array.from({ length: 2030 - 2020 + 1 }, (_, i) => 2030 - i).map((year) => (
                                <MenuItem key={year} value={year} sx={{ fontSize: "0.8rem", minHeight: 28, py: 0.25 }}>
                                    {year}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        textAlign: 'right',
                        alignItems: 'end',
                        height: '100%',
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => saveIncome()}
                        sx={{
                            borderRadius: '10px',
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
            {user && year &&
                <Box
                    sx={{
                        mt: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: "wrap",
                        width: '100%',
                        borderRadius: '15px',
                        backgroundColor: 'white',
                        padding: '10px',
                        color: 'black',
                        gap: '10px',
                    }}
                >
                    {Object.keys(incomeView).map((m, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: 'fit-content',
                                borderRadius: '15px',
                                padding: '10px',
                                border: '0.5px solid rgba(13, 14, 17, 1)',
                            }}
                        >
                            <Box
                                sx={{
                                    mb: '5px',
                                }}
                            >
                                {m}
                            </Box>
                            <TextField
                                value={incomeView[m] ?? ""}
                                onChange={(e) =>
                                    setIncomeView(prev => ({
                                        ...prev,
                                        [m]: e.target.value,
                                    }))
                                }
                                sx={{
                                    p: 0,
                                    m: 0,
                                    width: '80px'
                                }}
                                size="small"
                            />
                        </Box>
                    ))}
                </Box>
            }
        </Box >
    )
}