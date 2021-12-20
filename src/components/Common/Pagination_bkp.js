import React from "react"

const Pagination=({listPerPage,totalList,paginate})=>{
   const pageNumbers=[];
   
   for(let i=1;i<=Math.ceil(totalList/listPerPage); i++){
       pageNumbers.push(i);
   }

  return (
   <nav>    
       <ul className="pagination">
       {
           pageNumbers.map(number=>{
              
             return  <li key={number} className="page-item">
                <button  onClick={()=>paginate(number)}  className="page-link" >
                    {number}
                </button>

               </li>
           })

       }


       </ul>
   </nav>
  )

}
export default Pagination