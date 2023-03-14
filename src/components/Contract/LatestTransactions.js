import Drawer from '@mui/material/Drawer';

// material-ui
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import * as React from 'react';

import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Transactions({ title, contract_address }) {
    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
        getTransactions();
    }, [])

    async function getTransactions() {
        try {
            var sortxyz_sql_result = await axios.post('https://sort-xyz.vercel.app/api/sql/query',
            {
                "query": "select timestamp, t.value_eth, t.function.name as function, t.to, _id, t.hash, t.\"from\" as from_address from ethereum.transaction t where t.to='"+contract_address.toLowerCase()+"' limit 10",
                "api_key": "ce4c9316-f7ce-4955-b6b3-2292a8be7afc"
            }
            );

            if (sortxyz_sql_result) {
                let sortxyz_data = sortxyz_sql_result.data.query_response.results;
                setTransactions(sortxyz_data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Card title="Hola" content={false}>
            <CardContent>
            <Typography variant="h6" gutterBottom>
                Latest Transactions
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Hash</TableCell>
                            <TableCell>Function</TableCell>
                            <TableCell>From</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((row, index) => (
                            <TableRow hover key={index}>
                                <TableCell>
                                    2012-09-09 10:34AM
                                </TableCell>
                                <TableCell align="left">
                                    {row.hash.substring(0, row.hash.length-40) + '...'}
                                </TableCell>
                                <TableCell align='left'>
                                    {row.function && (
                                        <>{row.function}</>
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    {row.from_address.substring(0, row.from_address.length-10) + '...'}
                                </TableCell>
                                <TableCell>
                                    {row.value_eth}
                                </TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </CardContent>
        </Card>
    )
};
