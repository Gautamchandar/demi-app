import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/"); 
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Card */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={styles.card}
      >
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Please enter your details to sign in.</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            style={styles.button}
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

// CSS-in-JS Styles
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Deep purple gradient
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    padding: "50px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    margin: "0 0 10px 0",
    color: "#333",
    fontSize: "28px",
  },
  subtitle: {
    color: "#666",
    marginBottom: "30px",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    boxSizing: "border-box",
    outline: "none",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#764ba2",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  }
};

export default Login;