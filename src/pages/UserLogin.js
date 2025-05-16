import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import '../style.css';
import journalistImage from './images/bowl.jpeg';
import HeaderTwo from "../components/HeaderTwo";

const UserLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
if (credentials.email !== "" && credentials.password !== "") {
        navigate('/');
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ أثناء محاولة تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className='container mt-4 mb-4'>
      <HeaderTwo links={[
        { label: 'الصفحة الرئيسية', href: '/' },
        { label: 'تسجيل دخول', href: '#' }
      ]} />
      
      <motion.div 
        className="login-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="login-content">
          {/* Logo/Brand */}
          <motion.div 
            className="brand-logo"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <h2>
              لمحة<span style={{color:'#0d9488'}}> NEWS</span>
            </h2>
          </motion.div>

          {/* Login Card */}
          <motion.div 
            className="login-card"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="login-header">
              <motion.h2 
                className="login-title"
                whileHover={{ x: 5 }}
              >
                تسجيل دخول للمستخدمين
              </motion.h2>
              <p className="login-subtitle">الرجاء إدخال البيانات الخاصة بك</p>
            </div>

            {error && (
              <motion.div 
                className="error-message"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <motion.div 
                className="form-group"
                variants={itemVariants}
              >
                <label htmlFor="email">البريد الإلكتروني:</label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  placeholder="أدخل بريدك الإلكتروني"
                  whileFocus={{ 
                    borderColor: '#0d9488',
                    boxShadow: '0 0 0 2px rgba(13, 148, 136, 0.2)'
                  }}
                />
              </motion.div>

              <motion.div 
                className="form-group"
                variants={itemVariants}
              >
                <label htmlFor="password">كلمة المرور:</label>
                <motion.input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  placeholder="أدخل كلمة المرور"
                  whileFocus={{ 
                    borderColor: '#0d9488',
                    boxShadow: '0 0 0 2px rgba(13, 148, 136, 0.2)'
                  }}
                />
              </motion.div>

              <motion.div 
                className="form-options"
                variants={itemVariants}
              >
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">تذكرني</label>
                </div>
                <a href="/forgot-password" className="forgot-password">
                  نسيت كلمة المرور؟
                </a>
              </motion.div>

              <motion.button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                {isLoading ? (
                  <span className="spinner"></span>
                ) : 'تسجيل الدخول'}
              </motion.button>
            </form>

            <motion.div 
              className="login-footer"
              variants={itemVariants}
            >
              <p>
                ليس لديك حساب؟ <a href="/user-signup" className="signup-link">سجل الآن</a>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Image */}
        <div className="login-background"></div>
      </motion.div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          padding: 0 15px;
        }
        
        .login-container {
          display: flex;
          min-height: 70vh;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        
        .login-content {
          flex: 1;
          padding: 40px;
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 2;
        }
        
        .brand-logo {
          text-align: center;
          margin-bottom: 30px;
          font-size: 2rem;
          font-weight: bold;
          color: #333;
        }
        
        .login-card {
          max-width: 450px;
          margin: 0 auto;
          width: 100%;
        }
        
        .login-header {
          text-align: right;
          margin-bottom: 30px;
        }
        
        .login-title {
          color: #2d3748;
          font-size: 1.8rem;
          margin-bottom: 10px;
          font-weight: 700;
        }
        
        .login-subtitle {
          color: #718096;
          font-size: 1rem;
        }
        
        .login-form {
          display: flex;
          flex-direction: column;
        }
        
        .form-group {
          margin-bottom: 25px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #4a5568;
          font-weight: 500;
          font-size: 0.95rem;
          text-align: right;
        }
        
        .form-group input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s;
          background: #f8fafc;
          text-align: right;
        }
        
        .form-group input:focus {
          outline: none;
          background: white;
        }
        
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }
        
        .remember-me {
          display: flex;
          align-items: center;
        }
        
        .remember-me input {
          margin-left: 8px;
        }
        
        .remember-me label {
          color: #4a5568;
          font-size: 0.9rem;
        }
        
        .forgot-password {
          color: #0d9488;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.3s;
        }
        
        .forgot-password:hover {
          color: #0b8377;
          text-decoration: underline;
        }
        
        .login-button {
          background-color: #0d9488;
          color: white;
          padding: 15px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .login-button:hover {
          background-color: #0b8377;
        }
        
        .login-button:disabled {
          background-color: #a0aec0;
          cursor: not-allowed;
        }
        
        .spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .login-footer {
          text-align: center;
          margin-top: 20px;
        }
        
        .login-footer p {
          color: #718096;
          font-size: 0.95rem;
        }
        
        .signup-link {
          color: #0d9488;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s;
        }
        
        .signup-link:hover {
          color: #0b8377;
          text-decoration: underline;
        }
        
        .error-message {
          color: #e53e3e;
          background-color: #fff5f5;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          border: 1px solid #fed7d7;
          font-size: 0.9rem;
        }
        
        .login-background {
          flex: 1;
          background: url(${journalistImage}) center/cover no-repeat;
          position: relative;
        }
        
        .login-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(13, 148, 136, 0.1) 0%, rgba(13, 148, 136, 0.3) 100%);
        }
        
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }
          
          .login-content {
            padding: 30px 20px;
          }
          
          .login-background {
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserLogin;