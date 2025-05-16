import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddNewsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'الصحة',
    author: '',
    content: '',
    image: null
  });
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'العنوان مطلوب';
    if (!formData.author.trim()) newErrors.author = 'اسم الكاتب مطلوب';
    if (!formData.content.trim()) newErrors.content = 'المحتوى مطلوب';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('تم إرسال البيانات:', formData);
      navigate('/news-list');
    } else {
      console.log('يوجد أخطاء في النموذج');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const styles = {
    containers: {
      maxWidth: '800px',
      margin: '60px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      direction: 'rtl',
      border: '1px solid rgb(46 46 41 / 18%)'
    },
    welcomeSection: {
      marginBottom: '20px'
    },
    welcomeText: {
      fontSize: '30px',
      fontWeight: 'bold',
      margin: '5px 0'
    },
    emailText: {
      color: '#666',
      margin: '5px 0',
      fontSize: '16px',

    },
    addButtonContainer: {
      textAlign: 'left',
      marginBottom: '20px'
    },
    addButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px'
    },
    formGroup: {
      marginBottom: '20px',
      display: showForm ? 'block' : 'none'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      minHeight: '150px',
      resize: 'vertical'
    },
    error: {
      color: 'red',
      fontSize: '14px',
      marginTop: '5px'
    },
    buttonGroup: {
      display: showForm ? 'flex' : 'none',
      justifyContent: 'space-between',
      marginTop: '30px'
    },
    submitButton: {
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    cancelButton: {
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    formTitle: {
      textAlign: 'center',
      marginBottom: '30px',
      display: showForm ? 'block' : 'none'
    }
  };

  return (
    <div style={styles.containers} className="mx-auto">
      <div style={styles.welcomeSection}>
        <p style={styles.welcomeText}>مرحبا علي !</p>
        <p style={styles.emailText}>Ali@gmail.com</p>
      </div>

      <div style={styles.addButtonContainer}>
        <button onClick={toggleForm} style={styles.addButton}>
          {showForm ? 'إخفاء النموذج' : 'إضافة خبر جديد'}
        </button>
      </div>

      
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>عنوان الخبر *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ ...styles.input, borderColor: errors.title ? 'red' : '#ddd' }}
          />
          {errors.title && <div style={styles.error}>{errors.title}</div>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>التصنيف *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="الصحة">الصحة</option>
            <option value="الرياضة">الرياضة</option>
            <option value="الطقس">الطقس</option>
            <option value="الكوارث">الكوارث</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>اسم الكاتب *</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            style={{ ...styles.input, borderColor: errors.author ? 'red' : '#ddd' }}
          />
          {errors.author && <div style={styles.error}>{errors.author}</div>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>صورة أو فيديو</label>
          <input
            type="file"
            onChange={handleFileChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>محتوى الخبر *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            style={{ ...styles.textarea, borderColor: errors.content ? 'red' : '#ddd' }}
          />
          {errors.content && <div style={styles.error}>{errors.content}</div>}
        </div>

        <div style={styles.buttonGroup}>
          <button 
            type="button" 
            onClick={handleCancel}
            style={styles.cancelButton}
          >
            إلغاء
          </button>
          <button 
            type="submit" 
            style={styles.submitButton}
          >
            نشر الخبر
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewsForm;