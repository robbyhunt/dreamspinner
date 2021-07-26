const action = {1: ["Attainment", "Starting", "Neglect", "Fight", "Recruit", "Triumph", "Violate", "Oppose", "Malice", "Communicate", "Persecute", "Increase", "Decrease", "Abandon", "Gratify", "Inquire", "Antagonize", "Move", "Waste", "Truce", "Release", "Befriend", "Judge", "Desert", "Dominate", "Procrastinate", "Praise", "Separate", "Take", "Break", "Heal", "Delay", "Stop", "Lie", "Return", "Imitate", "Struggle", "Inform", "Bestow", "Postpone", "Expose", "Haggle", "Imprison", "Release", "Celebrate", "Develop", "Travel", "Block", "Harm", "Debase", "Overindulge", "Adjourn", "Adversity", "Kill", "Disrupt", "Usurp", "Create", "Betray", "Agree", "Abuse", "Oppress", "Inspect", "Ambush", "Spy", "Attach", "Carry", "Open", "Carelessness", "Ruin", "Extravagance", "Trick", "Arrive", "Propose", "Divide", "Refuse", "Mistrust", "Deceive", "Cruelty", "Intolerance", "Trust", "Excitement", "Activity", "Assist", "Care", "Negligence", "Passion", "Work", "Control", "Attract", "Failure", "Pursue", "Vengeance", "Proceedings", "Dispute", "Punish", "Guide", "Transform", "Overthrow", "Oppress", "Change"], 2: ["Goals", "Dreams", "Environment", "Outside", "Inside", "Reality", "Allies", "Enemies", "Evil", "Good", "Emotions", "Opposition", "War", "Peace", "Innocent", "Love", "Spirit", "Intellect", "Ideas", "Joy", "Messages", "Energy", "Balance", "Tension", "Friendship", "Physical", "Project", "Pleasures", "Pain", "Possessions", "Benefits", "Plans", "Lies", "Expectations", "Legal", "Bureaucracy", "Business", "Path", "News", "Exterior", "Advice", "Plot", "Competition", "Prison", "Illness", "Food", "Attention", "Success", "Failure", "Travel", "Jealousy", "Dispute", "Home", "Investment", "Suffering", "Wishes", "Tactics", "Stalemate", "Randomness", "Misfortune", "Death", "Disruption", "Power", "Burden", "Intrigues", "Fears", "Ambush", "Rumor", "Wounds", "Extravagance", "Representative", "Adversities", "Opulence", "Liberty", "Military", "Mundane", "Trials", "Masses", "Vehicle", "Art", "Victory", "Dispute", "Riches", "Normal", "Technology", "Hope", "Magic", "Illusions", "Portals", "Danger", "Weapons", "Animals", "Weather", "Elements", "Nature", "Masses", "Leadership", "Fame", "Anger", "Information"]}

function Event(diceResults) {
  const triggerRoll = Math.floor(Math.random() * 6) + 1
  if (triggerRoll <= diceResults[0]) {
    let eventFocus = ""
    const focusRoll = Math.floor(Math.random() * 6) + 1
    const evensOddsRoll = Math.floor(Math.random() * 6) + 1
    switch (focusRoll) {
      case 1:
        if (evensOddsRoll === 6) {
          eventFocus = "Close a thread"
        } else if (evensOddsRoll % 2 !== 0) {
          eventFocus = "Introduce an NPC"
        } else if (evensOddsRoll % 2 === 0) {
          return
        }
        break;
      case 2:
        if (evensOddsRoll % 2 === 0) {
          eventFocus = "Move toward a thread"
        } else {
          eventFocus = "Move away from a thread"
        }
        break;
      case 3:
        if (evensOddsRoll % 2 === 0) {
          eventFocus = "PC Positive"
        } else {
          eventFocus = "PC Negative"
        }
        break;
      case 4:
        if (evensOddsRoll % 2 === 0) {
          eventFocus = "NPC Positive"
        } else {
          eventFocus = "NPC Negative"
        }
        break;
      case 5:
        eventFocus = "NPC Action"
        break;
      case 6:
        if (evensOddsRoll % 2 === 0) {
          eventFocus = "Ambiguous Event"
        } else {
          eventFocus = "Remote Event"
        }
        break;
      default:
        break;
    }

    let eventMeaning1 = action[1][Math.floor(Math.random() * action[1].length)];
    let eventMeaning2 = action[2][Math.floor(Math.random() * action[2].length)];
    
    const result = ` > [Event]: ${eventFocus} - ${eventMeaning1} / ${eventMeaning2}`;

    return result;
  }
}

export default Event;