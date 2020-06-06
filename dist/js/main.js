console.log('Client JS!')

window.onload = init

const serverAddress = "http://localhost:9000";
const createBlogPath = "/api/blog"
const baseUrl = '/api'
const productApiUrl = `${baseUrl}/blog`

const componant = `<div class="case">
<div class="row">
    <div class="col-md-6 col-lg-6 col-xl-8 d-flex">
        <a href="#" class="img w-100 mb-3 mb-md-0 img-link"><img src="image/image_1.jpg"
                style="max-height:300px;max-width:100%;"></a>
    </div>
    <div class="col-md-6 col-lg-6 col-xl-4 d-flex">
        <div class="text w-100 pl-md-3">
            <h2><a id="description" href="#">Build a website in minutes with Adobe Templates</a></h2>
            <div class="meta">
                <p class="mb-0"><a href="#">11/13/2019</a> | <a href="#">12 min read</a></p>
            </div>
        </div>
    </div>
</div>
</div>`

function init() {
    let listBlog = getListProduct()
    let listBlogLength = listBlog.length
    let addBlogContent = document.getElementsByClassName('blog')
    addBlogContent.innerHTMl=""

    console.log(listBlog)


    for (let i = listBlogLength - 1; i >= listBlogLength - 6 && i >= 0; i--) {
        addBlogContent.innerHTMl += `<div class="case">
        <div class="row">
            <div class="col-md-6 col-lg-6 col-xl-8 d-flex">
                <a href="#" class="img w-100 mb-3 mb-md-0 img-link"><img src="${listBlog[i].image}"
                        style="max-height:300px;max-width:100%;"></a>
            </div>
            <div class="col-md-6 col-lg-6 col-xl-4 d-flex">
                <div class="text w-100 pl-md-3">
                    <h1><a href="#" id="tilte">${listBlog[i].title}</a></h1>
                    <h3><a id="description" href="#">${listBlog[i].description}</a></h2>
                    <div class="meta">
                        <p class="mb-0"><a href="#">${formatTime(listBlog[i].time)}</a></p>
                    </div>
                </div>
            </div>
        </div>
        </div>`
    }

    let form = document.querySelector('#form-create-blog')
    form.onsubmit = async (e) => {
        e.preventDefault()
        let createBlogInfo = {
            title: form.title.value,
            description: form.description.value,
            content: form.content.value,
            image:form.picture.value
        }

        try {
            let url = serverAddress + createBlogPath
            let method = 'POST'
            let body = createBlogInfo
            console.log(body)
            let response = await createProduct(url, method, body)
            let responseBody = await response.json()
            let statusCode = response.status
            if (statusCode == 200) {
                alert('Upload blog success!')
            } else {
                let errMsg = responseBody.message
                throw new Error(errMsg)
            }
        } catch (err) {
            alert('Upload blog failed! Error:' + err.message)
        }
    }
}


function createProduct(url, method, body) {
    return fetch(url, {
        method: method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

async function getListProduct() {
    let res = await fetch(productApiUrl)
    let list = await res.json()
    return list
}

function formatTime(d){
    let t=new Date(d)
    return t.getDay()+'/'+t.getMonth()+'/'+t.getFullYear()
}