import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewsList = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([
    {
      id: 1,
      category: "الرياضة",
      title: "1500 شرطي لحماية مباراة فريق سنة المزيد...",
      author: "محمد أحمد",
      content: "سيتم نشر المزيد من التفاصيل قريباً...",
      image: ""
    },
    {
      id: 2,
      category: "الصحة",
      title: "نصائح للتغلب على الصداع بدون أدوية",
      author: "د. علي محمد",
      content: "تشير الدكتورة أنا تربيخوفاً أخصائية طب الأعصاب...",
      image: ""
    }
  ]);

  const [newsToDelete, setNewsToDelete] = useState(null);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    setNewsToDelete(id);
  };

  const confirmDelete = () => {
    setNews(news.filter(item => item.id !== newsToDelete));
    setNewsToDelete(null);
  };

  const cancelDelete = () => {
    setNewsToDelete(null);
  };

  return (
    <div className="container mt-5">
      
    <div className="mb-4">
    <p>مرحبا علي! Ali@gmail.com</p>
  </div>
      <div className="d-flex justify-content-between mb-5">
        <div className="search-box" style={{ width: '300px' }}>
          <input 
            type="text" 
            placeholder="ادخل كلمة البحث" 
            className="form-control"
          />
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/add-news')}
        >
          إضافة خبر جديد
        </button>
      </div>


      {news.map(item => (
        <div key={item.id} className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <span className="badge bg-primary">{item.category}</span>
              <div>
                <button 
                  className="btn btn-sm btn-outline-success mx-1"
                  onClick={() => handleEdit(item.id)}
                >
                  تعديل
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  حذف
                </button>
              </div>
            </div>
            <h5 className="card-title mt-2">{item.title}</h5>
            <p className="card-text">{item.content.substring(0, 100)}...</p>
          </div>
        </div>
      ))}

      {/* نافذة تأكيد الحذف */}
      {newsToDelete && (
        <div className="modal-backdrop show">
          <div className="modal d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">تأكيد الحذف</h5>
                </div>
                <div className="modal-body">
                  <p>هل أنت متأكد من رغبتك في حذف هذا الخبر؟</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={cancelDelete}>
                    إلغاء
                  </button>
                  <button className="btn btn-danger" onClick={confirmDelete}>
                    تأكيد الحذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsList;