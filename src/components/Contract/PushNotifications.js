import Pusher from 'pusher-js'
import { Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function PushNotifications({contract_address, title=null, num=3}) {
    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
        var pusher = new Pusher('ac91a1d4157ccb9e4203', {
            cluster: 'us2'
        })
    
        // Ethereum channels
        var ethereum_txn_channel = pusher.subscribe('ethereum-transactions')
        ethereum_txn_channel.bind('new', function (data) {
            if (contract_address && data.to === contract_address) {
                let date_obj = new Date(data.timestamp)
                data.timestamp_obj = date_obj
                setTransactions((items) => [data, ...items.slice(0, num)])
                //alert(JSON.stringify(data));
            }
        })
    }, [])

    return (
        <Card title={title} content={false}>
            { transactions.length > 0 && 
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Hash</TableCell>
                        <TableCell>Function</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((row, index) => (
                        <TableRow hover key={index}>
                            <TableCell align="left">
                                {row.hash.substring(0, row.hash.length-50) + '...'}
                            </TableCell>
                            <TableCell align='left'>
                                {row.function && (
                                    <>{row.function.name}</>
                                )}
                            </TableCell>
                            <TableCell>
                                {row.value_eth}
                            </TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table> }
            { transactions.length === 0 && 
            <div style={{margin: "50px"}}>
                <div className="loader"></div>
            </div>
            }

        </Card>
    );
};

PushNotifications.propTypes = {
    contract_address: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired
};
