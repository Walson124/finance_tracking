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

    const [incomeData, setIncomeData] = useState([]);

    useEffect(() => {
        setUserOptions(users);
        axios.get(
            '/api/proxy/insert/get_income'
        ).then(response => {
            console.log('get_income response:', response.data);
        }).catch(error => {
            console.error("Error fetching income:", error);
        });
    }, []);

    return (
        <Box>
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
                        mb: '10px',
                        mr: '10px',
                    }}
                >
                    <MenuItem value={""} sx={{ fontSize: "0.8rem", minHeight: 28, py: 0.25 }} />
                    {userOptions.map((u, index) => (
                        <MenuItem key={index} value={u}>{u}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Year"
                    value={year}
                    select={true}
                    size="small"
                    sx={{
                        minWidth: '100px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        mb: '10px',
                    }}
                >
                    <MenuItem value={""} sx={{ fontSize: "0.8rem", minHeight: 28, py: 0.25 }} />
                    {Array.from({ length: 2030 - 2020 + 1 }, (_, i) => 2030 - i).map((year) => (
                        <MenuItem key={year} value={year} sx={{ fontSize: "0.8rem", minHeight: 28, py: 0.25 }}>
                            {year}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <Box>
                lol all the inputs
            </Box>
        </Box>
    )
}