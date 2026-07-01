const express = require('express');
const app = express();
app.use(express.json());

let notes = [ { id:1, title:'Nota demo', body:'Contenido' } ];

app.get('/api/notes', (req,res)=> res.json(notes));
app.post('/api/notes',(req,res)=>{
  const id = notes.length? notes[notes.length-1].id+1:1;
  const note = { id, ...req.body }; notes.push(note); res.status(201).json(note);
});
app.delete('/api/notes/:id',(req,res)=>{ notes = notes.filter(n=>n.id!=req.params.id); res.status(204).end(); });

const PORT = process.env.PORT || 3005;
app.listen(PORT, ()=> console.log(`Gestor de notas en http://localhost:${PORT}`));
