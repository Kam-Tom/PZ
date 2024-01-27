import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./DataTable.css";
import { deleteElement, getAll } from "../../axios";

function DataTable({ apiGetEndpoint,apiDeleteEndpoint, columns, renderDetails }) {
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);

    async function fetchData() {
        let items = await getAll(apiGetEndpoint);
        setData(items);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const onSelectData = (dataItem) => {
        setSelectedData(selectedData === dataItem ? null : dataItem);
    };

    const handleDelete = async (id) => {

        const response = await deleteElement(`${apiDeleteEndpoint}${id}`);
        
        if (response && response.status === 200) {
            setData(data.filter(item => item.id !== id));
        } else {
            console.error('Failed to delete item');
        }
    };

    return (
        <div className="data-list-container">
            <div className="data-details-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className={column.className}>{column.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dataItem, index) => (
                            <React.Fragment key={index}>
                                <tr className={`data-list-item ${selectedData === dataItem ? "active" : ""}`} onClick={() => onSelectData(dataItem)}>
                                    {columns.map((column, index) => (
                                        <td key={index} className={column.className}>
                                            {dataItem[column.field]}
                                        </td>
                                    ))}
                                </tr>
                                {selectedData === dataItem && (
                                    <tr>
                                        <td colSpan={columns.length}>
                                            {renderDetails(selectedData, handleDelete)}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

DataTable.propTypes = {
    apiEndpoint: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
        className: PropTypes.string,
        header: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
    })).isRequired,
    renderDetails: PropTypes.func.isRequired,
};

export default DataTable;