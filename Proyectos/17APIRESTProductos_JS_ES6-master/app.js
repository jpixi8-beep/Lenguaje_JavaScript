// API REST simple de productos (ejemplo)
const express = require('express');
const app = express();
app.use(express.json());

let products = [ { id:1, name:'Producto demo', price:9.99 } ];

app.get('/api/products', (req,res)=> res.json(products));
app.get('/api/products/:id', (req,res)=>{
  const p = products.find(x=>x.id==req.params.id);
  if(!p) return res.status(404).json({message:'No encontrado'});
  res.json(p);
});
app.post('/api/products',(req,res)=>{
  const id = products.length? products[products.length-1].id+1:1;
  const p = { id, ...req.body }; products.push(p); res.status(201).json(p);
});
app.put('/api/products/:id',(req,res)=>{
  const idx = products.findIndex(x=>x.id==req.params.id);
  if(idx===-1) return res.status(404).json({message:'No encontrado'});
  products[idx] = { id: products[idx].id, ...req.body }; res.json(products[idx]);
});
app.delete('/api/products/:id',(req,res)=>{
  products = products.filter(x=>x.id!=req.params.id); res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log(`API REST productos en http://localhost:${PORT}`));
