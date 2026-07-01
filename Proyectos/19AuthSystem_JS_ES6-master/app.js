const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'demo_secret';

app.post('/register', async (req,res)=>{
  const { username, password } = req.body;
  if(!username||!password) return res.status(400).json({message:'username y password requeridos'});
  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hash(password,salt);
  users.push({ username, password:hash });
  res.status(201).json({message:'Usuario creado'});
});

app.post('/login', async (req,res)=>{
  const { username, password } = req.body;
  const user = users.find(u=>u.username===username);
  if(!user) return res.status(401).json({message:'Credenciales inválidas'});
  const ok = await bcrypt.compare(password,user.password);
  if(!ok) return res.status(401).json({message:'Credenciales inválidas'});
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn:'1h' });
  res.json({ token });
});

app.get('/me', (req,res)=>{
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ','');
  try{ const data = jwt.verify(token, JWT_SECRET); res.json({ user: data }); } catch(e){ res.status(401).json({message:'Token inválido'}); }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, ()=> console.log(`Auth demo en http://localhost:${PORT}`));
