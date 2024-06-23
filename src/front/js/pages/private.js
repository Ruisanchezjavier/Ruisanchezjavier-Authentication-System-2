import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import { Invoice } from '../component/invoice';



export const Private = () => {
  const {store, actions} = useContext(Context);

  useEffect(() => {
     actions.getInvoices();
  }, [])

  

    return (
        <>
          <div>
            <table>
              <thead>
                <tr>
                  <th>
                      Invoice Date/
                  </th>
                  <th>
                      Invoice Number/
                      
                  </th>
                  <th>
                      Invoice Amount/
                  </th>
                </tr>

              </thead>
              <tbody>
                {store.invoices.map((item, index) => {
                    return (
                        <Invoice key={index} inv_date={item.invoice_date} inv_number={item.invoice_number} inv_amount={item.invoice_amount} />
                    )
                })}
              </tbody>
            </table>
          </div>
          <Link to='/login'>
          <button onClick={() => {actions.logout()}}>Logout</button>
          </Link>

        </>
    )

}