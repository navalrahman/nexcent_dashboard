import React from 'react'
import './Overview.css'
import { useSortBy, useTable } from 'react-table';
import { SortOrder } from 'react-data-table-component';
// import 'react-table/react-table.css';

import {
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import {
  PieChart,
  Pie,
  Cell,
  Label,
} from 'recharts';


const stats = [
  {
    title: 'Total Users',
    value: 1240,
    icon: 'fa-users',
    color: '#4e73df'
  },
  {
    title: 'Sales',
    value: 321,
    icon: 'fa-shopping-cart',
    color: '#1cc88a'
  },
  {
    title: 'Orders',
    value: 87,
    icon: 'fa-box',
    color: '#36b9cc'
  },
  {
    title: 'Revenue',
    value: '$12,450',
    icon: 'fa-dollar-sign',
    color: '#f6c23e'
  }
];

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    sortType: 'alphanumeric'
  },
  {
    Header: 'Age',
    accessor: 'age',
    sortType: 'basic',
  },
  {
    Header: 'City',
    accessor: 'city'
  },
  {
    Header: 'Address',
    accessor: 'address'
  },
  {
    Header: 'Education',
    accessor: 'education'
  },

  {
    Header: 'Occupation',
    accessor: 'occupation'
  },
];



const data = [
  {
    name: 'Alice',
    age: 28,
    city: "Bnagalore",
    address: "7th cross, CMR Road, Kalyan Nagar",
    education: "Masters",
    occupation: "BDE"
  },
  {
    name: 'Rahul Sharma',
    age: 32,
    city: 'Delhi',
    address: 'Sector 12, Dwarka',
    education: 'MBA',
    occupation: 'Marketing Manager',
  },
  {
    name: 'Sneha Iyer',
    age: 25,
    city: 'Chennai',
    address: 'Anna Nagar, 5th Avenue',
    education: 'B.Tech',
    occupation: 'Software Engineer',
  },
  {
    name: 'Arjun Mehta',
    age: 30,
    city: 'Mumbai',
    address: 'Andheri West, JP Road',
    education: 'MCA',
    occupation: 'Product Manager',
  },
  {
    name: 'Priya Desai',
    age: 27,
    city: 'Ahmedabad',
    address: 'Satellite, Iscon Road',
    education: 'Masters in Commerce',
    occupation: 'Accountant',
  },
  {
    name: 'Vikram Raj',
    age: 35,
    city: 'Hyderabad',
    address: 'Madhapur, Near Image Hospital',
    education: 'PhD',
    occupation: 'Data Scientist',
  },
  {
    name: 'Neha Verma',
    age: 29,
    city: 'Pune',
    address: 'Koregaon Park, Lane 6',
    education: 'B.Sc IT',
    occupation: 'UI/UX Designer',
  },
  {
    name: 'Rohan Singh',
    age: 31,
    city: 'Kolkata',
    address: 'Salt Lake Sector V',
    education: 'MBA in Finance',
    occupation: 'Financial Analyst',
  },
  {
    name: 'Divya Patel',
    age: 26,
    city: 'Surat',
    address: 'City Light Area, Ring Road',
    education: 'M.Sc',
    occupation: 'HR Executive',
  },
  {
    name: 'Manish Kumar',
    age: 33,
    city: 'Patna',
    address: 'Rajbansi Nagar, Boring Road',
    education: 'LLB',
    occupation: 'Legal Advisor',
  }
];

