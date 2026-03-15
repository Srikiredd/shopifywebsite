let products=[]

// Load all products when page starts
function loadProducts(){

fetch("http://localhost:8080/getProducts")

.then(res=>res.json())

.then(data=>{

products=data

renderProducts(data)

})

}


// Display products on UI
function renderProducts(list){

let html=""

list.forEach(p=>{

html+=`

<div class="product">

<img src="${p.imageUrl}">

<h3>${p.name}</h3>

<p>${p.description}</p>

<p>₹${p.price}</p>

<button class="edit" onclick="editProduct(${p.id})">Edit</button>

<button class="delete" onclick="deleteProduct(${p.id})">Delete</button>

</div>

`

})

document.getElementById("productList").innerHTML=html

}


// Add product
function addProduct(){

let product={

name:document.getElementById("name").value,
description:document.getElementById("description").value,
price:parseFloat(document.getElementById("price").value),
imageUrl:document.getElementById("imageUrl").value

}

fetch("http://localhost:8080/addProduct",{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(product)

})

.then(res=>res.json())

.then(data=>{

alert("Product Added Successfully")

closeForm()

loadProducts()

})

.catch(error=>console.error("Error:",error))

}


// Update product
function updateProduct(){

let id=document.getElementById("id").value

let product={

name:document.getElementById("name").value,
description:document.getElementById("description").value,
price:parseFloat(document.getElementById("price").value),
imageUrl:document.getElementById("imageUrl").value

}

fetch("http://localhost:8080/updateProduct/"+id,{

method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(product)

})

.then(()=>{

alert("Product Updated")

closeForm()

loadProducts()

})

}


// Delete product
function deleteProduct(id){

fetch("http://localhost:8080/deleteProduct/"+id,{

method:"DELETE"

})

.then(()=>{

loadProducts()

})

}


// Edit product (fill form)
function editProduct(id){

fetch("http://localhost:8080/getProduct/"+id)

.then(res=>res.json())

.then(p=>{

openForm()

document.getElementById("id").value=p.id
document.getElementById("name").value=p.name
document.getElementById("description").value=p.description
document.getElementById("price").value=p.price
document.getElementById("imageUrl").value=p.imageUrl

})

}


// Search product
function searchProduct(){

let text=document.getElementById("search").value.toLowerCase()

let filtered=products.filter(p=>
p.name.toLowerCase().includes(text)
)

renderProducts(filtered)

}


// Open form
function openForm(){

document.getElementById("productForm").style.display="block"

}


// Close form
function closeForm(){

document.getElementById("productForm").style.display="none"

}


// Load products when page opens
loadProducts()