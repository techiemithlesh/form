const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    countryCode: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    aboutUs: {
        type: String
    },
    averageSpend: {
        type: String
    },
    ceo: {
        type: String
    },
    companyAddress: {
        type: String
    },
    companyName: {
        type: String
    },
    companyRegisterNumber: {
        type: String
    },
    currency: {
        type: String
    },
    selectedPlatforms: {
        type: [String], 
        default: [] 
    },
    paymentMethod: {
        type: String
    }
});

const Enquiry = mongoose.model('Enquiry', EnquirySchema);

module.exports = Enquiry;
