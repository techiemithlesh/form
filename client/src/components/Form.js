import React, { useState } from "react";
import "./Form.css"
import { BsInfoCircleFill } from "react-icons/bs";

import { FaRegUser, FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { IoRocketOutline } from "react-icons/io5";

import google from "../Assets/img/google.png";
import tiktok from "../Assets/img/tiktok.png";
import meta from "../Assets/img/meta.png";
import logo from "../../src/Assets/img/voxizoLogo1.png";
import { GoDotFill } from "react-icons/go";
import profileImg from "../../src/Assets/img/natachaProfile.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ConfettiExplosion from 'react-confetti-explosion';


const Form = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currency, setCurrency] = useState("€");
  const [averageSpend, setAverageSpend] = useState("");

  const [submitFormMsg, setSubmitFormMsg] = useState(false);
  const [isExploding, setIsExploding] = useState(true);

  const handleSelectSocial = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(
        selectedPlatforms.filter((item) => item !== platform)
      );
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
    setFormData((prevData) => ({
      ...prevData,
      selectedPlatforms: selectedPlatforms.includes(platform)
        ? selectedPlatforms.filter((item) => item !== platform)
        : [...selectedPlatforms, platform],
    }));
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    companyName: "",
    ceo: "",
    companyRegisterNumber: "",
    companyAddress: "",
    averageSpend: "",
    paymentMethod: "",
    aboutUs: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    companyName: "",
    ceo: "",
    companyRegisterNumber: "",
    companyAddress: "",
    averageSpend: "",
    paymentMethod: "",
    aboutUs: "",
  });

  // form logic

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // tabs change logic

  const handleTabs = (index) => {
    setSelectedTabIndex(index);
  };

  // contact form logic

  const handleCountryChange = (e) => {
    const { value } = e.target;
    setCountryCode(value);
    setFormData((prevData) => ({
      ...prevData,
      countryCode: value,
    }));
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    setPhoneNumber(value);
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };

  // payment method
  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    setPaymentMethod(value);
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod: value,
    }));
  };

  // payment form logic
  const handleCurrencyChange = (e) => {
    const { value } = e.target;
    setCurrency(value);
    setFormData((prevData) => ({
      ...prevData,
      currency: value,
    }));
  };

  const handleAverageSpendChange = (e) => {
    const value = e.target.value.replace(/\D/, "");
    setAverageSpend(value);
    setFormData((prevData) => ({
      ...prevData,
      averageSpend: value,
    }));
  };

  // errror
  const validateForm = () => {
    let valid = true;
    let errors = {};

    // Validate first name
    if (!formData.firstName.trim()) {
      valid = false;
      errors.firstName = "First name is required";
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      valid = false;
      errors.lastName = "Last name is required";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      valid = false;
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      valid = false;
      errors.email = "Please enter a valid email address";
    }

    // Validate phone number
    if (!formData.phoneNumber.trim()) {
      valid = false;
      errors.phoneNumber = "Phone number is required";
    }

    if (selectedTabIndex === 1) {
      // validate company name
      if (!formData.companyName.trim()) {
        valid = false;
        errors.companyName = "Company name is required";
      }
      // Validate CEO name
      if (!formData.ceo.trim()) {
        valid = false;
        errors.ceo = "CEO name is required";
      }

      // Validate company registration number
      if (!formData.companyRegisterNumber.trim()) {
        valid = false;
        errors.companyRegisterNumber =
          "Company registration number is required";
      }

      // Validate company address
      if (!formData.companyAddress.trim()) {
        valid = false;
        errors.companyAddress = "Company address is required";
      }
    }

    if (selectedTabIndex === 2) {
      // Validate average spend
      if (!formData.averageSpend.trim()) {
        valid = false;
        errors.averageSpend = "Average spend is required";
      }

      // Validate payment method
      if (!formData.paymentMethod.trim()) {
        valid = false;
        errors.paymentMethod = "Payment method is required";
      }

      // Validate about us
      if (!formData.aboutUs.trim()) {
        valid = false;
        errors.aboutUs = "About us is required";
      }
    }

    setErrors(errors); // Update errors state

    return valid;
  };

  const handleSaveAndNext = () => {
    const isValid = validateForm();

    if (isValid) {
      if (selectedTabIndex === 0) {
        setSelectedTabIndex(1); // Move to the next tab (Company Details)
      } else if (selectedTabIndex === 1) {
        setSelectedTabIndex(2); // Move to the next tab (Payment Details)
      } else if (selectedTabIndex === 2) {
        // Submit the form if all sections are completed
        console.log("Form submitted successfully!");
      }
    }

    console.log(selectedTabIndex);
  };

  // const submitFormData = (e) => {
  //   e.preventDefault();

    // setSubmitFormMsg(!submitFormMsg);
  //   console.log(submitFormMsg);

  //   console.log("formdata", formData);
  // };

  const submitFormData = async (e) => {
    e.preventDefault();

    console.log("formdata", formData)

    try {
       
        const url = 'http://localhost:5000/api/user/submit/enquiry';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) 
        });

        
        if (response.ok) {
            const data = await response.json();
            console.log('Enquiry submitted successfully:', data);
            // toast.success("Enquiry Submitted Successfully", {
            //   position: "top-right",
            // });
    setSubmitFormMsg(!submitFormMsg);

        } else {
            console.error('Failed to submit enquiry:', response.statusText);
            
        }
    } catch (error) {
        console.error('Error submitting enquiry:', error.message);
       
    }
};


  return (
    <>
      <div
        className={`w-full ${
          submitFormMsg
            ? " h-[700px] md:h-[850px] lg:h-[900px]"
            : " h-[1600px] md:h-[1400px] lg:h-[900px]"
        }  h-[1600px] md:h-[1400px] lg:h-[900px] bg-[#F5F5F5] flex justify-center items-center`}
      >
        <div
          className={`conatiner w-[98%] md:w-[90%] lg:w-[80%] bg-white h-auto rounded-xl py-2 px-3 flex ${
            submitFormMsg ? " justify-center lg:w-[30%]" : "justify-between"
          } flex-col lg:flex-row`}
        >
          {/* left section start */}

          <div
            className={`h-auto w-full ${
              submitFormMsg ? " lg:w-full]" : "lg:w-[35%]"
            }  bg-[#F5F5F5] rounded-lg py-6 px-5`}
          >
            <div className=" flex justify-center pb-5 border-b border-black border-opacity-50 border-dotted w-full  ">
              <div className=" w-[30%] lg:w-[58%]">
                <img src={logo} alt="logo" className=" w-full" />
              </div>
            </div>

            {submitFormMsg ? (
              <div className="mb-8 mt-5 relative">
                <p className=" text-center font-medium">
                  Dear <span className="text-orange-400 font-bold text-[20px]">{formData.firstName}</span>  Thank you for completing the onboarding
                  form! Your cooperation is greatly appreciated. We're excited
                  to have you on board and look forward to providing exceptional
                  service.
                </p>
                {/* <img src={animation} alt="" className=" absolute top-[-10%] left-[20%]"/> */}
                <p className=" absolute top-[50%] left-[50%]">{isExploding && <ConfettiExplosion duration={3000} />}</p>

              </div>
            ) : (
              <div className="mb-8 mt-5">
                <p className=" text-center font-medium">
                  Welcome to our onboarding process. To facilitate a smooth
                  transition and ensure we provide you with the best service
                  possible, we kindly ask you to complete the following form.
                  Once submitted, we will proceed with onboarding you into our
                  WhatsApp group where you'll receive additional information
                  about our services.
                </p>
              </div>
            )}

            <div className=" flex justify-center flex-col items-center">
              <div className=" border-4  w-[110px] h-[110px] rounded-full flex justify-center items-center px-[.5] py-[.5]">
                <img src={profileImg} alt="profileImg" />
              </div>
              <div className="mt-3">
                <p className=" text-center font-semibold text-2xl ">
                  Tsiky Natacha
                </p>

                <p className="flex items-center text-green-500 justify-center ">
                  <GoDotFill className=" text-green-500 mt-1" size={12} />{" "}
                  online
                </p>
                <p className=" font-medium text-center">Success Manager</p>
                <p className=" font-medium text-center">Voxizo Media Limited</p>

                <div className=" flex gap-3 justify-center mt-3 ">
                  <div className=" border-2 px-2 py-2 rounded-xl bg-white cursor-pointer">
                    <a href="https://wa.me/+261329026430">
                      <FaWhatsapp size={25} className=" text-orange-400" />
                    </a>
                  </div>
                  <div className=" border-2 px-2 py-2 rounded-xl bg-white cursor-pointer">
                    <a href="mailto:support@voxizo.com">
                    <MdOutlineMail size={25} className=" text-orange-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right section */}

          {submitFormMsg ? (
            ""
          ) : (
            <div className=" w-full lg:w-[64%] px-2 sm:px-5 lg:px-10 pb-5">
              <h2 className=" text-center font-semibold  mt-3 text-3xl">
                Onboarding Form
              </h2>
              <div className=" flex justify-between mb-10 mt-5 pb-5 border-2 px-3 py-4 rounded-lg md:rounded-full flex-col md:flex-row gap-3">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => handleTabs(0)}
                >
                  <div
                    className={`h-[45px] rounded-[50%] border-2 px-2 py-2 ${
                      selectedTabIndex === 0 ? "bg-orange-400" : "bg-black"
                    } `}
                  >
                    <FaRegUser className=" text-white" size={25} />
                  </div>
                  <div>
                    <p>Step 1/3</p>
                    <p className="font-semibold text-[13px]">Contact Details</p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => handleTabs(1)}
                >
                  <div
                    className={`h-[45px] rounded-[50%] border-2 px-2 py-2 ${
                      selectedTabIndex === 1 ? "bg-orange-400" : "bg-black"
                    } `}
                  >
                    <AiOutlineDollar className="text-white" size={25} />
                  </div>
                  <div>
                    <p>Step 2/3</p>
                    <p className="font-semibold text-[13px]">Company Details</p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => handleTabs(2)}
                >
                  <div
                    className={`h-[45px] rounded-[50%] border-2 px-2 py-2 ${
                      selectedTabIndex === 2 ? "bg-orange-400" : "bg-black"
                    } `}
                  >
                    <IoRocketOutline className="text-white" size={25} />
                  </div>
                  <div>
                    <p>Step 3/3</p>
                    <p className="font-semibold text-[13px]">Voxizo Planning</p>
                  </div>
                </div>
              </div>

              {/* contact form start*/}

              {selectedTabIndex === 0 && (
                <div>
                  <div>
                    <h2 className="mb-3 text-[24px] font-intrument font-medium">
                      Let's Start with your details
                    </h2>
                    <p className="mb-3 text-[12px] md:text-[16px]">
                      Please fill the fields below with your contact details.
                    </p>
                  </div>

                  <form>
                    <div className="grid gap-6 mb-6 lg:grid-cols-2">
                      {/* First Name input */}
                      <div>
                        <label
                          htmlFor="first_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-intrument"
                        >
                          First Name <span className=" text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="John"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleFormChange}
                        />
                        {errors.firstName && (
                          <span className="text-red-500">
                            {errors.firstName}
                          </span>
                        )}
                      </div>
                      {/* Last Name input */}
                      <div>
                        <label
                          htmlFor="last_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-intrument"
                        >
                          Last name <span className=" text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Doe"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleFormChange}
                        />
                        {errors.lastName && (
                          <span className="text-red-500">
                            {errors.lastName}
                          </span>
                        )}
                      </div>
                      {/* Email input */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-intrument">
                          Email <span className=" text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="john.doe@company.com"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                        />
                        {errors.email && (
                          <span className="text-red-500">{errors.email}</span>
                        )}
                      </div>
                      {/* Phone number input */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-intrument">
                          Phone or WhatsApp number{" "}
                          <span className=" text-red-500">*</span>
                        </label>
                        {/* Country code dropdown */}

                        <div className="flex">
                          
                          <PhoneInput
                            country={"in"}
                            inputStyle={{ width: "80px", border:"none"}}
                          />
                          {/* Phone number input */}
                          <input
                            type="tel"
                            id="phone"
                            className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="123-45-678"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            required=""
                          />
                        </div>
                        {errors.phoneNumber && (
                          <span className="text-red-500">
                            {errors.phoneNumber}
                          </span>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* contact form end */}

              {/* Company form start */}

              {selectedTabIndex === 1 && (
                <div>
                  <div>
                    <h2 className=" mb-3 text-[16px] sm:text-[20px] md:text-[24px] font-intrument font-medium ">
                      Provide Your Company Information
                    </h2>
                    <p className="mb-3 text-[12px] md:text-[16px]">
                      Please fill the fields below with your company details.
                    </p>
                  </div>

                  <form>
                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-intrument">
                        Company Name <span className=" text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Voxizo Company"
                        required=""
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleFormChange}
                      />
                      <span className=" text-[12px] flex items-center pt-2 ">
                        <BsInfoCircleFill />{" "}
                        <p>
                          This Should match the name on the bank account you're
                          sending fund from!
                        </p>
                      </span>{" "}
                      <br />
                      {errors.companyName && (
                        <span className="text-red-500">
                          {errors.companyName}
                        </span>
                      )}
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-intrument">
                        CEO or Founder's Full Name{" "}
                        <span className=" text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John smith"
                        name="ceo"
                        value={formData.ceo}
                        onChange={handleFormChange}
                      />
                      {errors.ceo && (
                        <span className="text-red-500">{errors.ceo}</span>
                      )}
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Company or Business Registration Number{" "}
                        <span className=" text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="123-45-678"
                        name="companyRegisterNumber"
                        value={formData.companyRegisterNumber}
                        onChange={handleFormChange}
                      />
                      {errors.companyRegisterNumber && (
                        <span className="text-red-500">
                          {errors.companyRegisterNumber}
                        </span>
                      )}
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Company Address <span className=" text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Sydney ,Austrailia, 2000"
                        required=""
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleFormChange}
                      />
                      {errors.companyAddress && (
                        <span className="text-red-500">
                          {errors.companyAddress}
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              )}
              {/* comapany form end */}

              {/* payment start */}
              {selectedTabIndex === 2 && (
                <div>
                  <div>
                    <h2 className="mb-3 text-[20px] lg:text-[24px] font-intrument font-medium">
                      Which Platform do you need an ad account for?
                    </h2>
                  </div>

                  <div className="flex gap-5 mt-8 mb-8 items-center sm:flex-row ">
                    <div
                      className={`border-2 px-2 sm:px-6 py-2 rounded-lg cursor-pointer w-[60%] sm:w-1/3 hover:bg-[#ebeaea] transition-all ${
                        selectedPlatforms.includes("META")
                          ? "border-green-500"
                          : ""
                      }`}
                      onClick={() => handleSelectSocial("META")}
                    >
                      <div className="flex justify-center">
                        <img
                          src={meta}
                          alt=""
                          className=" w-[30%] sm:w-[50%]"
                        />
                      </div>
                      <div className="font-bold text-[14px] lg:text-1xl xl:text-2xl mt-3 text-center">
                        META
                      </div>
                    </div>

                    <div
                      className={`border-2 px-2 sm:px-6 py-2 rounded-lg cursor-pointer w-[60%] sm:w-1/3 hover:bg-[#ebeaea] transition-all ${
                        selectedPlatforms.includes("GOOGLE")
                          ? "border-green-500"
                          : ""
                      }`}
                      onClick={() => handleSelectSocial("GOOGLE")}
                    >
                      <div className="flex justify-center">
                        <img
                          src={google}
                          alt=""
                          className="w-[30%] sm:w-[50%]"
                        />
                      </div>
                      <div className="font-bold text-[14px] lg:text-1xl xl:text-2xl mt-3 text-center">
                        GOOGLE
                      </div>
                    </div>

                    <div
                      className={`border-2 px-2 sm:px-6 py-2 rounded-lg cursor-pointer w-[60%] sm:w-1/3 hover:bg-[#ebeaea] transition-all ${
                        selectedPlatforms.includes("TIKTOK")
                          ? "border-green-500"
                          : ""
                      }`}
                      onClick={() => handleSelectSocial("TIKTOK")}
                    >
                      <div className="flex justify-center">
                        <img
                          src={tiktok}
                          alt=""
                          className="w-[30%] sm:w-[50%]"
                        />
                      </div>
                      <div className="font-bold text-[14px] lg:text-1xl xl:text-2xl mt-3 text-center">
                        TIKTOK
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mb-5 flex-col sm:flex-row">
                    {/* Preferred Currency and Average Spend Per Month */}
                    <div>
                      <div>
                        <label
                          htmlFor="currency"
                          className="block mb-2 text-md font-semibold text-gray-900 dark:text-gray-300 font-intrument"
                        >
                          Preferred Currency
                        </label>
                      </div>
                      <div>
                        <select
                          id="currency"
                          className="border-2 border-black px-2 py-2 rounded-md w-full"
                          onChange={handleCurrencyChange}
                        >
                          <option value="€">EUR</option>
                          <option value="$">USD</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <div>
                        <label
                          htmlFor="average_spend"
                          className="block mb-2 text-md font-semibold text-gray-900 dark:text-gray-300 font-intrument"
                        >
                          Average Spend Per Month{" "}
                          <span className=" text-red-500">*</span>
                        </label>
                      </div>
                      <div className="flex">
                        <span className="border-t-2 border-b-2 border-l-2 px-2 py-2 rounded-l-md border-black">
                          {currency}
                        </span>
                        <input
                          type="text"
                          value={averageSpend}
                          onChange={handleAverageSpendChange}
                          className="border-t-2 border-b-2 border-r-2 px-2 py-2 rounded-r-md w-full border-black focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div>
                      <label
                        htmlFor="payment_method"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-gray-300 font-intrument"
                      >
                        Payment Method
                      </label>
                    </div>
                    <div>
                      {paymentMethod === "Other(please Specify)" ? (
                        <input
                          type="text"
                          className="border-2 px-2 py-2 rounded-md w-full mt-2 border-black"
                        />
                      ) : (
                        <select
                          id="payment_method"
                          className="border-2 px-2 py-2 rounded-md w-full border-black"
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handlePaymentMethodChange}
                        >
                          <option>EUR International Swift Transfer</option>
                          <option>EUR Local Transfer</option>
                          <option>USD International Swift Transfer</option>
                          <option>USD Local Transfer</option>
                          <option>Crypto - USDT</option>
                          <option>Paypal or Credit Card</option>
                          <option>Others (please Specify)</option>
                        </select>
                      )}
                    </div>
                  </div>

                  <div>
                    <h2 className=" text-[18px] font-intrument font-medium">
                      How did you find out about us?
                    </h2>
                    <input
                      type="text"
                      placeholder="Agency, Person Name"
                      className="border-2 px-2 py-2 rounded-md w-full mt-2 mb-3 border-black"
                      name="aboutUs"
                      value={formData.aboutUs}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
              )}
              {/* payment end */}

              <div className={`flex  ${selectedTabIndex === 0? "justify-center":"justify-between"}`}>
                {
                  selectedTabIndex === 0? "":  <div>
                  <button
                    type="submit"
                    className="text-black border-2  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Back
                  </button>
                </div>
                }
              
                <div>
                  {selectedTabIndex !== 2 && (
                    <button
                      type="button"
                      className="text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={handleSaveAndNext}
                    >
                      Next
                    </button>
                  )}
                  {selectedTabIndex === 2 && (
                    <button
                      type="button"
                      className="text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={submitFormData}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;