import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const JournlistSignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    pressCard: '',
    specialization: 'general'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const arabicNameRegex = /^[\u0600-\u06FF\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const pressCardRegex = /^[a-zA-Z0-9]{6,20}$/;

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
      newErrors.phone = 'رقم هاتف غير صالح (يجب أن يكون بين 10-15 رقمًا)';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('تم إرسال البيانات:', formData);
    setIsSubmitting(false);
    navigate('/add-news');
  };

  const handleLoginClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/Journlist-login');
    }, 800);
  };

  const specializations = [
    { value: 'general', label: 'صحافة عامة' },
    { value: 'politics', label: 'السياسة' },
    { value: 'sports', label: 'الرياضة' },
    { value: 'economy', label: 'الاقتصاد' },
    { value: 'culture', label: 'الثقافة والفنون' },
    { value: 'technology', label: 'التكنولوجيا' }
  ];
    const regions = [
    { value: "gaza", label: " غزة" },
    { value: "eygpt", label: "مصر" },
    { value: "soria", label: "سوريا" },
  ];


  return (
    <div className='container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='row g-0 w-100 shadow-lg rounded-4 overflow-hidden'
        style={{ maxWidth: '1200px', backgroundColor: 'white' }}
      >
        {/* Left - Form */}
        <div className='col-lg-6 p-4 p-md-5'>
          <div className="h-100 d-flex flex-column justify-content-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-4"
            >
              <h2 className="fw-bold text-dark mb-2">تسجيل حساب صحفي جديد</h2>
              <p className="text-muted">الرجاء إدخال بياناتك الشخصية</p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSubmit}
              className="mt-3"
            >
              {/* الاسم */}
              <div className="mb-3">
                <label className="form-label fw-semibold">الاسم الكامل:</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="الاسم الكامل"
                  className={`form-control form-control-lg ${errors.fullName && 'is-invalid'}`}
                />
                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
              </div>

              {/* البريد */}
              <div className="mb-3">
                <label className="form-label fw-semibold">البريد الإلكتروني:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="البريد الإلكتروني"
                  className={`form-control form-control-lg ${errors.email && 'is-invalid'}`}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* الهاتف */}
              <div className="mb-3">
                <label className="form-label fw-semibold">رقم الهاتف:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="رقم الهاتف"
                  className={`form-control form-control-lg ${errors.phone && 'is-invalid'}`}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>

              {/* كلمة المرور */}
              <div className="mb-3">
                <label className="form-label fw-semibold">كلمة المرور:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="كلمة المرور"
                  className={`form-control form-control-lg ${errors.password && 'is-invalid'}`}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              {/* تأكيد كلمة المرور */}
              <div className="mb-3">
                <label className="form-label fw-semibold">تأكيد كلمة المرور:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="تأكيد كلمة المرور"
                  className={`form-control form-control-lg ${errors.confirmPassword && 'is-invalid'}`}
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>

                {/* المنطقة */}
              <div className="mb-4">
                <label className="form-label fw-semibold">المنطقة:</label>
                <select
  name="regionId"
  value={formData.regionId}
  onChange={handleChange}
  className="form-select form-select-lg"
>
  {regions.map((region) => (
    <option key={region.value} value={region.value}>
      {region.label}
    </option>
  ))}
</select>

              </div>

              {/* التخصص */}
              <div className="mb-4">
                <label className="form-label fw-semibold">التخصص:</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="form-select form-select-lg"
                >
                  {specializations.map((spec) => (
                    <option key={spec.value} value={spec.value}>{spec.label}</option>
                  ))}
                </select>
              </div>

              {/* زر التسجيل */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="btn btn-lg w-100 py-3"
                style={{ backgroundColor: '#4c8565', color: 'white' }}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    جاري التسجيل...
                  </>
                ) : 'تسجيل الحساب'}
              </motion.button>
            </motion.form>

            {/* 🔽 زر الجوال */}
            <div className="text-center mt-4 d-block d-lg-none">
              <p className="mb-2">هل لديك حساب بالفعل؟</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoginClick}
                className="btn btn-outline-success px-4 py-2 rounded-pill fw-semibold"
              >
                {isTransitioning ? "جارٍ التوجيه..." : "سجل الدخول"}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className='col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5'
          style={{
            background: 'linear-gradient(135deg, #0d9488 0%, #065f53 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="display-4 fw-bold mb-4">مرحبا بك في موقعنا</h2>
            <p className="fs-3 mb-5">لديك حساب بالفعل؟</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoginClick}
              className="btn btn-outline-light btn-lg px-5 rounded-3 position-relative"
              style={{ borderWidth: '2px', overflow: 'hidden', height: '50px', width: '200px' }}
            >
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: isTransitioning ? 0 : 1 }}
                className="position-absolute start-0 end-0"
                style={{ top: '7px' }}
              >
                سجل الدخول
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isTransitioning ? 1 : 0 }}
                className="position-absolute start-0 end-0"
                style={{ top: '7px' }}
              >
                جارٍ التوجيه...
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default JournlistSignUp;
