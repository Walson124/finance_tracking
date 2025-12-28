"use client";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import SaveIcon from '@mui/icons-material/Save';

import axios from 'axios';
import React, { useRef } from 'react';
import { Box, Button, Dialog, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { BillObject } from "../objects/bill-object";
import { generateRandomPastelColor } from "../utils";

export function BillInput() {

    const [bills, setBills] = useState([]);
    const [inputBillUser, setInputBillUser] = useState("default");
    const [inputBillName, setInputBillName] = useState("");
    const [inputBillAmount, setInputBillAmount] = useState("");
    const labelRef = useRef(null);

    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const [categories, setCategories] = useState([]);
    const [userOptions, setUserOptions] = useState([]);

    const [groups, setGroups] = useState({});

    const [openCategoryManagement, setOpenCategoryManagement] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    const [colors, setColors] = useState({});

    useEffect(() => {
        // Generate random pastel colors for each category on the client side
        const generatedColors = {};
        Object.keys(categories).forEach((category) => {
            generatedColors[category] = generateRandomPastelColor();
        });
        setColors(generatedColors);
    }, [categories]);

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

    // loading from db based on month/year
    useEffect(() => {
        if (!month || !year) {
            return;
        }
        let requestBody = {
            "month": month,
            "year": year
        }
        axios.post(
            `/api/proxy/insert/get_data`,
            requestBody
        ).then(response => {
            console.log('Response:', response.data);
            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                let tempBills = [];
                let tempCategories = new Set();
                for (let i = 0; i < response.data.length; i++) {
                    let billData = response.data[i];
                    let tempRow = new BillObject(billData.name, billData.amount, billData.assigned_user, billData.category);
                    tempCategories.add(billData.category);
                    tempBills.push(tempRow);
                }
                setBills(tempBills);
                setCategories(Array.from(tempCategories));
            } else {
                setBills([]);
                setCategories([
                    'Groceries',
                    'Dining',
                    'Gas',
                    'Transportation',
                    'Utilities/Rent',
                    'Household Goods/Home Improvement',
                    'Personal Items'
                ]);
            }
        }).catch(error => {
            console.error("Error fetching data:", error);
            setBills([]);
            setCategories([
                'Groceries',
                'Dining',
                'Gas',
                'Transportation',
                'Utilities/Rent',
                'Household Goods/Home Improvement',
                'Personal Items'
            ]);
        });
    }, [month, year]);

    function addBill() {
        if (inputBillName && inputBillAmount && parseFloat(inputBillAmount)) {
            let temp = new BillObject(inputBillName, inputBillAmount, inputBillUser);
            setBills(prevState => { return [temp, ...prevState] });
            setInputBillName("");
            setInputBillAmount("");
            labelRef.current?.focus();
        }
    }

    function deleteBill(index) {
        setBills(prevState => {
            let temp = [...prevState];
            temp.splice(index, 1);
            return temp;
        })
    }

    function handleCategoryChange(index, selectedCategory) {
        setBills((prevState) =>
            prevState.map((bill, i) =>
                i === index ? { ...bill, category: selectedCategory } : bill
            )
        );
    }

    function generateCategoryGroups() {
        var tempGroups = {};
        for (let i = 0; i < bills.length; i++) {
            let temp = bills[i].category;
            if (!(categories.includes(temp))) {
                temp = "";
            }
            if (temp in tempGroups) {
                tempGroups[temp].push(bills[i]);
            } else {
                tempGroups[temp] = [bills[i]];
            }
        }
        setGroups(tempGroups);
    }

    function deleteCategory(index) {
        if (confirm(`Confirm deletion of category [${categories[index]}]`)) {
            setCategories(prevState => {
                let temp = [...prevState];
                temp.splice(index, 1);
                return temp;
            });
        }
    }

    function saveData() {
        // check if bills is empty, prevent empty replace
        if (bills.length == 0) {
            if (!confirm("Are you sure you want to submit empty data?")) {
                return;
            }
        }
        let extractedData = bills.map(bill => ({
            name: bill.name,
            amount: bill.amount,
            category: bill.category || "", // Ensure category is not undefined
            month: month,
            year: year,
            user: bill.assigned_user || "default" // Default user if not set
        }));
        let requestBody = {
            rows: extractedData,
            month: month,
            year: year
        }
        axios.post(
            `/api/proxy/insert/add_rows`,
            requestBody
        ).then(response => {
            console.log("Data saved successfully:", response.data);
            if (response.data == "success") {
                alert("Data saved successfully!");
            } else {
                alert("Error saving data, please try again.");
            }
        }).catch(error => {
            console.error("Error saving data:", error);
        });
    }

    return (
        <Box>
            {/* INPUTS HERE --> */}
            <Box>
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            mb: '1rem'
                        }}
                        onClick={() => setOpenCategoryManagement(true)}
                    >
                        Manage Categories
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignContent: 'center',
                        mb: '1rem'
                    }}
                >
                    <TextField
                        label="Month"
                        size="small"
                        value={month}
                        onChange={(event) => setMonth(event.target.value)}
                        sx={{
                            minWidth: '10rem',
                            mr: '1rem'
                        }}
                        select
                    >
                        <MenuItem value="January">January</MenuItem>
                        <MenuItem value="February">February</MenuItem>
                        <MenuItem value="March">March</MenuItem>
                        <MenuItem value="April">April</MenuItem>
                        <MenuItem value="May">May</MenuItem>
                        <MenuItem value="June">June</MenuItem>
                        <MenuItem value="July">July</MenuItem>
                        <MenuItem value="August">August</MenuItem>
                        <MenuItem value="September">September</MenuItem>
                        <MenuItem value="October">October</MenuItem>
                        <MenuItem value="November">November</MenuItem>
                        <MenuItem value="December">December</MenuItem>
                    </TextField>
                    <TextField
                        label="Year"
                        size="small"
                        value={year}
                        onChange={(event) => setYear(event.target.value)}
                        sx={{
                            minWidth: '10rem',
                            mr: '1rem'
                        }}
                        select
                    >
                        {Array.from({ length: 2030 - 2024 + 1 }, (_, index) => 2024 + index).map((yearValue) => (
                            <MenuItem key={yearValue} value={yearValue}>
                                {yearValue}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignContent: 'center',
                        mb: '1rem'
                    }}
                >
                    <TextField
                        size="small"
                        label="Assign To User"
                        value={inputBillUser}
                        onChange={(event) => setInputBillUser(event.target.value)}
                        sx={{
                            minWidth: '10rem',
                            mr: '1rem'
                        }}
                        select
                    >
                        <MenuItem value="default"></MenuItem>
                        {userOptions.map((user, index) => (
                            <MenuItem key={index} value={user}>
                                {user}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignContent: 'center',
                        mb: '1rem'
                    }}
                >
                    <TextField
                        inputRef={labelRef}
                        size="small"
                        label="Enter Bill Label"
                        value={inputBillName}
                        onChange={(event) => setInputBillName(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                addBill();
                            }
                        }}
                        sx={{
                            width: '13rem',
                            mr: '1rem'
                        }}
                    />
                    <TextField
                        size="small"
                        label="Enter Bill Amount ($)"
                        value={inputBillAmount}
                        onChange={(event) => setInputBillAmount(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                addBill();
                            }
                        }}
                        sx={{
                            width: '12rem',
                            mr: '1rem'
                        }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => addBill()}
                        endIcon={<AddIcon />}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
            {/* ALL THE BILLS HERE --> */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    maxWidth: '100vw',
                    mb: '1rem'
                }}
            >
                {bills.map((bill, index) => (
                    <Box
                        key={index}
                        sx={{
                            textAlign: 'center',
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            backgroundColor: colors[categories.indexOf(bill.category)] || "lightgray",
                        }}
                    >
                        <Box>
                            {bill.assigned_user === "default" ? "Unassigned" : bill.assigned_user}
                        </Box>
                        <hr></hr>
                        <Box
                            sx={{
                                display: 'flex', flexDirection: 'row'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    alignItems: 'center', // Align both inputs vertically
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center', // Align the input vertically
                                    }}
                                >
                                    <input
                                        type="text"
                                        value={bill.name}
                                        onChange={(event) => {
                                            setBills((prevState) =>
                                                prevState.map((b, i) =>
                                                    i === index ? { ...b, name: event.target.value } : b
                                                )
                                            );
                                        }}
                                        style={{
                                            border: 'none',
                                            background: 'transparent',
                                            textAlign: 'left',
                                            fontSize: '1rem',
                                            width: 'auto'
                                            // width: `${bill.name.length + 1}ch`, // Dynamically adjust width based on content
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center', // Align the $ sign and input vertically
                                    }}
                                >
                                    <span>$</span>
                                    <input
                                        type="text"
                                        value={bill.amount}
                                        onChange={(event) => {
                                            setBills((prevState) => {
                                                let temp = [...prevState];
                                                temp[index].amount = event.target.value;
                                                return temp;
                                            });
                                        }}
                                        style={{
                                            border: 'none',
                                            background: 'transparent',
                                            textAlign: 'left',
                                            fontSize: '1rem',
                                            width: 'auto'
                                            // width: `${String(bill.amount).length + 1}ch`, // Dynamically adjust width based on content
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    textAlign: 'right'
                                }}
                                onClick={() => deleteBill(index)}
                            >
                                <DeleteIcon />
                            </Box>
                        </Box>
                        <hr></hr>
                        <Box>
                            <select
                                value={bill.category}
                                onChange={(event) => {
                                    handleCategoryChange(index, event.target.value);
                                }}
                            >
                                <option value="">
                                    Select a category
                                </option>
                                {categories.map((category, category_index) => (
                                    <option key={category_index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </Box>
                    </Box>
                ))}
            </Box>
            {/* CATEGORIES HERE --> */}
            {bills.length > 0 &&
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            mb: '1rem'
                        }}
                    >
                        <Button
                            variant="contained"
                            endIcon={<GroupWorkIcon />}
                            onClick={() => generateCategoryGroups()}
                            sx={{
                                mr: '1rem'
                            }}
                        >
                            Generate Groups
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<SaveIcon />}
                            onClick={() => saveData()}
                        >
                            Save Data
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            gap: '1rem'
                        }}
                    >
                        {Object.keys(groups).map((group, group_index) => (
                            <Box
                                key={group_index}
                                sx={{
                                    width: '100%',
                                    height: '27.5vh',
                                    border: '1px solid black',
                                    borderRadius: '1rem',
                                    mb: '1rem',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: colors[categories.indexOf(group)] || 'transparent', // Use generated color or fallback
                                        padding: '1rem',
                                        borderTopLeftRadius: '1rem',
                                        borderTopRightRadius: '1rem',
                                        borderBottom: '1px solid black'
                                    }}
                                >
                                    {group || 'Unassigned'}
                                    <hr style={{ border: '1px solid black', margin: '0.5rem 0' }} /> {/* Adds a horizontal line */}
                                    Total Spent: {groups[group].reduce((total, bill) => total + parseFloat(bill.amount || 0), 0).toFixed(2)}
                                </Box>
                                <Box
                                    sx={{
                                        backgroundColor: 'white',
                                        height: '100%',
                                        borderBottomLeftRadius: '1rem',
                                        borderBottomRightRadius: '1rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        overflow: 'scroll',
                                        scrollbarWidth: 'none', // Hide scrollbar for Firefox
                                        '&::-webkit-scrollbar': {
                                            display: 'none', // Hide scrollbar for Chrome, Edge, and Safari
                                        },
                                    }}
                                >
                                    {groups[group].map((bill, bill_index) => (
                                        <Box
                                            key={bill_index}
                                            sx={{
                                                width: 'fit-content',
                                                backgroundColor: colors[categories.indexOf(group)] || 'transparent',
                                                margin: '0.25rem',
                                                padding: '0.3rem 0.7rem 0.3rem 0.7rem',
                                                borderRadius: '1rem'
                                            }}
                                        >
                                            {bill.name}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            }
            {bills.length == 0 &&
                <Button
                    variant="contained"
                    endIcon={<SaveIcon />}
                    onClick={() => saveData()}
                >
                    Save Data
                </Button>
            }
            <Dialog
                open={openCategoryManagement}
                onClose={() => {
                    setNewCategory("");
                    setOpenCategoryManagement(false)
                }
                }
            >
                <Box
                    sx={{ padding: '1rem' }}
                >
                    <Box>

                    </Box>
                    {categories.map((category, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                onClick={() => deleteCategory(index)}
                            >
                                <DeleteIcon />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {category}
                            </Box>
                        </Box>
                    ))}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            onClick={() => {
                                setCategories([...categories, newCategory]);
                                setNewCategory("");
                            }}
                        >
                            <AddIcon />
                        </Box>
                        <input
                            type="text"
                            defaultValue={newCategory}
                            onChange={(event) => setNewCategory(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    setCategories([...categories, event.target.value]);
                                    setNewCategory("");
                                }
                            }}
                        />
                    </Box>
                </Box>
            </Dialog>
        </Box>
    )
}