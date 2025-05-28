// server/utils/lifestyleScore.js

/**
 * Calculate the Lifestyle score as a raw percentage (0–20)
 * given the patient's raw answers exactly matching your front-end options.
 */
export function calculateLifestyleScore(lifestyle) {
    // Exact option lists in order of 1→4 points:
    const pressureOpts = [
      'Rarely / Once / Two times in last 14 days',
      'Sometimes (1–2 days/week)',
      'Often / Mostly on working days',
      'Very Often / Almost Daily'
    ];
    const activityOpts = [
      'Almost Daily / Regularly',
      'On Office Days (3–5 days/week)',
      'On Weekends Only (1–2 days/week)',
      'After Office Work / Rarely'
    ];
    const sleepOpts = [
      'Almost Daily / Regularly',
      'On Office Days (3–5 days/week)',
      'On Weekends (1–2 days/week)',
      'Rarely in a month'
    ];
    const dietOpts = [
      'Rarely (1–2 days/month)',
      'Occasionally on Weekends',
      '3–4 times/week (Office days)',
      'Almost Daily'
    ];
    const alcoholOpts = [
      'Non-drinker / Teetotaller',
      'Quit in the past',
      'Occasionally (Parties)',
      'Daily habit'
    ];
    const smokingOpts = [
      'Non-smoker / Teetotaller',
      'Quit in the past',
      'Occasionally (Parties)',
      'Daily habit'
    ];
  
    // Weight (%) for each question out of the total 20% lifestyle block
    const weights = {
      pressureOverwhelmed: 2,
      physicalSymptoms:    2,
      physicalActivity:    4,
      refreshedFeeling:    2,
      sleepHours:          2,
      outsideFoodFreq:     2,
      chipsChocFreq:       2,
      alcoholFreq:         2,
      smokingFreq:         2
    };
  
    // Map each form field to its options array
    const optsMap = {
      pressureOverwhelmed: pressureOpts,
      physicalSymptoms:    pressureOpts,
      physicalActivity:    activityOpts,
      refreshedFeeling:    sleepOpts,
      sleepHours:          sleepOpts,
      outsideFoodFreq:     dietOpts,
      chipsChocFreq:       dietOpts,
      alcoholFreq:         alcoholOpts,
      smokingFreq:         smokingOpts
    };
  
    let total = 0;
  
    for (const [field, weight] of Object.entries(weights)) {
      const answer = lifestyle[field];
      const opts   = optsMap[field] || [];
      const idx    = opts.indexOf(answer);
      // map answer to 1–4 points (default to 1 if not found)
      const pts    = idx >= 0 ? idx + 1 : 1;
      // contribution = (pts / 4) * questionWeight
      total += (pts / 4) * weight;
    }
  
    // total is a raw decimal between 0 and 20
    return total;
  }