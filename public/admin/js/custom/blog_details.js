$(document).ready(async function () {

    $.ajax({
        url: base_url + "/blogs/get_blog_details/" + unique_url,
        type: "GET",
        success: function (response) {
            console.log(response.data)
            let blogsMarkup = "";
            let currentDate = new Date(response.data.BlogData[0].date);

            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = currentDate.toLocaleDateString('en-US', options);
            const splitDate = formattedDate.split(' ');
            const month = splitDate[0];
            const day = splitDate[1].replace(',', '');
            const year = splitDate[2];
            if (response.status) {
                blogsMarkup +=
                    ` <div class="blog-posts single-post">   
        <article class="post post-large blog-single-post border-0 m-0 p-0">
            <div class="post-image ms-0">
                <a href="blog-post.html">
                    <img src="${response.data.BlogData[0].image[0].icon_url}" class="img-fluid img-thumbnail img-thumbnail-no-borders rounded-0" alt="" />
                </a>
            </div>
            <div class="post-date ms-0">
                <span class="day">${day}</span>
                <span class="month">${month} , ${year}</span>
            </div>
            <div class="post-content ms-0">
                <h2 class="font-weight-semi-bold"style="color:#0088cc">${response.data.BlogData[0].title}</h2><br><br>
                ${response.data.BlogData[0].detail_description}
                <div class="post-block mt-5 post-share">
                <h4 class="mb-3">Share this Post</h4>
                                <div class="d-flex"style="gap:25px;font-size:16px">
                                                          <a href="https://facebook.com/sharer/sharer.php?u=${base_url +
                    "/blogs/blog-details/" +
                    response.data.BlogData[0].unique_url}"
                                                              class="social-icon si-small border-transparent rounded-circle "
                                                              title="Facebook">
                                                              <img src="/website-files/img/icons/facebook.png"alt="">
                                                          </a>
                          
                                                          <a href="https://twitter.com/intent/tweet/?text=${base_url +
                    "/blogs/blog-details/" +
                    response.data.BlogData[0].unique_url}"
                                                              class="social-icon si-small border-transparent rounded-circle bg-twitter"
                                                              title="Twitter">
                                                              <img src="/website-files/img/icons/twitter.png"alt="">
                                                          </a>
                          
                               
                          
                                                          <a href="https://api.whatsapp.com/send/?text=${base_url +
                    "/blogs/blog-details/" +
                    response.data.BlogData[0].unique_url}"
                                                              class="social-icon si-small  border-transparent rounded-circle bg-whatsapp"
                                                              title="Whatsapp">
                                                              <img src="/website-files/img/icons/whatsapp.png"alt="">
                                                          </a>
                          
                          
                                                          <a href="mailto:?subject=${base_url +
                    "/blogs/blog-details/" +
                    response.data.BlogData[0].unique_url}"
                                                              class="social-icon si-small border-transparent rounded-circle bg-email3 me-0"
                                                              title="Mail">
                                                              <img src="/website-files/img/icons/mail.png"alt="">
 
                                                          </a>
                                
                        </div>
                    </div>


            </div>
        </article>

    </div>`
                $("#blog_details").empty(blogsMarkup);

                $("#blog_details").append(blogsMarkup);
            } else {
                $(".blogsSection").hide();
            }

        }
    });
});

function copytoClipboard(e) {
    $("body").append('<input id="copyURL" type="text" value="" />');
    $("#copyURL").val(window.location.href).select();
    document.execCommand("copy");
    $("#copyURL").remove();
}


