const express = require('express');
const app = express();
app.use(express.json());

// Datos de ejemplo
const items = [
  { id:1, tags:['movie','action'] },
  { id:2, tags:['movie','drama'] },
  { id:3, tags:['music','pop'] },
  { id:4, tags:['movie','comedy'] }
];

// Endpoint simple de recomendaciones: recibe { liked: [itemIds] }
app.post('/recommend', (req,res)=>{
  const liked = req.body.liked || [];
  const likedTags = new Set();
  liked.forEach(id=>{ const it = items.find(x=>x.id==id); if(it) it.tags.forEach(t=>likedTags.add(t)) });
  const ranked = items
    .filter(i=>!liked.includes(i.id))
    .map(i=>({ item:i, score: i.tags.filter(t=>likedTags.has(t)).length }))
    .sort((a,b)=>b.score-a.score)
    .map(r=>r.item);
  res.json(ranked);
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, ()=> console.log(`Recommendation service en http://localhost:${PORT}`));
