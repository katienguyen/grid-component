import React, {  Component } from 'react';

export class Table extends Component {
    constructor(props) {
        super(props);
    }

    sortBy(sortKey) {
        this.props.clickEvent(sortKey);
    }

    handleClick(e) {
        this.props.handleClick(e);
    }

    renderTablehead() {
        return (
          <tr>{this.props.tableData.columns.map((colName, key) => {
            return (
              <th className={"col-" + colName} scope="col" key={key}>{colName} <span className="glyphicon glyphicon-sort" onClick={(e) => this.sortBy(colName)}></span></th>
            );
          })}</tr>
        );
    };

    renderTableRows() {
        let _this = this;
        return this.props.tableData.rows.map(function(row) {
            return (
                <tr>
                    {_this.props.tableData.columns.map(function(column) {
                    return <td>{row[column]}</td>; })} 
                </tr>); 
            });
        }

    renderPagination() {
        return this.props.pageNum.map(num => {
            return (
                <li className="paginate_button page-item">
                    <a className="page-link" href="#" key={num} id={num} onClick={(e) => this.handleClick(e)}>{num}</a>
                </li>
            )
        })
    }

    render() {
        return ( 
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead>
                        {this.renderTablehead()}
                    </thead>
                    <tbody>
                        {this.renderTableRows()}
                    </tbody>
                </table>
            <nav className="navigation">
                <ul className="pagination">{this.renderPagination()}</ul>
            </nav>
            </div>
        );
    }
}