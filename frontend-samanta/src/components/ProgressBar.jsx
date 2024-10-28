import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

export const ProgressBar = (props) => {

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
    }));

    return (
        <>
            <div >
                {/* <progress className={style.progress_bar} value={props.value} max={100} />
                <span className={style.porcentagem}>{value}%</span> */}

                <BorderLinearProgress variant="determinate" value={props.valor} />
            </div>
        </>
    )
}
