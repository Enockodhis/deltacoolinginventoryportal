"use client";


import "./manageProductsPage.css";


const products = [
{ id: 1, code: "AC-1001", name: "ArcticFlow 5000", qty: 16 },
{ id: 2, code: "AC-1002", name: "ChillFlow 2000", qty: 32 },
{ id: 3, code: "AC-1003", name: "FrostAir 2000", qty: 24 },
{ id: 4, code: "AC-1004", name: "CoolBreeze 6000", qty: 48 }
];


export default function ProductsPage() {
return (
<div className="page-container">
<div className="header-row">
<h2 className="page-title">Manage Products</h2>
<button className="add-btn">Add Product</button>
</div>


<table className="products-table">
<thead>
<tr>
<th>#</th>
<th>Product Code</th>
<th>Name</th>
<th>Stock Qty</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{products.map((p, index) => (
<tr key={p.id}>
<td>{index + 1}</td>
<td>{p.code}</td>
<td>{p.name}</td>
<td>{p.qty}</td>
<td>
<button className="edit-btn">Edit</button>
<button className="delete-btn">Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
);
}