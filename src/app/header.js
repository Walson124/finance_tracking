import { Box } from '@mui/material';

export default function Header() {
    return (
        <header
            style={{
                height: '5vh',
                width: '100%'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <Box
                    sx={{
                        marginLeft: '1rem',
                        borderRadius: '1rem',
                        width: 'fit-content',
                        padding: '0.25rem 1rem',
                        fontSize: '1.5rem',
                        border: '1px solid transparent',
                        '&:hover': {
                            border: '1px solid rgba(128, 128, 128, 0.8)' // Darker border on hover
                        }
                    }}
                >
                    <a
                        href='/'
                        style={{
                            textDecoration: 'none', // Removes underline
                            color: 'inherit' // Inherits text color from parent
                        }}
                    >
                        home
                    </a>
                </Box>
                <Box
                    sx={{
                        marginLeft: '1rem',
                        borderRadius: '1rem',
                        width: 'fit-content',
                        padding: '0.25rem 1rem',
                        fontSize: '1.5rem',
                        border: '1px solid transparent',
                        '&:hover': {
                            border: '1px solid rgba(128, 128, 128, 0.8)' // Darker border on hover
                        }
                    }}
                >
                    <a
                        href='/input'
                        style={{
                            textDecoration: 'none', // Removes underline
                            color: 'inherit' // Inherits text color from parent
                        }}
                    >
                        input
                    </a>
                </Box>
                <Box
                    sx={{
                        marginLeft: '1rem',
                        borderRadius: '1rem',
                        width: 'fit-content',
                        padding: '0.25rem 1rem',
                        fontSize: '1.5rem',
                        border: '1px solid transparent',
                        '&:hover': {
                            border: '1px solid rgba(128, 128, 128, 0.8)' // Darker border on hover
                        }
                    }}
                >
                    <a
                        href='/'
                        style={{
                            textDecoration: 'none', // Removes underline
                            color: 'inherit' // Inherits text color from parent
                        }}
                    >
                        analysis
                    </a>
                </Box>
            </Box>
        </header>
    );
}