const Overview = () => {

  const datas = [
    { name: "Bubble Tea Sold", value: 10 },
    { name: "Bubble Tea Left", value: 4 },
  ];

  const dataOne = [
    { name: "Bubble Tea Sold", value: 80 },
    { name: "Bubble Tea Left", value: 20 },
  ];

  const dataTwo = [
    { name: "Bubble Tea Sold", value: 60 },
    { name: "Bubble Tea Left", value: 40 },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <div className="dashboard-overview">
      <div className='dashboard-overview-one'>
        {stats.map((item, index) => (
          <div className="card" key={index} style={{ borderLeft: `4px solid ${item.color}` }}>
            <div className="card-icon">
              <i className={`fas ${item.icon}`} style={{ color: item.color }}></i>
            </div>
            <div className="card-info">
              <h4>{item.title}</h4>
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='dashboard-overview-two'>
        <div className='dashboard-overview-two-container-one'>
          <h4>How many Components?</h4>
          <h5>8 components are there</h5>
        </div>
        <div className='dashboard-overview-two-container-one'>
          <h4>How many Components?</h4>
          <h5>8 components are there</h5>
        </div>
        <div className='dashboard-overview-two-container-one'>
          <h4>How many Components?</h4>
          <h5>8 components are there</h5>
        </div>
        <div className='dashboard-overview-two-container-one'>
          <h4>How many Components?</h4>
          <h5>8 components are there</h5>
        </div>
      </div>
      <div className='dashboard-overview-three'>
        <table className='dashboard-table' {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr className='dashboard-table-hover' {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='dashboard-overview-four'>
        <div className='dashboard-overview-four-chartone' >
          <h3>The first Data</h3>
          <PieChart width={380} height={250}>
            <Pie
              data={datas}
              cx="50%"
              cy="50%"
              dataKey="value" // make sure to map the dataKey to "value"
              innerRadius={40} // the inner and outer radius helps to create the progress look
              outerRadius={80}
            >
              {datas.map((entry, index) => {
                if (index === 1) {
                  return <Cell key={`cell-${index}`} fill="#f3f6f9" />; // make sure to map the index to the colour you want
                }
                return <Cell key={`cell-${index}`} fill="green" />;
              })}
              <Label
                value={datas[0].value}
                position="center"
                fill="grey"
              // style={{
              //   fontSize: "32px",
              //   fontWeight: "bold",
              //   fontFamily: "Roboto"
              // }}
              />
            </Pie>
          </PieChart>
          <div className='indication'>
            <span className='indicator-item'>
              <div className='indicator-box green'></div>
              <p className='indicator-label'>sold</p>
            </span>
            <span className='indicator-item'>
              <div className='indicator-box red'></div>
              <p className='indicator-label'>Remaining</p>
            </span>
          </div>

        </div>


        <div className='dashboard-overview-four-charttwo'>
          <h3>The second Data</h3>
          <PieChart width={380} height={280}>
            <Pie
              data={dataTwo}
              cx="50%"
              cy="50%"
              dataKey="value" // make sure to map the dataKey to "value"
              innerRadius={60} // the inner and outer radius helps to create the progress look
              outerRadius={80}
            >
              {dataTwo.map((entry, index) => {
                if (index === 1) {
                  return <Cell key={`cell-${index}`} fill="#f3f6f9" />; // make sure to map the index to the colour you want
                }
                return <Cell key={`cell-${index}`} fill="blue" />;
              })}
              <Label
                value={dataTwo[0].value}
                position="center"
                fill="red"
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  fontFamily: "Roboto"
                }}
              />
            </Pie>
          </PieChart>

          <div className='indications'>
            <span className='indicators-item'>
              <div className='indicators-box blue'></div>
              <p className='indicators-label'>sold</p>
            </span>
            <span className='indicators-item'>
              <div className='indicators-box red'></div>
              <p className='indicators-label'>Remaining</p>
            </span>
          </div>
        </div>

        <div className='dashboard-overview-four-charttwo'>
          <h3>The third Data</h3>
          <PieChart width={380} height={280}>
            <Pie
              data={dataOne}
              cx="50%"
              cy="50%"
              dataKey="value" // make sure to map the dataKey to "value"
              innerRadius={60} // the inner and outer radius helps to create the progress look
              outerRadius={120}
            >
              {dataOne.map((entry, index) => {
                if (index === 1) {
                  return <Cell key={`cell-${index}`} fill="#f3f6f9" />; 
                }
                return <Cell key={`cell-${index}`} fill="orange" />;
              })}
              <Label
                value={dataOne[0].value}
                position="center"
                fill="black"
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  fontFamily: "Roboto"
                }}
              />
            </Pie>
          </PieChart>

          <div className='indications'>
            <span className='indicators-item'>
              <div className='indicators-box orange'></div>
              <p className='indicators-label'>sold</p>
            </span>
            <span className='indicators-item'>
              <div className='indicators-box red'></div>
              <p className='indicators-label'>Remaining</p>
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Overview