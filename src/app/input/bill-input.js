"use client";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import SaveIcon from '@mui/icons-material/Save';

import axios from 'axios';
import React, { useRef } from 'react';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputBase,
    MenuItem,
    Select,
    Snackbar,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BillObject } from "../objects/bill-object";
import { generateRandomPastelColor } from "../utils";

export function BillInput({ users }) {
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
    const [colors, setColors] = useState({});

    const [openCategoryManagement, setOpenCategoryManagement] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    // Confirm dialog state
    const [confirmDialog, setConfirmDialog] = useState({ open: false, message: '', onConfirm: null });

    // Snackbar state
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    function showConfirm(message, onConfirm) {
        setConfirmDialog({ open: true, message, onConfirm });
    }

    function showSnackbar(message, severity = 'success') {
        setSnackbar({ open: true, message, severity });
    }

    useEffect(() => {
        const generatedColors = {};
        categories.forEach((category) => {
            generatedColors[category] = generateRandomPastelColor();
        });
        setColors(generatedColors);
    }, [categories]);

    useEffect(() => {
        setUserOptions(users);
    }, [users]);

    useEffect(() => {
        if (!month || !year) return;
        axios.post('/api/proxy/insert/get_data', { month, year })
            .then(response => {
                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    const tempCategories = new Set();
                    const tempBills = response.data.map(billData => {
                        tempCategories.add(billData.category);
                        return new BillObject(billData.name, billData.amount, billData.assigned_user, billData.category);
                    });
                    setBills(tempBills);
                    setCategories(Array.from(tempCategories));
                } else {
                    setBills([]);
                    setCategories(['Groceries', 'Dining', 'Gas', 'Transportation', 'Utilities/Rent', 'Household Goods/Home Improvement', 'Personal Items', 'Vacations']);
                }
            })
            .catch(() => {
                setBills([]);
                setCategories(['Groceries', 'Dining', 'Gas', 'Transportation', 'Utilities/Rent', 'Household Goods/Home Improvement', 'Personal Items', 'Vacations']);
            });
    }, [month, year]);

    function addBill() {
        if (inputBillName && inputBillAmount && parseFloat(inputBillAmount)) {
            setBills(prev => [new BillObject(inputBillName, inputBillAmount, inputBillUser), ...prev]);
            setInputBillName("");
            setInputBillAmount("");
            labelRef.current?.focus();
        }
    }

    function deleteBill(index) {
        setBills(prev => prev.filter((_, i) => i !== index));
    }

    function handleCategoryChange(index, selectedCategory) {
        setBills(prev => prev.map((bill, i) => i === index ? { ...bill, category: selectedCategory } : bill));
    }

    function generateCategoryGroups() {
        const tempGroups = {};
        bills.forEach(bill => {
            const key = categories.includes(bill.category) ? bill.category : "";
            if (key in tempGroups) tempGroups[key].push(bill);
            else tempGroups[key] = [bill];
        });
        setGroups(tempGroups);
    }

    function deleteCategory(index) {
        showConfirm(`Delete category [${categories[index]}]?`, () => {
            setCategories(prev => prev.filter((_, i) => i !== index));
        });
    }

    function saveData() {
        const doSave = () => {
            const extractedData = bills.map(bill => ({
                name: bill.name,
                amount: bill.amount,
                category: bill.category || "",
                month,
                year,
                user: bill.assigned_user || "default",
            }));
            axios.post('/api/proxy/insert/add_rows', { rows: extractedData, month, year })
                .then(response => {
                    if (response.data === "success") {
                        showSnackbar("Data saved successfully!", "success");
                    } else {
                        showSnackbar("Error saving data, please try again.", "error");
                    }
                })
                .catch(() => showSnackbar("Error saving data, please try again.", "error"));
        };

        if (bills.length === 0) {
            showConfirm("Are you sure you want to submit empty data?", doSave);
        } else {
            doSave();
        }
    }

    return (
        <Box>
            {/* Confirm Dialog */}
            <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}>
                <DialogTitle>Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>{confirmDialog.message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>Cancel</Button>
                    <Button
                        onClick={() => {
                            confirmDialog.onConfirm?.();
                            setConfirmDialog({ ...confirmDialog, open: false });
                        }}
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* INPUTS */}
            <Box>
                <Box>
                    <Button variant="contained" sx={{ mb: '1rem' }} onClick={() => setOpenCategoryManagement(true)}>
                        Manage Categories
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignContent: 'center', mb: '1rem' }}>
                    <TextField label="Month" size="small" value={month} onChange={e => setMonth(e.target.value)} sx={{ minWidth: '10rem', mr: '1rem' }} select>
                        {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
                            <MenuItem key={m} value={m}>{m}</MenuItem>
                        ))}
                    </TextField>
                    <TextField label="Year" size="small" value={year} onChange={e => setYear(e.target.value)} sx={{ minWidth: '10rem', mr: '1rem' }} select>
                        {Array.from({ length: 2030 - 2024 + 1 }, (_, i) => 2024 + i).map(y => (
                            <MenuItem key={y} value={y}>{y}</MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box sx={{ display: 'flex', alignContent: 'center', mb: '1rem' }}>
                    <TextField label="Assign To User" size="small" value={inputBillUser} onChange={e => setInputBillUser(e.target.value)} sx={{ minWidth: '10rem', mr: '1rem' }} select>
                        <MenuItem value="default"></MenuItem>
                        {userOptions.map((user, i) => <MenuItem key={i} value={user}>{user}</MenuItem>)}
                    </TextField>
                </Box>
                <Box sx={{ display: 'flex', alignContent: 'center', mb: '1rem' }}>
                    <TextField
                        inputRef={labelRef}
                        size="small"
                        label="Enter Bill Label"
                        value={inputBillName}
                        onChange={e => setInputBillName(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") addBill(); }}
                        sx={{ width: '13rem', mr: '1rem' }}
                    />
                    <TextField
                        size="small"
                        label="Enter Bill Amount ($)"
                        value={inputBillAmount}
                        onChange={e => setInputBillAmount(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") addBill(); }}
                        sx={{ width: '12rem', mr: '1rem' }}
                    />
                    <Button variant="outlined" onClick={addBill} endIcon={<AddIcon />}>Add</Button>
                </Box>
            </Box>

            {/* BILL CARDS */}
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1rem', maxWidth: '100vw', mb: '1rem' }}>
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
                        <Box>{bill.assigned_user === "default" ? "Unassigned" : bill.assigned_user}</Box>
                        <hr />
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                                <InputBase
                                    value={bill.name}
                                    onChange={e => setBills(prev => prev.map((b, i) => i === index ? { ...b, name: e.target.value } : b))}
                                    sx={{ fontSize: '1rem', minWidth: '80px' }}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <span>$</span>
                                    <InputBase
                                        value={bill.amount}
                                        onChange={e => setBills(prev => prev.map((b, i) => i === index ? { ...b, amount: e.target.value } : b))}
                                        sx={{ fontSize: '1rem', width: '60px' }}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => deleteBill(index)}>
                                <DeleteIcon />
                            </Box>
                        </Box>
                        <hr />
                        <Select
                            value={bill.category || ""}
                            onChange={e => handleCategoryChange(index, e.target.value)}
                            size="small"
                            displayEmpty
                            sx={{ fontSize: '0.85rem', minWidth: '120px', background: 'transparent' }}
                        >
                            <MenuItem value=""><em>Select a category</em></MenuItem>
                            {categories.map((cat, ci) => <MenuItem key={ci} value={cat}>{cat}</MenuItem>)}
                        </Select>
                    </Box>
                ))}
            </Box>

            {/* GROUPS & SAVE */}
            {bills.length > 0 && (
                <Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mb: '1rem' }}>
                        <Button variant="contained" endIcon={<GroupWorkIcon />} onClick={generateCategoryGroups} sx={{ mr: '1rem' }}>
                            Generate Groups
                        </Button>
                        <Button variant="contained" endIcon={<SaveIcon />} onClick={saveData}>
                            Save Data
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', gap: '1rem' }}>
                        {Object.keys(groups).map((group, gi) => (
                            <Box key={gi} sx={{ width: '100%', height: '27.5vh', border: '1px solid black', borderRadius: '1rem', mb: '1rem', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ backgroundColor: colors[categories.indexOf(group)] || 'transparent', padding: '1rem', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', borderBottom: '1px solid black' }}>
                                    {group || 'Unassigned'}
                                    <hr style={{ border: '1px solid black', margin: '0.5rem 0' }} />
                                    Total Spent: {groups[group].reduce((t, b) => t + parseFloat(b.amount || 0), 0).toFixed(2)}
                                </Box>
                                <Box sx={{ backgroundColor: 'white', height: '100%', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'scroll', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                                    {groups[group].map((bill, bi) => (
                                        <Box key={bi} sx={{ width: 'fit-content', backgroundColor: colors[categories.indexOf(group)] || 'transparent', margin: '0.25rem', padding: '0.3rem 0.7rem', borderRadius: '1rem' }}>
                                            {bill.name}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
            {bills.length === 0 && (
                <Button variant="contained" endIcon={<SaveIcon />} onClick={saveData}>Save Data</Button>
            )}

            {/* CATEGORY MANAGEMENT DIALOG */}
            <Dialog open={openCategoryManagement} onClose={() => { setNewCategory(""); setOpenCategoryManagement(false); }}>
                <DialogTitle>Manage Categories</DialogTitle>
                <DialogContent sx={{ minWidth: 300 }}>
                    {categories.map((category, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 0.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 1 }} onClick={() => deleteCategory(index)}>
                                <DeleteIcon fontSize="small" />
                            </Box>
                            <Box>{category}</Box>
                        </Box>
                    ))}
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 1 }}
                            onClick={() => { if (newCategory) { setCategories([...categories, newCategory]); setNewCategory(""); } }}
                        >
                            <AddIcon fontSize="small" />
                        </Box>
                        <TextField
                            size="small"
                            placeholder="New category"
                            value={newCategory}
                            onChange={e => setNewCategory(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter" && newCategory) { setCategories([...categories, newCategory]); setNewCategory(""); } }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setNewCategory(""); setOpenCategoryManagement(false); }}>Done</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
