// import React from 'react';

// const AddBoardRoomForm = () => {
//     return (
//         <div id="add-boardroom" className="p-2 mb-52">
//             {/* write your code here */}
//             AddBoardroom
//         </div>
//     );
// };

// export default AddBoardRoomForm;

import React, { useState } from 'react';

const AddBoardroomForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    amenities: '',
    description: '',
    image: null,
    imagePreview: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: file,
        imagePreview: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <div className="bg-blue text-white text-center py-4 rounded-t-lg">
        <h1 className="text-2xl font-semibold">Add Boardroom</h1>
      </div>
      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700">Amenities</label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Image Preview</label>
              {formData.imagePreview && (
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="mt-1 w-full h-48 object-cover border border-gray-300 rounded-md"
                />
              )}
            </div>

            <div>
              <label className="block text-gray-700">Upload Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700">Brief Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBoardroomForm;

