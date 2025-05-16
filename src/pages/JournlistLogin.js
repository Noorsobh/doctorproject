import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import VerificationPage from './VerificationPage';

const JournlistLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!credentials.email.trim()) return setError("البريد الإلكتروني مطلوب"), false;
    if (!credentials.password.trim()) return setError("كلمة المرور مطلوبة"), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) return setError("البريد الإلكتروني غير صالح"), false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
if (credentials.email !== "" && credentials.password !== "") {
        navigate("/add-news");
      } else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }
    } catch {
      setError("حدث خطأ أثناء محاولة تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/journalist-signup");
    }, 800);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="row g-0 w-100 shadow-lg rounded-4 overflow-hidden"
        style={{ maxWidth: "1200px", backgroundColor: "white" }}
      >
        {/* الواجهة اليسار - فقط في الشاشات الكبيرة */}
        <div
          className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5"
          style={{
            background: "linear-gradient(135deg, #0d9488 0%, #065f53 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-white"
          >
            <h2 className="display-4 fw-bold mb-4">مرحبا بك في موقعنا</h2>
            <p className="fs-3 mb-5">ليس لديك حساب؟</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignupClick}
              className="btn btn-outline-light btn-lg px-5 rounded-3 position-relative"
              style={{
                borderWidth: "2px",
                overflow: "hidden",
                height: "50px",
                width: "200px",
              }}
            >
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: isTransitioning ? 0 : 1 }}
                className="position-absolute start-0 end-0"
                style={{ top: "7px" }}
              >
                سجل الآن
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isTransitioning ? 1 : 0 }}
                className="position-absolute start-0 end-0"
                style={{ top: "7px" }}
              >
                جارٍ التوجيه...
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        {/* الفورم */}
        <div className="col-lg-6 p-4 p-md-5 bg-white">
          <div className="h-100 d-flex flex-column justify-content-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-4"
            >
              <h2 className="fw-bold text-dark mb-2">تسجيل الدخول للصحفيين</h2>
              <p className="text-muted">الرجاء إدخال بيانات الاعتماد الخاصة بك</p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="alert alert-danger text-center"
              >
                {error}
              </motion.div>
            )}

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onSubmit={handleSubmit}
              className="mt-3"
            >
              <div className="mb-4">
                <label htmlFor="email" className="form-label fw-semibold">البريد الإلكتروني:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  placeholder="أدخل بريدك الإلكتروني"
                  className="form-control form-control-lg py-3"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold">كلمة المرور:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  placeholder="أدخل كلمة المرور"
                  className="form-control form-control-lg py-3"
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check d-flex align-items-center gap-2" dir="rtl">
                  <input type="checkbox" id="remember" className="form-check-input" />
                  <label htmlFor="remember" className="form-check-label">تذكرني</label>
                </div>
                
                <a href="/email" className="text-decoration-none" style={{ color: "#4c8565" }}>
                نسيت كلمة المرور؟
              </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn btn-lg w-100 py-3"
                disabled={isLoading}
                style={{ backgroundColor: "#4c8565", color: "white" }}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    جاري تسجيل الدخول...
                  </>
                ) : "تسجيل الدخول"}
              </motion.button>
            </motion.form>

            {/* 🔽 زر خاص بالشاشات الصغيرة */}
            <div className="text-center mt-4 d-block d-lg-none">
              <p className="mb-2">ليس لديك حساب؟</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignupClick}
                className="btn btn-outline-success px-4 py-2 rounded-pill fw-semibold"
              >
                {isTransitioning ? "جارٍ التوجيه..." : "سجل الآن"}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JournlistLogin;
