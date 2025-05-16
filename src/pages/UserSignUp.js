import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import journalistImage from './images/bowl.jpeg';
import HeaderTwo from "../components/HeaderTwo";

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const arabicNameRegex = /^[\u0600-\u06FF\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'الاسم الكامل مطلوب';
    } else if (!arabicNameRegex.test(formData.fullName)) {
      newErrors.fullName = 'يجب أن يحتوي الاسم على أحرف عربية فقط';
    }

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'بريد إلكتروني غير صالح';
    }

    if (!formData.phone) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'رقم هاتف غير صالح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      newErrors.password = 'يجب أن تكون كلمة المرور 8 أحرف على الأقل';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'يرجى تأكيد كلمة المرور';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    console.log('تم إرسال البيانات:', formData);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  // Animations
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
        { label: 'إنشاء حساب', href: '#' }
      ]} />

      <motion.div
        className="login-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="login-content">
          <motion.div
            className="brand-logo"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <h2>لمحة<span style={{ color: '#0d9488' }}> NEWS</span></h2>
          </motion.div>

          <motion.div className="login-card" variants={itemVariants}>
            <motion.h2 className="login-title" whileHover={{ x: 5 }}>
              إنشاء حساب مستخدم جديد
            </motion.h2>
            <p className="login-subtitle">يرجى تعبئة البيانات المطلوبة</p>

            <form onSubmit={handleSubmit} className="login-form">
              {['fullName', 'email', 'phone', 'password', 'confirmPassword'].map((field, index) => (
                <motion.div key={field} className="form-group" variants={itemVariants}>
                  <label htmlFor={field}>
                    {{
                      fullName: 'الاسم الكامل:',
                      email: 'البريد الإلكتروني:',
                      phone: 'رقم الهاتف:',
                      password: 'كلمة المرور:',
                      confirmPassword: 'تأكيد كلمة المرور:'
                    }[field]}
                  </label>
                  <motion.input
                    id={field}
                    type={field.includes('password') ? 'password' : (field === 'email' ? 'email' : 'text')}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={{
                      fullName: 'أدخل اسمك الكامل',
                      email: 'أدخل بريدك الإلكتروني',
                      phone: 'أدخل رقم هاتفك',
                      password: 'أدخل كلمة المرور',
                      confirmPassword: 'أعد كتابة كلمة المرور'
                    }[field]}
                    className={errors[field] ? 'error' : ''}
                    whileFocus={{
                      borderColor: '#0d9488',
                      boxShadow: '0 0 0 2px rgba(13, 148, 136, 0.2)'
                    }}
                  />
                  {errors[field] && <span className="error-message">{errors[field]}</span>}
                </motion.div>
              ))}

              <motion.button
                type="submit"
                className="login-button"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                {isSubmitting ? 'جاري التسجيل...' : 'تسجيل الحساب'}
              </motion.button>

              <motion.div className="login-footer" variants={itemVariants}>
                <p>هل لديك حساب بالفعل؟ <Link to="/user-login" className="signup-link">سجّل الدخول هنا</Link></p>
              </motion.div>
            </form>
          </motion.div>
        </div>

        <div className="login-background"></div>
      </motion.div>

      {/* CSS inline نفس تسجيل الدخول */}
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

        .login-title {
          text-align: right;
          color: #2d3748;
          font-size: 1.8rem;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .login-subtitle {
          text-align: right;
          color: #718096;
          font-size: 1rem;
          margin-bottom: 30px;
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

        .form-group input.error {
          border-color: #e53e3e;
        }

        .error-message {
          color: #e53e3e;
          font-size: 0.85rem;
          margin-top: 5px;
          text-align: right;
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
        }

        .login-button:disabled {
          background-color: #a0aec0;
          cursor: not-allowed;
        }

        .login-footer {
          text-align: center;
          margin-top: 20px;
        }

        .signup-link {
          color: #0d9488;
          text-decoration: none;
          font-weight: 600;
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

export default UserSignUp;
