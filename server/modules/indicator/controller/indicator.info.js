'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Mongoose Models

var mongoose = require('mongoose'),
	Indicator = mongoose.model('Indicator'),

//----------------------------------------------------------------------------------------------------------------------
// Controllers
	
	error = require('../../error'),
	logger = require('../../logger');

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * INDICATOR.INFO
 * - Get indicators as info object.
 */
exports.info = function(req, res) {
	logger.filename(__filename);

	Indicator.aggregate(
		[
			{$sort: {id: 1}},
			{$group: {
				_id: '$indicatorCategory',
				holisticCategory: {$first: '$holisticCategory'},
				guidingQuestion: {$first: '$guidingQuestion'},
				indicators: {$push: {id: '$id', scores: '$scores'}}
			}},
			{$group: {
				_id: '$holisticCategory',
				indicatorCategories: {$push: {
					indicatorCategory: '$_id',
					guidingQuestion: '$guidingQuestion',
					indicators: '$indicators'
				}}
			}},
			{$group: {
				_id: null,
				holisticCategories: {$push: {
					holisticCategory: '$_id',
					indicatorCategories: '$indicatorCategories'
				}}
			}}
		],
		function(err, results) {
			if (err) {
				err = new Error(err);
				error.log(err);
				return res.status(500).send(err);
			}
			if (!results || !results[0]) {
				err = new Error('!results || !results[0]');
				error.log(err);
				return res.status(500).send(err);
			}

			// sort indicator categories
			var info = results[0],
				holisticCategoryOrder = ['Task', 'Ladder'],
				taskIndicatorCategoryOrder = ['Task Clarity & Coherence', 'Content', 'Text', 'Writing Product'],
				ladderIndicatorCategoryOrder = ['Skills', 'Instruction', 'Results'];

			function sortHolisticCategories(a, b) {
				if (holisticCategoryOrder.indexOf(a.holisticCategory) < holisticCategoryOrder.indexOf(b.holisticCategory)) {
					return -1;
				} else if (holisticCategoryOrder.indexOf(a.holisticCategory) > holisticCategoryOrder.indexOf(b.holisticCategory)) {
					return 1;
				} else {
					return 0;
				}
			}

			function sortTaskIndicatorCategories(a, b) {
				if (taskIndicatorCategoryOrder.indexOf(a.indicatorCategory) < taskIndicatorCategoryOrder.indexOf(b.indicatorCategory)) {
					return -1;
				} else if (taskIndicatorCategoryOrder.indexOf(a.indicatorCategory) > taskIndicatorCategoryOrder.indexOf(b.indicatorCategory)) {
					return 1;
				} else {
					return 0;
				}
			}

			function sortLadderIndicatorCategories(a, b) {
				if (ladderIndicatorCategoryOrder.indexOf(a.indicatorCategory) < ladderIndicatorCategoryOrder.indexOf(b.indicatorCategory)) {
					return -1;
				} else if (ladderIndicatorCategoryOrder.indexOf(a.indicatorCategory) > ladderIndicatorCategoryOrder.indexOf(b.indicatorCategory)) {
					return 1;
				} else {
					return 0;
				}
			}

			if (info.holisticCategories) {
				info.holisticCategories.sort(sortHolisticCategories);
				if (info.holisticCategories[0] && info.holisticCategories[1]) {
					info.holisticCategories[0].indicatorCategories.sort(sortTaskIndicatorCategories);
					info.holisticCategories[1].indicatorCategories.sort(sortLadderIndicatorCategories);
				}
			}

			// return indicators
			return res.status(200).send(info);
		}
	);
};