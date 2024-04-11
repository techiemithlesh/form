const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

router.post('/submit/enquiry', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            countryCode,
            phoneNumber,
            aboutUs,
            averageSpend,
            ceo,
            companyAddress,
            companyName,
            companyRegisterNumber,
            currency,
            paymentMethod,
            selectedPlatforms
        } = req.body;

        // Create a new enquiry instance using the FormData model
        const newEnquiry = new Enquiry({
            firstName,
            lastName,
            email,
            countryCode,
            phoneNumber,
            aboutUs,
            averageSpend,
            ceo,
            companyAddress,
            companyName,
            companyRegisterNumber,
            currency,
            paymentMethod,
            selectedPlatforms
        });

        // Save the new enquiry document to the database
        await newEnquiry.save();

        // Respond with success message
        res.status(201).json({ message: 'Enquiry submitted successfully', enquiry: newEnquiry });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Endpoint for fetching all enquiries
router.get('/all/enquiry', async (req, res) => {
    try {
        // Fetch all enquiries from the database
        const enquiries = await Enquiry.find();

        // Respond with the list of enquiries
        res.status(200).json({ enquiries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Endpoint for fetching an enquiry by ID
router.get('/enquiry/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the enquiry by ID from the database
        const enquiry = await Enquiry.findById(id);

        // If enquiry is not found, respond with 404
        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }

        // Respond with the enquiry
        res.status(200).json({ enquiry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Endpoint for deleting an enquiry by ID
router.delete('/enquiry/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the enquiry by ID from the database
        await Enquiry.findByIdAndDelete(id);

        // Respond with success message
        res.status(200).json({ message: 'Enquiry deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
