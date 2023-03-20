// material-ui
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import * as React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios'
import { useEffect, useState } from 'react'

export default function SQLQuery({ title, query, num }) {
    const [columns, setColumns] = useState(null);
    const [results, setResults] = useState(null);
    
    useEffect(() => {
        getTransactions();
    }, [])

    async function getTransactions() {
        try {
            var sortxyz_sql_result = await axios.post('https://sort-xyz.vercel.app/api/sql/query',
            {
                "query": query,
                "api_key": "ce4c9316-f7ce-4955-b6b3-2292a8be7afc"
            }
            );

            if (sortxyz_sql_result) {
                console.log(JSON.stringify(sortxyz_sql_result, null, 2));
                let sortxyz_data = sortxyz_sql_result.data.query_response.results;
                
                if (sortxyz_data && sortxyz_data.length > 0) {
                    let first_result = sortxyz_data[0];
                    let columns_arr = Object.keys(first_result);
                    console.log(JSON.stringify(columns_arr, null, 2));

                    let columns = [];
                    for (let i=0; i<columns_arr.length; i++) {
                        columns.push({
                            field: columns_arr[i], 
                            headerName: columns_arr[i], 
                            flex: 1}
                        );
                    }
                    
                    setColumns(columns);

                    // Add unique id to each row
                    let new_results = [];
                    for (let j=0; j<sortxyz_data.length; j++) {
                        sortxyz_data[j].id = j;
                        
                        new_results.push(sortxyz_data[j])
                        console.log(JSON.stringify(new_results[j], null, 2));
                    }
                    setResults(new_results);
                }
                
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div style={{ height: 400, width: '100%', backgroundColor: "#fff" }}>
                {columns && results && 
                <DataGrid
                    rows={results}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />}
            </div>
    )
};

SQLQuery.propTypes = {
    query: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired
};
