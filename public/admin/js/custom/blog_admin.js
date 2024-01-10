$(document).ready(async function() {
    $.ajax({
      // url: `${base_url}` + "/blogs/get_all_blogs",
      url: base_url + "/blogs/get_priority_blogs",
      type: "GET",
      success: function(response) {
  
        if (response.status == true) {
          let arrOfBlog = response.data;
          let blogItem = "";
          console.log(arrOfBlog,"++")
          arrOfBlog.forEach((obj, i) => {
            let currentDate = new Date(obj.date);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1; // Months are zero-based
            const year = currentDate.getFullYear();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = currentDate.toLocaleDateString('en-US', options);
                blogItem +=
                `<div class="col-md-4">
                <article class="post post-medium border-0 pb-0 mb-5">
                    <div class="post-image">
                        <a href="${base_url +'/blog-details/' + obj.unique_url}">
                            <img src="${obj.image[0].icon_url}"
                                class="img-fluid img-thumbnail img-thumbnail-no-borders rounded-0"
                                alt="" />
                        </a>
                    </div>

                    <div class="post-content">

                        <h2 class="font-weight-semibold text-5 line-height-6 mt-3 mb-2"><a
                                href="${base_url +'/blog-details/' + obj.unique_url}">${obj.title}</a></h2>
                        <p>${obj.description}</p>

                       
                    </div>
                </article>
            </div>`
          });
          $("#blog_admin").append(blogItem);

        }
      }
    });
  });
//   $(document).ready(async function () {
//     $.ajax({
//         url: `http://localhost:5011` + "/blogs/get_remaining_blogs",
//         type: "GET",
//         success: function (response) {

//             if (response.status == true) {
//                 let arrOfBlog = response.data;
//                 console.log(arrOfBlog)
//                 let blogItem = "";
//                 arrOfBlog.forEach((obj, i) => {
//                     let currentDate = new Date(obj.date);
//                     const day = currentDate.getDate();
//                     const month = currentDate.getMonth() + 1; // Months are zero-based
//                     const year = currentDate.getFullYear();
//                     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//                     const formattedDate = currentDate.toLocaleDateString('en-US', options);
//                     const uniqueURL = obj.unique_url;
                   
//                     blogItem += 
                  
//                 //     `<div class="col-lg-4 col-md-6">
//                 //     <div class="item mb-50">
//                 //         <div class="img">
//                 //         <a href="blog-single.html?${uniqueURL}"> <img src="${obj.image[0].icon_url}" alt=""></a>
                           
//                 //         </div>
//                 //         <div class="cont">
//                 //             <h6>
//                 //                 <a href="blog-single.html?${uniqueURL}"> ${obj.title}</a>
//                 //             </h6>
                           
//                 //         </div>
//                 //     </div>
//                 // </div>`
//                 `<div class="col-md-4">
//                 <article class="post post-medium border-0 pb-0 mb-5">
//                     <div class="post-image">
//                         <a href="blog-single.html?${uniqueURL}">
//                             <img src="${obj.image[0].icon_url}"
//                                 class="img-fluid img-thumbnail img-thumbnail-no-borders rounded-0"
//                                 alt="" />
//                         </a>
//                     </div>

//                     <div class="post-content">

//                         <h2 class="font-weight-semibold text-5 line-height-6 mt-3 mb-2"><a
//                                 href="blog-single.html?${uniqueURL}">${obj.title}</a></h2>
//                         <p>Euismod atras vulputate iltricies etri elit. Class aptent taciti
//                             sociosqu ad litora torquent per conubia nostra, per inceptos
//                             himenaeos.</p>

                       
//                     </div>
//                 </article>
//             </div>`
//                 });
//                 $("#blog_admin").append(blogItem);

//             }
//         }
//     });
// });