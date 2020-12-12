import AddToLog from "../util/AddToLog";
import DiceSound from "../util/DiceSound"

const action = {1: ["Attainment", "Starting", "Neglect", "Fight", "Recruit", "Triumph", "Violate", "Oppose", "Malice", "Communicate", "Persecute", "Increase", "Decrease", "Abandon", "Gratify", "Inquire", "Antagonize", "Move", "Waste", "Truce", "Release", "Befriend", "Judge", "Desert", "Dominate", "Procrastinate", "Praise", "Separate", "Take", "Break", "Heal", "Delay", "Stop", "Lie", "Return", "Imitate", "Struggle", "Inform", "Bestow", "Postpone", "Expose", "Haggle", "Imprison", "Release", "Celebrate", "Develop", "Travel", "Block", "Harm", "Debase", "Overindulge", "Adjourn", "Adversity", "Kill", "Disrupt", "Usurp", "Create", "Betray", "Agree", "Abuse", "Oppress", "Inspect", "Ambush", "Spy", "Attach", "Carry", "Open", "Carelessness", "Ruin", "Extravagance", "Trick", "Arrive", "Propose", "Divide", "Refuse", "Mistrust", "Deceive", "Cruelty", "Intolerance", "Trust", "Excitement", "Activity", "Assist", "Care", "Negligence", "Passion", "Work", "Control", "Attract", "Failure", "Pursue", "Vengeance", "Proceedings", "Dispute", "Punish", "Guide", "Transform", "Overthrow", "Oppress", "Change"], 2: ["Goals", "Dreams", "Environment", "Outside", "Inside", "Reality", "Allies", "Enemies", "Evil", "Good", "Emotions", "Opposition", "War", "Peace", "Innocent", "Love", "Spirit", "Intellect", "Ideas", "Joy", "Messages", "Energy", "Balance", "Tension", "Friendship", "Physical", "Project", "Pleasures", "Pain", "Possessions", "Benefits", "Plans", "Lies", "Expectations", "Legal", "Bureaucracy", "Business", "Path", "News", "Exterior", "Advice", "Plot", "Competition", "Prison", "Illness", "Food", "Attention", "Success", "Failure", "Travel", "Jealousy", "Dispute", "Home", "Investment", "Suffering", "Wishes", "Tactics", "Stalemate", "Randomness", "Misfortune", "Death", "Disruption", "Power", "Burden", "Intrigues", "Fears", "Ambush", "Rumor", "Wounds", "Extravagance", "Representative", "Adversities", "Opulence", "Liberty", "Military", "Mundane", "Trials", "Masses", "Vehicle", "Art", "Victory", "Dispute", "Riches", "Normal", "Technology", "Hope", "Magic", "Illusions", "Portals", "Danger", "Weapons", "Animals", "Weather", "Elements", "Nature", "Masses", "Leadership", "Fame", "Anger", "Information"]}

const description = {1: ["Abnormally", "Adventurously", "Aggressively", "Angrily", "Anxiously", "Awkwardly", "Beautifully", "Bleakly", "Boldly", "Bravely", "Busily", "Calmly", "Carefully", "Carelessly", "Cautiously", "Ceaselessly", "Cheerfully", "Combatively", "Coolly", "Crazily", "Curiously", "Daintily", "Dangerously", "Defiantly", "Deliberately", "Delightfully", "Dimly", "Efficiently", "Energetically", "Enormously", "Enthusiastically", "Excitedly", "Fearfully", "Ferociously", "Fiercely", "Foolishly", "Fortunately", "Frantically", "Freely", "Frighteningly", "Fully", "Generously", "Gently", "Gladly", "Gracefully", "Gratefully", "Happily", "Hastily", "Healthily", "Helpfully", "Helplessly", "Hopelessly", "Innocently", "Intensely", "Interestingly", "Irritatingly", "Jovially", "Joyfully", "Judgementally", "Kindly", "Kookily", "Lazily", "Lightly", "Loosely", "Loudly", "Lovingly", "Loyally", "Majestically", "Meaningfully", "Mechanically", "Miserably", "Mockingly", "Mysteriously", "Naturally", "Neatly", "Nicely", "Oddly", "Offensively", "Officially", "Partially", "Peacefully", "Perfectly", "Playfully", "Politely", "Positively", "Powerfully", "Quaintly", "Quarrelsomely", "Quietly", "Roughly", "Rudely", "Ruthlessly", "Slowly", "Softly", "Swiftly", "Threateningly", "Very", "Violently", "Wildly", "Yieldingly"], 2: ["Abandoned", "Abnormal", "Amusing", "Ancient", "Aromatic", "Average", "Beautiful", "Bizarre", "Classy", "Clean", "Cold", "Colorful", "Creepy", "Cute", "Damaged", "Dark", "Defeated", "Delicate", "Delightful", "Dirty", "Disagreeable", "Disgusting", "Drab", "Dry", "Dull", "Empty", "Enormous", "Exotic", "Faded", "Familiar", "Fancy", "Fat", "Feeble", "Feminine", "Festive", "Flawless", "Fresh", "Full", "Glorious", "Good", "Graceful", "Hard", "Harsh", "Healthy", "Heavy", "Historical", "Horrible", "Important", "Interesting", "Juvenile", "Lacking", "Lame", "Large", "Lavish", "Lean", "Less", "Lethal", "Lonely", "Lovely", "Macabre", "Magnificent", "Masculine", "Mature", "Messy", "Mighty", "Military", "Modern", "Extravagant", "Mundane", "Mysterious", "Natural", "Nondescript", "Odd", "Pale", "Petite", "Poor", "Powerful", "Quaint", "Rare", "Reassuring", "Remarkable", "Rotten", "Rough", "Ruined", "Rustic", "Scary", "Simple", "Small", "Smelly", "Smooth", "Soft", "Strong", "Tranquil", "Ugly", "Valuable", "Warlike", "Warm", "Watery", "Weak", "Young"]}

function ComplexQuestion(event) {
  
  let data;
  if (event.target.id === "cqa") {
    data = action
  } else if (event.target.id === "cqd") {
    data = description
  }

  const result = ` > ${data[1][Math.floor(Math.random() * data[1].length)]} / ${data[2][Math.floor(Math.random() * data[2].length)]}`

  DiceSound()
  
  return (
    AddToLog() + AddToLog(result)
  );
}

export default ComplexQuestion;
