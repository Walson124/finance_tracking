import { Box } from '@mui/material';

export default function HeaderV2() {
	return (
		<Box
			sx={{
				width: '100%',
			}}
		>
			<Box
				sx={{
					width: 'calc(100%-40px)',
					margin: '15px 15px 0px 15px', // top, right, bot, left
					borderRadius: '20px',
					height: '30px',
					padding: '20px',
					alignContent: 'center', // vertical centered
					backgroundColor: 'rgb(20, 20, 20)',
					display: 'flex',
					flexDirection: 'row',
					color: 'rgb(214, 214, 214)',
				}}
			>
				<Box
					sx={{
						flexGrow: '20',
						fontSize: '150%',
						display: 'flex',
						flexDirection: 'row',
						alignContent:'center',
					}}
				>
					<Box
						sx={{
							marginRight: '5px',
						}}
					>
						<img
							src="/assets/logo.png"
							alt="doge"
							style={{
								height: '40px',
								marginTop:'-7px',
							}}
						/>
					</Box>
					<Box>
						Finance Tracker
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						flexGrow: '20',
						textAlign: 'center',
						fontSize: '110%',
					}}
				>
					<Box
						sx={{
							flexGrow: '1',
						}}
					>
						Home
					</Box>
					<Box
						sx={{
							flexGrow: '1',
						}}
					>
						Add
					</Box>
					<Box
						sx={{
							flexGrow: '1',
						}}
					>
						Plan
					</Box>
					<Box
						sx={{
							flexGrow: '1',
						}}
					>
						Trends
					</Box>
					<Box
						sx={{
							flexGrow: '1',
						}}
					>
						Goals
					</Box>
					<Box
						sx={{
							flexGrow: '1',
						}}
					>
						Bills
					</Box>
					<Box
						sx={{
							flexGrow: '1',
						}}
					>
						Settings
					</Box>
				</Box>
				<Box
					sx={{
						flexGrow: '20',
						textAlign: 'right',
					}}
				>
					username
				</Box>
			</Box>
		</Box>
	)
}