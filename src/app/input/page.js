import { Box } from "@mui/material";
import { BillInput } from "./bill-input";

export const metadata = {
    title: 'Input',
    description: 'Input spending data',
}

export default function Input() {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '15px',
            }}
        >
            <BillInput/>
        </Box>
    )
}