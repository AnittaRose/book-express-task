

async function form(){
    console.log('Reached....')


    let title = document.getElementById('title').value;
    let publisher = document.getElementById('publish').value;
    let author = document.getElementById('author').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let about = document.getElementById('about').value;
    let released = document.getElementById('released').value;
    let reviews = document.getElementById('reviews').value;
    let coverartist = document.getElementById('coverartist').value;
    let images =document.getElementById('images').value;

    // console.log('Title',Title);
    // console.log('Publisher',Publisher);
    // console.log('Author',Author);
    // console.log('Price',Price)
    // console.log('Description',Description)
    // console.log('About',About)
    // console.log('Released',Released)
    // console.log('Reviews',Reviews)
    // console.log('Coverartist',Coverartist)

    let datas = {
        title,
        publisher,
        author,
        price,
        description,
        about,
        released,
        reviews,
        coverartist,
        images
    }

    console.log('datas',datas)

    let json_data = JSON.stringify(datas);
    console.log('json_data',json_data);

    try {
        let response = await fetch('/addbooks',{
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            
            body: json_data
        })

        if(response){
            alert('submit successfully');
        }else{
            alert("submit failed")
        }
        window.location=`book-view-page.html`

        // window.location=``


    } catch (error) {
        console.error('fetch error:',error);
    }
}


async function viewbooksdetails() {
    try {
        let response = await fetch('/getbooks',{
            method: 'GET'
        });
        console.log('response', response);

        let parsed_datas = await response.json();
        console.log('parsed_datas', parsed_datas);

        // let data =parsed_datas.data;
        // console.log("data",data)

        let datacontainer = document.getElementById('container');


        let rows = '';

        for (let i = 0; i < parsed_datas.length; i++) {
            rows += `
            <div class="shadow   bg-body rounded  border border-1 border-dark">
            <div class="pt-4 text-center" onclick="handleclick('${parsed_datas[i]._id}')"><img src = " ${parsed_datas[i].images}" class="" style="width:300px;height:400px;"></div>
            <div class="fw-bold text-center fs-4 " onclick="handleclick('${parsed_datas[i]._id}')">${parsed_datas[i].title}</div>
            <div class=" pt-2 text-center" onclick="handleclick('${parsed_datas[i]._id}')">${parsed_datas[i].publisher}</div>
            <div class=" fw-bold pt-2 text-center" onclick="handleclick('${parsed_datas[i]._id}')">${parsed_datas[i].author}</div>
            <div class="pt-2 text-center" onclick="handleclick('${parsed_datas[i]._id}')">$${parsed_datas[i].price}</div>
            <div class="pt-2 text-center" onclick="handleclick('${parsed_datas[i]._id}')">${parsed_datas[i].description.slice(0,30)+""}</div>
            <div class="pt-2 text-center" onclick="handleclick('${parsed_datas[i]._id}')">${parsed_datas[i].about.slice(0,40)+""}</div>
            <div class="pt-2 text-center" onclick="handleclick('${parsed_datas[i]._id}')">${parsed_datas[i].released}</div>
            </div>

            `;
        }
        datacontainer.innerHTML = rows;
    } catch (error) {
        console.log('error', error);
    }
}

function handleclick(id){
    console.log('id',id)

    window.location=`singledata.html?id=${id}`
}

 async function singledata(){
    let params = new URLSearchParams(window.location.search);
    console.log('params',params);

    let id = params.get('id')
    console.log('id',id);

    try {
        let response = await fetch(`/single/${id}`,{
            method:'GET'
        })
        console.log('response',response);

        let parsed_response = await response.json()
        console.log('parsed_response',parsed_response);

        let datacontainer = document.getElementById('datacontainer')

        let rows=`
        <div class="shadow  bg-body rounded    d-flex justify-content-center align-items-center p-4 gap-5 border border-1 border-secondary container">
            <div><img src = "${parsed_response.images}"class="" style="width: 500px ; height: 900px;"></div>
            <div>

                <div class="fs-1 fw-bold" style="text-alignment:justify;" >${parsed_response.title}</div>
                <div class="fs-3 pt-3">${parsed_response.publisher}</div>
                <div class="pt-3">${parsed_response.author}</div>
                <div class="pt-3">$ ${parsed_response.price}</div>
                <div class="pt-3" style="text-align: justify;">${parsed_response.description}</div>
                <div class="pt-3">${parsed_response.about}</div>
                
            </div>
        </div>

        `

        datacontainer.innerHTML=rows;
    } catch (error) {
        console.log("error",error)
    }
}

