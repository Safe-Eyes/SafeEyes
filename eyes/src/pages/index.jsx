import React from 'react'

function index() {
  return (
    <div>
  <div className="main-banner">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="top-text header-text">
            <h2 className="left-aligned">Your Objects</h2>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="container d-flex justify-content-center">
     <figure class="card card-product-grid card-lg"> <a href="/courses" class="img-wrap" data-abc="true"> <img src="https://media.istockphoto.com/id/175426710/photo/large-and-old-brick-industrial-building.jpg?s=612x612&w=0&k=20&c=7hK31Wb46b-BHq5Zx6jlo99VjEY5JB7jCalbY5Lsex0="/> </a>
         <figcaption class="info-wrap">
             <div class="row">
                 <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">Your object's name</a> <span class="rated">Object's type</span> </div>
             </div>
             
         </figcaption>
         <div class="bottom-wrap-payment">
             <figcaption class="info-wrap">
                 <div class="row">
                     <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">20/70</a> <span class="rated">Workers are in</span> </div>
                     <div class="col-md-3 col-xs-3">
                         <div class="rating text-right"> Active </div>
                     </div>
                 </div>
             </figcaption>
         </div>
     </figure>
 </div>



    </div>
  )
}

export default index