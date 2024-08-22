
const express = require('express');
const router = express.Router();
const Suggestion = require('../models/Suggestion.model');

router.post('/suggestions', async (req, res, next) => {
  try {
    const { age, comment } = req.body;
    const newSuggestion = await Suggestion.create({
      age,
      comment,
    });
    res.status(201).json(newSuggestion);
  } catch (error) {
    console.log('error placing suggention', error);
    next(error);
  }
});

router.get('/suggestions', async (req, res, next) => {
  try {
    const allSuggestions = await Suggestion.find();
    res.status(200).json(allSuggestions);
  } catch (error) {
    console - log('error fetching all suggestions', error);
    next(error);
  }
});

router.get('/suggestions/:suggestionID', async (req, res, next) => {
  try {
    const { suggestionID } = req.params;
    const singleSuggestion = await Suggestion.findById(suggestionID);
    res.status(200).json(singleSuggestion);
  } catch (error) {
    console.log('error getting sigle suggestion', error);
    next(error);
  }
});

router.delete('/suggestions/:suggestionID', async (req, res, next) => {
  try {
    const { suggestionID } = req.params;
    await Suggestion.findByIdAndDelete(suggestionID);
    res.status(204).json({message: 'suggestion deleted'})
  } catch (error) {
    console.log('error deleting suggestion', error);
    next(error);
  }
});

module.exports = router;
