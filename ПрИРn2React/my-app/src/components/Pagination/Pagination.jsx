import './Pagination.css'
import arrLeft from '../../assets/arr-left.svg'
import arrRight from '../../assets/arr-right.svg'


const Pagination =({page, setCurrentPage, totalPages}) => {
    const pages = [];
    for(let i = 1; i <= totalPages; i++)
    {
        pages.push(i);
    }

    return(
        <div className="pagination">
        <button className="pagination-arrow prev"
         disabled={page === 1}
         onClick={() => setCurrentPage(prev => prev - 1)}
         >
            <img src={arrLeft} alt="Назад"></img>
        </button>
        
        <div className="pagination-numbers">
            {pages.map(num => (
                    <button 
                        key={num}
                        className={`page-link ${page === num ? 'active' : ''}`}
                        onClick={() => setCurrentPage(num)}
                    >
                        {num}
                    </button>
                ))}
        </div>

        <button className="pagination-arrow next" disabled={page === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
            <img src={arrRight} alt="Вперед"></img>
        </button>
    </div>
    )
}

export default Pagination;