async function deleteclick(id){
    try {
        let response = await fetch(`/delete/${id}`,{
            method:'DELETE'
        })
        console.log('response',response);
        if(response){
            alert("delete success")
        }else{
            alert("delete failed")
        }

        window.location=`book-view-page.html`
    } catch (error) {
        console.log("error",error)
    }
}

function updateclick(id){
    window.location=`update.html?id=${id}`;
    
}

async function loaddata(){
    let title = document.getElementById('title');
    let publisher=document.getElementById('publish')
    let author=document.getElementById('author')
    let price=document.getElementById('price')
    let description=document.getElementById('description')
    let about=document.getElementById('about')
    let released=document.getElementById('released')
    let reviews=document.getElementById('reviews')
    let coverartist=document.getElementById('coverartist')
    let images=document.getElementById('images')


    let params= new URLSearchParams (window.location.search)
    console.log('params',params);

    let id = params.get('id');
    console.log("id",id);



    try {
        let response=await fetch(`/single/${id}`,{
            method:'GET'
        
            
        })
        let parsed_response= await response.json()
        console.log('parsed_response',parsed_response);

        title.value = parsed_response.title
        publisher.value = parsed_response.publisher
        author.value = parsed_response.author
        price.value = parsed_response.price
        description.value = parsed_response.description
        about.value = parsed_response.about
        released.value = parsed_response.released
        reviews.value = parsed_response.reviews
        coverartist.value=parsed_response.coverartist
        images.value=parsed_response.images

    } catch (error) {
        
    }
}
 async function editeddata(event){

    event.preventDefault()
    let title = document.getElementById('title').value
    let publisher=document.getElementById('publish').value
    let author=document.getElementById('author').value
    let price=document.getElementById('price').value
    let description=document.getElementById('description').value
    let about=document.getElementById('about').value
    let released=document.getElementById('released').value
    let reviews=document.getElementById('reviews').value
    let coverartist=document.getElementById('coverartist').value
    let images=document.getElementById('images').value


    let datas = {
        title,
        publisher,
        author,
        price,
        description,
        about,
        released,
        reviews,
        coverartist,
        images
    }

    console.log('datas',datas);

    let strdata=JSON.stringify(datas)


    let params=new URLSearchParams (window.location.search);
    console.log('params',params);

    let id=params.get('id');
    console.log('id',id);

    try {
        let response=await fetch(`/update/${id}`,{
            method:'PUT',

            headers :{
                'Content-Type' :'application/json'
            },
            body : strdata
        })
        console.log('response',response);

        let parsed_response= await response.json()
        console.log('parsed_response',parsed_response);

    } catch (error) {
        console.log('error',error)
    }
 }
 


 async function viewbooksdetailsadmin() {
    try {
        let response = await fetch('/getbooks',{
            method: 'GET'
        });
        console.log('response', response);

        let parsed_datas = await response.json();
        console.log('parsed_datas', parsed_datas);

        // let data =parsed_datas.data;
        // console.log("data",data)

        let datacontainer = document.getElementById('container');


        let rows = '';

        for (let i = 0; i < parsed_datas.length; i++) {
            rows += `
            <div class="shadow  mb-5 bg-body rounded container d-flex justify-content-center align-items-center gap-5  p-5">
            <div class="" onclick="handleclick('${parsed_datas[i]._id}')"><img src = " ${parsed_datas[i].images}"style="width:200px"height:300px;></div>
            <div class="">
            <div class="fs-3 fw-bolder " onclick="handleclick('${parsed_datas[i]._id}')">${parsed_datas[i].title}</div>
            <div class="" onclick="handleclick('${parsed_datas[i]._id}')">Released Date :${parsed_datas[i].released}</div>
            <div class="" onclick="handleclick('${parsed_datas[i]._id}')">${parsed_datas[i].publisher}</div>
            <div class="" onclick="handleclick('${parsed_datas[i]._id}')">${parsed_datas[i].description}</div>
            <div class="" onclick="handleclick('${parsed_datas[i]._id}')">${parsed_datas[i].about}</div>
            <div class=" d-flex justify-content-between align-items-center">
            <div class=""><button class="custom-btn btn-5" onclick="deleteclick('${parsed_datas[i]._id}')">Delete</button></div>
            <div class=""><button  class="custom-btn btn-11" onclick="updateclick('${parsed_datas[i]._id}')">Update</button></div>
            </div>
            </div>
            </div>

            `;
        }
        datacontainer.innerHTML = rows;
    } catch (error) {
        console.log('error', error);
    }
}




