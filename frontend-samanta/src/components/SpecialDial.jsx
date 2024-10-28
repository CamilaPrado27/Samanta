import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { useNavigate } from 'react-router-dom';


export default function BasicSpeedDial({id_vaso}) {
    let navigate = useNavigate()
    let direction = 'left'

    const handleRelatorio = () =>{
        navigate('/relatorio', {state: id_vaso})
       
    }
    return (
        <Box
        // sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}
        >
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                // sx={{ position: 'absolute', bottom: 16, right: 16 }}
                sx={{ marginRight: '3rem', '& .MuiFab-primary': { backgroundColor: '#2A9681' }, }}
                icon={<AssessmentIcon openIcon={<SpeedDialIcon />} />}
                direction={direction}
            >

                <SpeedDialAction
                    key={'Relatório'}
                    icon={<FileCopyIcon />}
                    tooltipTitle={'Relatório'}
                    onClick={handleRelatorio}
                />

            </SpeedDial>
        </Box>
    );
}
