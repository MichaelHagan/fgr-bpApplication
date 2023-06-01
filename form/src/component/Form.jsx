import React, { useState } from "react";
import back from "../assets/back.jfif";

const Form = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [file, setFile] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [fileError, setFileError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phoneNumber", phoneNumber);
      formData.append("file", file);

      // Make your API call here using fetch or axios
      fetch("https://fgrbpresume.onrender.com/applications", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the API
          console.log("Response:", data);
        })
        .catch((error) => {
          // Handle any errors that occurred during the API call
          console.error("Error:", error);
        });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(false);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setPhoneNumberError(false);
  };

  const validateForm = () => {
    let isValid = true;

    if (name.trim() === "") {
      setNameError(true);
      isValid = false;
    }

    if (phoneNumber.trim() === "") {
      setPhoneNumberError(true);
      isValid = false;
    }
    if (!file) {
      setFileError(true);
      isValid = false;
    }

    return isValid;
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${back})` }}
    >
      <div className="w-[50%] p-[50px] shadow">
        <h2 className="text-[26px] font-bold text-uppercase text-center mb-5">
          Upload CV Here
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-lg font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full border ${
                nameError ? "border-red-500" : "border-blue-500"
              } rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={name}
              onChange={handleNameChange}
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1">
                Please enter your name.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="text-lg font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className={`w-full border ${
                phoneNumberError ? "border-red-500" : "border-blue-500"
              } rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            {phoneNumberError && (
              <p className="text-red-500 text-sm mt-1">
                Please enter your phone number.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="file" className="text-lg font-medium text-gray-700">
              File Upload
            </label>
            <input
              type="file"
              id="file"
              className="mt-2"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {fileError && (
              <p className="text-red-500 text-sm mt-1">
                Please upload your cv.
              </p>
            )}
          </div>

          <div className="flex flex-row-reverse text-[blue] cursor-pointer">
            Click here to access the admin panel
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
