import React, {  Component } from 'react';
import { Table } from './Table';
import axios from 'axios';

export class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tableData: {
                columns: ['Name', 'Specifications', 'Prices', 'Announcement Date'],
                rows: [{
                    'Name': 'Leica D-Lux 7',
                    'Specifications': '17 megapixels | 3″ screen | 24 – 75 mm (3.1×)',
                    'Prices': 'Check prices',
                    'Announcement Date': 'Announced 2 months ago'
                }, {
                    'Name': 'Leica Q-P',
                    'Specifications': '24 megapixels | 3″ screen',
                    'Prices': 'Check prices',
                    'Announcement Date': 'Announced 2 months ago'
                }, {
                    'Name': 'Leica M10-D',
                    'Specifications': '24 megapixels | Full frame sensor',
                    'Prices': 'Check prices',
                    'Announcement Date': 'Announced 3 months ago'
                }, {
                    'Name': 'Zeiss ZX1',
                    'Specifications': '37 megapixels | 4.34″ screen',
                    'Prices': 'Check prices',
                    'Announcement Date': 'Announced 4 months ago'
                }, {
                    'Name': 'Fujifilm GFX 50R',
                    'Specifications': '51 megapixels | 3.2″ screen | Medium format sensor',
                    'Prices': '$4,499.00 - $6,584.60',
                    'Announcement Date': 'Announced 4 months ago'
                }, {
                    'Name': 'Ricoh GR III',
                    'Specifications': '24 megapixels | 3″ screen',
                    'Prices': 'Check prices',
                    'Announcement Date': 'Announced 4 months ago'
                }, {
                    'Name': 'Canon PowerShot SX70 HS',
                    'Specifications': '20 megapixels | 3″ screen | 21 – 1365 mm (65×)',
                    'Prices': '$549.00',
                    'Announcement Date': 'Announced 4 months ago'
                }, {
                    'Name': 'Sony Cyber-shot DSC-HX99',
                    'Specifications': '18 megapixels | 3″ screen | 24 – 720 mm (30×)',
                    'Prices': 'Check prices',
                    'Announcement Date': 'Announced 4 months ago'
                }, {
                    'Name': 'Panasonic Lumix DC-LX100 II',
                    'Specifications': '17 megapixels | 3″ screen | 24 – 75 mm (3.1×)',
                    'Prices': '$997.99 - $1,095.98',
                    'Announcement Date': 'Announced 5 months ago'
                }, {
                    'Name': 'Nikon D3500',
                    'Specifications': undefined,
                    'Prices': '$396.95 - $713.90',
                    'Announcement Date': 'Announced 5 months ago'
                }]
            },
            // tableData: [],
            pageNum: [],
            currentPage: 1,
            itemPerPage: 5
        }
        this.sortBy = this.sortBy.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get(`http://localhost:5000/products`)
        .then(res => res.data)
        .then( prod => {
            const { currentPage, itemPerPage } = this.state;
            let pageNumber = [];
            for(let i = 1; i <= Math.ceil(prod.rows.length / itemPerPage); i++) {
                pageNumber.push(i);
            }
            const indexOfLast = currentPage * itemPerPage;
            const indexOfFirst = indexOfLast - itemPerPage;
            let currentItems = prod.rows.slice(indexOfFirst, indexOfLast);
            this.setState({tableData: {
                columns: prod.columns,
                rows: currentItems
            },
                pageNum: pageNumber
            });
          })
          .catch(error => alert(error))
    }

    compareBy(key) {
        return function (a, b) {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        };
    }

    sortBy(sortKey) {
        let cols = [...this.state.tableData.columns];
        let arrayCopy = [...this.state.tableData.rows];
        arrayCopy.sort(this.compareBy(sortKey));
        this.setState({tableData: {
            columns: cols,
            rows: arrayCopy}
        });
    }

    handleClick(e) {
        this.getData();
        this.setState({
            currentPage: Number(e.target.id)
        });
    }

    render() {
        return ( 
            <div>
            <Table tableData={this.state.tableData} currentPage={this.state.currentPage} itemPerPage={this.state.itemPerPage} clickEvent={this.sortBy} handleClick={this.handleClick} pageNum={this.state.pageNum}/>
            </div>
        );
    }
} 