import React, { useEffect, useState } from 'react'
import style from '../assets/style/pages/Relatorio.module.scss'
import Header from '../components/Header'
import { BotaoVoltar } from '../components/BotaoVoltar'
import { DataGrid } from '@mui/x-data-grid'
import { relatorio } from '../services/api'
import { useLocation } from 'react-router-dom'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import moment from 'moment'




const Relatorio = () => {
    let location = useLocation();
    const id_vaso = location.state[0]
    const [dadosRelatorio, setDadosRelatorio] = useState([])
    useEffect(() => {
        const dados = async () => {
            try {
                const resp = await relatorio(id_vaso)
                const dadosComLinhaId = resp.data.data.map((item, index) => ({
                    ...item,
                    linha_id: index + 1, // Criando um ID único baseado no índice
                }));
                setDadosRelatorio(dadosComLinhaId);


            } catch (err) {
                console.log(err)
            }
        }
        dados()
    }, [id_vaso])

    const columns = [
        // {
        //     field: 'data', headerName: 'Data', width: 200,
        // },
        {
            field: 'data', headerName: 'Data', width: 200, headerAlign: 'center', align: 'center', type: 'date', valueFormatter: (value) => {
                if (value) {
                    return moment(value).format('DD/MM/YYYY HH:mm');
                }
                return '';
            },
        },
        { field: 'luminosidade', headerName: 'Luz (%)', width: 130 },
        { field: 'temperatura', headerName: 'Temp. (ºC)', width: 130 },
        { field: 'umidade', headerName: 'Água (%)', width: 130 },
        { field: 'id', headerName: 'ID Vaso', width: 70 },
        { field: 'linha_id', headerName: 'ID Tabela', width: 70 },
    ];

    const umidadeRelatorio = dadosRelatorio.map(item => Number(item.umidade));
    const temperaturaRelatorio = dadosRelatorio.map(item => Number(item.temperatura));
    const luminosidadeRelatorio = dadosRelatorio.map(item => Number(item.luminosidade));
    const dataRelatorio = dadosRelatorio.map(item => new Date(item.data).toLocaleString());
    const options = {
        chart: {
            type: 'column',
            backgroundColor: "#fafafa"
        },
        title: {
            text: 'Gráfico de variação da planta. '
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.2f} %'
                }
            }
        },
        xAxis: {
            categories: dataRelatorio
        },
        series: [
            {
                name: "Umidade",
                data: umidadeRelatorio,
                color: '#6ac9ef'
            },
            {
                name: "Temperatura",
                data: temperaturaRelatorio,
                color: '#2A9681'
            },
            {
                name: "Luminosidade",
                data: luminosidadeRelatorio,
                color: '#e9e146'
            }
        ],
        yAxis: {
            title: {
                text: 'porcentagem'
            }
        }
    };
    return (
        <React.Fragment>
            <Header />
            <BotaoVoltar />
            <div className={style.container}>
                <div className={style.container_grafico}>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
                <div style={{ height: '40rem', width: '80%', }}>
                    <DataGrid
                        rows={dadosRelatorio}
                        getRowId={(row) => row.linha_id}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}

                    />

                </div>


            </div>
            {console.log(dadosRelatorio)}
            {/* {console.log(umidade)} */}

        </React.Fragment>
    )
}

export default Relatorio