const express = require("express");
const bcrypt = require("bcrypt");
const jsonServer = require("json-server");
const cors = require("cors");
const fs = require("fs"); 

const app = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(express.json());
app.use(cors());

const DB_FILE = "db.json";

const readDB = () => {
  if (!fs.existsSync(DB_FILE)) return { users: [] };
  return JSON.parse(fs.readFileSync(DB_FILE));
};

const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// 🔑 Route d'inscription
app.post("/register", async (req, res) => {
  const { username, email, password, profil, avatar } = req.body;

  const users = router.db.get("users").value();
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({ message: "Utilisateur déjà existant" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    router.db
      .get("users")
      .push({ 
        id: Date.now(),
        username,
        email,
        password: hashedPassword,
        profil,  
        avatar, 
      })
      .write();

    return res
      .status(201)
      .json({ message: "Utilisateur enregistré avec succès" });
  } catch (error) {
    console.error("Erreur lors du hachage du mot de passe :", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// 🔑 Route de connexion
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const users = router.db.get("users").value();
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ message: "Identifiants incorrects" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Identifiants incorrects" });
  }

  return res.status(200).json({ message: "Connexion réussie", user });
});

// 🔑 Route d'affichage des utilisateurs
app.get("/api/users", (req, res) => {
  try {
    const db = readDB();
    res.status(200).json(db.users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs." });
  }
});

app.use("/api", router);

// Démarrer le serveur
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
