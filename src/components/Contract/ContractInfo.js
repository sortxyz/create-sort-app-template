import Pusher from 'pusher-js'
import { Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function ContractInfo ({contract_address, title=null, num=3}) {
    const [contractName, setContractName] = useState([]);
    const [contractSymbol, setContractSymbol] = useState([]);
    const [numTransactions, setNumTransactions] = useState(null);
    const [numLogs, setNumLogs] = useState(null);
    const [volume, setVolume] = useState(null);
    
    useEffect(() => {
        getContractInfo();
        getNumTransactions7Days();
        getVolume7Days();
        getNumLogs7Days();
    }, [])

    // # Transactions 7 days
    async function getNumTransactions7Days() {
        try {
            var sortxyz_sql_result = await axios.post('https://sort-xyz.vercel.app/api/sql/query',
            {
                "query": "select count(*) as num from ethereum.transaction t where t.to = '"+contract_address.toLowerCase()+"' and t.timestamp >= (CURRENT_DATE() - INTERVAL 1 WEEK)",
                "api_key": "ce4c9316-f7ce-4955-b6b3-2292a8be7afc"
            }
            );

            if (sortxyz_sql_result) {
                let sortxyz_data = sortxyz_sql_result.data.query_response.results[0];
                setNumTransactions(sortxyz_data.num);
            }
        } catch (e) {
            console.log(e);
        }
    }

    // ETH volume 7 days
    async function getVolume7Days() {
        try {
            var sortxyz_sql_result = await axios.post('https://sort-xyz.vercel.app/api/sql/query',
            {
                "query": "select sum(value_eth) as num from ethereum.transaction t where t.to = '"+contract_address.toLowerCase()+"' and t.timestamp >= (CURRENT_DATE() - INTERVAL 1 WEEK)",
                "api_key": "ce4c9316-f7ce-4955-b6b3-2292a8be7afc"
            }
            );

            if (sortxyz_sql_result) {
                let sortxyz_data = sortxyz_sql_result.data.query_response.results[0];
                setVolume(sortxyz_data.num);
            }
        } catch (e) {
            console.log(e);
        }
    }

    // # Logs 7 days
    async function getNumLogs7Days() {
        try {
            var sortxyz_sql_result = await axios.post('https://sort-xyz.vercel.app/api/sql/query',
            {
                "query": "select count(*) as num from ethereum.transaction_log t where t.transaction_to = '"+contract_address.toLowerCase()+"' and t.timestamp >= (CURRENT_DATE() - INTERVAL 1 WEEK)",
                "api_key": "ce4c9316-f7ce-4955-b6b3-2292a8be7afc"
            }
            );

            if (sortxyz_sql_result) {
                let sortxyz_data = sortxyz_sql_result.data.query_response.results[0];
                setNumLogs(sortxyz_data.num);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function getContractInfo() {
        try {
            fetch('https://sort-xyz.vercel.app/api/contract/' + contract_address.toLowerCase() + "/info", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    if (data && data.name) {
                        setContractName(data.name);
                    }

                    if (data && data.symbol) {
                        setContractSymbol(data.symbol);
                    }
            })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Card title={title} content={false}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell align="left" style={{fontWeight: "bold"}}>
                            Contract Name
                        </TableCell>
                        <TableCell align="left">
                            {contractName}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left" style={{fontWeight: "bold"}}>
                            Contract Symbol
                        </TableCell>
                        <TableCell align="left">
                            {contractSymbol}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left" style={{fontWeight: "bold"}}>
                            Contract Address
                        </TableCell>
                        <TableCell align="left">
                            {contract_address}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left" style={{fontWeight: "bold"}}>
                            Transactions (7 Days)
                        </TableCell>
                        <TableCell align="left">
                            {numTransactions}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left" style={{fontWeight: "bold"}}>
                            Logs (7 Days)
                        </TableCell>
                        <TableCell align="left">
                            {numLogs}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left" style={{fontWeight: "bold"}}>
                            Volume (7 Days)
                        </TableCell>
                        <TableCell align="left">
                            {volume}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    );
};

ContractInfo.propTypes = {
    contract_address: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired
};
