import React, { useState, useEffect } from 'react';

interface FormData {
  logoUrl: string;
  companyName: string;
  isNew: boolean;
  isFeatured: boolean;
  position: string;
  jobType: string;
  location: string;
  skills: string[];
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    logoUrl: '',
    companyName: '',
    isNew: false,
    isFeatured: false,
    position: '',
    jobType: '',
    location: '',
    skills: []
  });

  const [savedData, setSavedData] = useState<FormData[]>(() => {
    // LocalStorage'dan ma'lumotlarni olish (agar mavjud bo'lsa)
    const storedData = localStorage.getItem('jobCards');
    return storedData ? JSON.parse(storedData) : [];
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prevData => {
      const skills = prevData.skills.includes(value)
        ? prevData.skills.filter(skill => skill !== value)
        : [...prevData.skills, value];
      return { ...prevData, skills };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Yangi cardni savedData'ga qo'shish
    const newSavedData = [...savedData, formData];
    setSavedData(newSavedData);
    localStorage.setItem('jobCards', JSON.stringify(newSavedData)); // localStorage'ga saqlash
    setFormData({
      logoUrl: '',
      companyName: '',
      isNew: false,
      isFeatured: false,
      position: '',
      jobType: '',
      location: '',
      skills: []
    }); // Formani tozalash
  };

  const handleRemove = (index: number) => {
    const updatedData = savedData.filter((_, i) => i !== index);
    setSavedData(updatedData);
    localStorage.setItem('jobCards', JSON.stringify(updatedData)); // O'chirilgan cardni localStorage'dan ham olib tashlash
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Ish Bo'shlig'i Formasi</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Logotip URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Logotip URL:</label>
            <input
              type="text"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Kompaniya nomi:</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleChange}
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Yangi</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Featured</span>
            </label>
          </div>

          {/* Lavozim */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Lavozim:</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Tanlang</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ish turi:</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Tanlang</option>
              <option value="full-time">To'liq stavka</option>
              <option value="part-time">Yarim stavka</option>
              <option value="contract">Shartnoma asosida</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Joylashuv:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ko'nikmalar:</label>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Python"
                  checked={formData.skills.includes("Python")}
                  onChange={handleSkillsChange}
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2 text-gray-700">Python</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="JavaScript"
                  checked={formData.skills.includes("JavaScript")}
                  onChange={handleSkillsChange}
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2 text-gray-700">JavaScript</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="React"
                  checked={formData.skills.includes("React")}
                  onChange={handleSkillsChange}
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2 text-gray-700">React</span>
              </label>
            </div>
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Saqlash
          </button>
        </form>

        {/* Saqlangan ma'lumotlarni chiqarish */}
        <div className="mt-8 space-y-4">
          {savedData.map((data, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-md">
              {data.logoUrl && (
                <img
                  src={data.logoUrl}
                  alt="Logotip"
                  className="mt-4 mb-4 w-32 h-32 object-contain rounded-md border border-gray-200"
                />
              )}
              <p className="text-gray-700"><strong>Kompaniya nomi:</strong> {data.companyName}</p>
              <p className="text-gray-700"><strong>Yangi:</strong> {data.isNew ? "Ha" : "Yo'q"}</p>
              <p className="text-gray-700"><strong>Featured:</strong> {data.isFeatured ? "Ha" : "Yo'q"}</p>
              <p className="text-gray-700"><strong>Lavozim:</strong> {data.position}</p>
              <p className="text-gray-700"><strong>Ish turi:</strong> {data.jobType}</p>
              <p className="text-gray-700"><strong>Joylashuv:</strong> {data.location}</p>
              <p className="text-gray-700"><strong>Ko'nikmalar:</strong> {data.skills.join(", ")}</p>
              <button 
                onClick={() => handleRemove(index)} 
                className="mt-2 text-red-600 hover:text-red-800"
              >
                O'chirish
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
