import React, { Component } from 'react';
import '../../styles/search.css';

class Pagination extends Component {
  
  //handling page change
  handlePageChange =(pageno) =>{
    
    this.props.onChangePage(pageno);            
  }
  
  render() {
      return (
        <div className="paginationspace">
                <div className="pagination">
                    
                    <button >&laquo;</button>
                    {
                      this.props.pages.map((page) =>{
                      return <button onClick={() => this.handlePageChange(page)}>{page}</button>
                      })
                    }
                    
                    <button >&raquo;</button>
                </div>
              </div>
      );
    }
  }
  
export default Pagination;
  