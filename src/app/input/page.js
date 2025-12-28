"use client"

import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { BillInput } from "./bill-input";
import { useEffect, useState } from "react";
import IncomeInput from "./income-input";
import axios from "axios";

export default function Input() {
    const [inputType, setInputType] = useState("spend");
    const [userOptions, setUserOptions] = useState([]);
    
    // loading on db to get users
    useEffect(() => {
        axios.get(
            '/api/proxy/general/get_users'
        ).then(response => {
            console.log('users response:', response.data);
            setUserOptions(response.data);
        }).catch(error => {
            console.error("Error fetching users:", error);
        });
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
            }}
        >
            <ToggleButtonGroup
                color="primary"
                value={inputType}
                exclusive
                onChange={(e) => setInputType(e.target.value)}
                aria-label="Platform"
                sx={{
                    backgroundColor: 'white',
                    mb: '10px',
                }}
                size="small"
            >
                <ToggleButton value="spend">Spend</ToggleButton>
                <ToggleButton value="income">Income</ToggleButton>
            </ToggleButtonGroup>
            {inputType == "spend" &&
                <Box
                    sx={{
                        backgroundColor: inputType == "spend" ? "white" : "rgb(20, 20, 20)",
                        padding: '10px',
                        borderRadius: '15px',
                    }}
                >
                    <BillInput 
                        users={userOptions}
                    />
                </Box>
            }
            {inputType == "income" &&
                <Box
                    sx={{
                        width: '100%',
                        borderRadius: '15px',
                        backgroundColor: 'rgb(20, 20, 20)',
                        padding: '10px',
                        border: '0.5px solid rgb(66, 66, 66)',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <IncomeInput 
                        users={userOptions}
                    />
                </Box>
            }
        </Box>
    )
}