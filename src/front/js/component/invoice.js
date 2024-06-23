import React from 'react';

export const Invoice = ({inv_date, inv_number, inv_amount}) => {

    return (
        <>
            <tr>
                <td>
                    {inv_date}
                </td>
                <td>
                    {inv_number}
                </td>
                <td>
                    ${inv_amount}
                </td>
            </tr>
        </>
    );
}