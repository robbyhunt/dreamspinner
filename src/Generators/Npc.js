import DiceSound from "../util/DiceSound";

const personality = [
  "Able",
  "Abrasive",
  "Abrupt",
  "Absent Minded",
  "Abusive",
  "Accepting",
  "Accident Prone",
  "Accommodating",
  "Accomplished",
  "Action Oriented",
  "Active",
  "Adaptable",
  "Addict",
  "ADHD",
  "Adorable",
  "Adventurous",
  "Affable",
  "Affected",
  "Affectionate",
  "Afraid",
  "Afraid Of Commitment",
  "Aggressive",
  "Agnostic",
  "Agreeable",
  "Alert",
  "Alluring",
  "Aloof",
  "Altruistic",
  "Always Hungry",
  "Always Late",
  "Ambiguous",
  "Ambitious",
  "Amiable",
  "Amused",
  "Amusing",
  "Angry",
  "Animated",
  "Annoyed",
  "Annoying",
  "Anti-Social",
  "Anxious",
  "Apathetic",
  "Apologetic",
  "Appreciative",
  "Apprehensive",
  "Approachable",
  "Argumentative",
  "Aristocratic",
  "Arrogant",
  "Artistic",
  "Ashamed",
  "Aspiring",
  "Assertive",
  "Astonished",
  "Attentive",
  "Audacious",
  "Austere",
  "Authoritarian",
  "Authoritative",
  "Available",
  "Average",
  "Awful",
  "Awkward",
  "Babbling",
  "Babyish",
  "Bad",
  "Bashful",
  "Beautiful",
  "Belligerent",
  "Bewildered",
  "Biter",
  "Blames Others",
  "Blasé",
  "Blowhard",
  "Boastful",
  "Boisterous",
  "Bold",
  "Boorish",
  "Bored",
  "Boring",
  "Bossy",
  "Boundless",
  "Brainy",
  "Brash",
  "Bratty",
  "Brave",
  "Brazen",
  "Bright",
  "Brilliant",
  "Brotherly",
  "Brutish",
  "Bubbly",
  "Busy",
  "Calculating",
  "Callous",
  "Calm",
  "Candid",
  "Capable",
  "Capricious",
  "Carefree",
  "Careful",
  "Careless",
  "Caring",
  "Caustic",
  "Cautious",
  "Changeable",
  "Charismatic",
  "Charming",
  "Chaste",
  "Cheerful",
  "Cheerless",
  "Childish",
  "Chivalrous",
  "Civilised",
  "Classy",
  "Clean",
  "Clever",
  "Close",
  "Closed",
  "Clumsy",
  "Coarse",
  "Cocky",
  "Coherent",
  "Cold",
  "Cold Hearted",
  "Combative",
  "Comfortable",
  "Committed",
  "Communicative",
  "Compassionate",
  "Competent",
  "Complacent",
  "Compliant",
  "Composed",
  "Compulsive",
  "Conceited",
  "Concerned",
  "Condescending",
  "Confident",
  "Confused",
  "Congenial",
  "Conscientious",
  "Considerate",
  "Consistent",
  "Constricting",
  "Content",
  "Contented",
  "Contrarian",
  "Contrite",
  "Controlling",
  "Conversational",
  "Cooperative",
  "Coquettish",
  "Courageous",
  "Courteous",
  "Covetous",
  "Cowardly",
  "Cowering",
  "Coy",
  "Crabby",
  "Crafty",
  "Cranky",
  "Crazy",
  "Creative",
  "Credible",
  "Creepy",
  "Critical",
  "Cross",
  "Crude",
  "Cruel",
  "Cuddly",
  "Cultured",
  "Curious",
  "Cutthroat",
  "Cynical",
  "Dainty",
  "Dangerous",
  "Daring",
  "Dark",
  "Dashing",
  "Dauntless",
  "Dazzling",
  "Debonair",
  "Deceitful",
  "Deceiving",
  "Decent",
  "Decisive",
  "Decorous",
  "Deep",
  "Defeated",
  "Defective",
  "Deferential",
  "Defiant",
  "Deliberate",
  "Delicate",
  "Delightful",
  "Demanding",
  "Demonic",
  "Dependable",
  "Dependent",
  "Depressed",
  "Deranged",
  "Despicable",
  "Despondent",
  "Detached",
  "Detailed",
  "Determined",
  "Devilish",
  "Devious",
  "Devoted",
  "Dignified",
  "Diligent",
  "Direct",
  "Disaffected",
  "Disagreeable",
  "Discerning",
  "Disciplined",
  "Discontented",
  "Discouraged",
  "Discreet",
  "Disgusting",
  "Dishonest",
  "Disillusioned",
  "Disinterested",
  "Disloyal",
  "Dismayed",
  "Disorderly",
  "Disorganized",
  "Disparaging",
  "Disrespectful",
  "Dissatisfied",
  "Dissolute",
  "Distant",
  "Distraught",
  "Distressed",
  "Disturbed",
  "Dogmatic",
  "Domineering",
  "Dorky",
  "Doubtful",
  "Downtrodden",
  "Draconian",
  "Dramatic",
  "Dreamer",
  "Dreamy",
  "Dreary",
  "Dubious",
  "Dull",
  "Dumb",
  "Dutiful",
  "Dynamic",
  "Eager",
  "Easygoing",
  "Eccentric",
  "Educated",
  "Effervescent",
  "Efficient",
  "Egocentric",
  "Egotistic",
  "Elated",
  "Eloquent",
  "Embarrassed",
  "Embittered",
  "Embraces Change",
  "Eminent",
  "Emotional",
  "Empathetic",
  "Enchanting",
  "Encouraging",
  "Enduring",
  "Energetic",
  "Engaging",
  "Enigmatic",
  "Entertaining",
  "Enthusiastic",
  "Envious",
  "Equable",
  "Erratic",
  "Ethical",
  "Evasive",
  "Evil",
  "Exacting",
  "Excellent",
  "Excessive",
  "Excitable",
  "Excited",
  "Exclusive",
  "Expansive",
  "Expert",
  "Extravagant",
  "Extreme",
  "Exuberant",
  "Fabulous",
  "Facetious",
  "Faded",
  "Fair",
  "Faith In Self",
  "Faithful",
  "Faithless",
  "Fake",
  "Fanatical",
  "Fanciful",
  "Fantastic",
  "Fatalistic",
  "Fearful",
  "Fearless",
  "Feisty",
  "Ferocious",
  "Fidgety",
  "Fierce",
  "Fiery",
  "Fighter",
  "Filthy",
  "Fine",
  "Finicky",
  "Flagging",
  "Flakey",
  "Flamboyant",
  "Flashy",
  "Fleeting",
  "Flexible",
  "Flighty",
  "Flippant",
  "Flirty",
  "Flustered",
  "Focused",
  "Foolish",
  "Forceful",
  "Forgetful",
  "Forgiving",
  "Formal",
  "Fortunate",
  "Foul",
  "Frank",
  "Frantic",
  "Fresh",
  "Fretful",
  "Friendly",
  "Frightened",
  "Frigid",
  "Frugal",
  "Frustrated",
  "Fuddy Duddy",
  "Fun",
  "Fun Loving",
  "Funny",
  "Furious",
  "Furtive",
  "Fussy",
  "Gabby",
  "Garrulous",
  "Gaudy",
  "Generous",
  "Genial",
  "Gentle",
  "Giddy",
  "Giggly",
  "Gives Up Easily",
  "Giving",
  "Glamorous",
  "Gloomy",
  "Glorious",
  "Glum",
  "Goal Orientated",
  "Good",
  "Goofy",
  "Graceful",
  "Gracious",
  "Grandiose",
  "Grateful",
  "Greedy",
  "Gregarious",
  "Grieving",
  "Grouchy",
  "Growly",
  "Gruesome",
  "Gruff",
  "Grumpy",
  "Guarded",
  "Guilt Ridden",
  "Guilty",
  "Gullible",
  "Haggling",
  "Handsome",
  "Happy",
  "Hard",
  "Hard Working",
  "Hardy",
  "Harmonious",
  "Harried",
  "Harsh",
  "Hateful",
  "Haughty",
  "Healthy",
  "Heart Broken",
  "Heartless",
  "Heavy Hearted",
  "Hedonistic",
  "Helpful",
  "Helpless",
  "Hesitant",
  "High",
  "High Self Esteem",
  "Hilarious",
  "Homeless",
  "Honest",
  "Honor Bound",
  "Honorable",
  "Hopeful",
  "Hopeless",
  "Hormonal",
  "Horrible",
  "Hospitable",
  "Hostile",
  "Hot Headed",
  "Huffy",
  "Humble",
  "Humorous",
  "Hurt",
  "Hysterical",
  "Ignorant",
  "Ill",
  "Ill-Bred",
  "Imaginative",
  "Immaculate",
  "Immature",
  "Immobile",
  "Immodest",
  "Impartial",
  "Impatient",
  "Imperial",
  "Impolite",
  "Impotent",
  "Impractical",
  "Impudent",
  "Impulsive",
  "Inactive",
  "Incoherent",
  "Incompetent",
  "Inconsiderate",
  "Inconsistent",
  "Indecisive",
  "Independent",
  "Indifferent",
  "Indiscrete",
  "Indiscriminate",
  "Indolent",
  "Indulgent",
  "Industrious",
  "Inefficient",
  "Inept",
  "Inflexible",
  "Inimitable",
  "Innocent",
  "Inquisitive",
  "Insecure",
  "Insensitive",
  "Insightful",
  "Insincere",
  "Insipid",
  "Insistent",
  "Insolent",
  "Instinctive",
  "Insulting",
  "Intellectual",
  "Intelligent",
  "Intense",
  "Interested",
  "Interrupting",
  "Intimidating",
  "Intolerant",
  "Intrepid",
  "Introspective",
  "Introverted",
  "Intuitive",
  "Inventive",
  "Involved",
  "Irresolute",
  "Irresponsible",
  "Irreverent",
  "Irritable",
  "Irritating",
  "Jackass",
  "Jaded",
  "Jealous",
  "Jittery",
  "Joking",
  "Jolly",
  "Jovial",
  "Joyful",
  "Joyous",
  "Judgmental",
  "Keen",
  "Kenderish",
  "Kind Hearted",
  "Kittenish",
  "Knowledgeable",
  "Lackadaisical",
  "Lacking",
  "Languid",
  "Lascivious",
  "Late",
  "Lazy",
  "Leader",
  "Lean",
  "Lethargic",
  "Level",
  "Lewd",
  "Liar",
  "Licentious",
  "Light-Hearted",
  "Likeable",
  "Limited",
  "Lineat",
  "Lingering",
  "Lively",
  "Logical",
  "Lonely",
  "Loquacious",
  "Lordly",
  "Loud",
  "Loudmouth",
  "Lovable",
  "Lovely",
  "Loves Challenge",
  "Loving",
  "Low Confidence",
  "Lowly",
  "Loyal",
  "Lucky",
  "Lunatic",
  "Lying",
  "Macho",
  "Mad",
  "Malice",
  "Malicious",
  "Manipulative",
  "Mannerly",
  "Materialistic",
  "Matronly",
  "Matter-Of-Fact",
  "Mature",
  "Mean",
  "Meek",
  "Melancholy",
  "Melodramatic",
  "Mentally Slow",
  "Merciful",
  "Mercurial",
  "Messy",
  "Meticulous",
  "Mild",
  "Mischievous",
  "Miserable",
  "Miserly",
  "Mistrusting",
  "Modern",
  "Modest",
  "Moody",
  "Moping",
  "Moralistic",
  "Motherly",
  "Motivated",
  "Mysterious",
  "Nagging",
  "Naive",
  "Narcissistic",
  "Narrow-Minded",
  "Nasty",
  "Naughty",
  "Neat",
  "Needs Social Approval",
  "Needy",
  "Negative",
  "Negligent",
  "Nervous",
  "Neurotic",
  "Never Hungry",
  "Nibbler",
  "Nice",
  "Night Owl",
  "Nihilistic",
  "Nimble",
  "Nit Picker",
  "No Purpose",
  "No Self Confidence",
  "Noble",
  "Noisy",
  "Nonchalant",
  "Nosy",
  "Not Trustworthy",
  "Nuanced",
  "Nuisance",
  "Nurturing",
  "Nut",
  "Obedient",
  "Obese",
  "Obliging",
  "Obnoxious",
  "Obscene",
  "Obsequious",
  "Observant",
  "Obstinate",
  "Odd",
  "Odious",
  "Open",
  "Open-Minded",
  "Opinionated",
  "Opportunistic",
  "Optimistic",
  "Orcish",
  "Orderly",
  "Organized",
  "Ornery",
  "Ossified",
  "Ostentatious",
  "Outgoing",
  "Outrageous",
  "Outspoken",
  "Overbearing",
  "Overweight",
  "Overwhelmed",
  "Overwhelming",
  "Paces",
  "Pacifistic",
  "Painstaking",
  "Panicky",
  "Paranoid",
  "Particular",
  "Passionate",
  "Passive",
  "Passive-Aggressive",
  "Pathetic",
  "Patient",
  "Patriotic",
  "Peaceful",
  "Penitent",
  "Pensive",
  "Perfect",
  "Perfectionist",
  "Performer",
  "Perserverant",
  "Perseveres",
  "Persevering",
  "Persistent",
  "Persuasive",
  "Pert",
  "Perverse",
  "Pessimistic",
  "Petty",
  "Petulant",
  "Philanthropic",
  "Picky",
  "Pious",
  "Pitiful",
  "Placid",
  "Plain",
  "Playful",
  "Pleasant",
  "Pleasing",
  "Plotting",
  "Plucky",
  "Polite",
  "Pompous",
  "Poor",
  "Popular",
  "Positive",
  "Possessive",
  "Practical",
  "Precise",
  "Predictable",
  "Preoccupied",
  "Pretentious",
  "Pretty",
  "Prim",
  "Primitive",
  "Productive",
  "Profane",
  "Professional",
  "Promiscuous",
  "Proper",
  "Protective",
  "Proud",
  "Prudent",
  "Psychotic",
  "Puckish",
  "Punctilious",
  "Punctual",
  "Purposeful",
  "Pushy",
  "Puzzled",
  "Quarrelsome",
  "Queer",
  "Quick",
  "Quick Tempered",
  "Quiet",
  "Quirky",
  "Quixotic",
  "Rambunctious",
  "Random",
  "Rash",
  "Rational",
  "Rawboned",
  "Realistic",
  "Reasonable",
  "Rebellious",
  "Recalcitrant",
  "Receptive",
  "Reckless",
  "Reclusive",
  "Refined",
  "Reflective",
  "Regretful",
  "Rejects Change",
  "Relaxed",
  "Relents",
  "Reliable",
  "Relieved",
  "Religious",
  "Reluctant",
  "Remorseful",
  "Repugnant",
  "Repulsive",
  "Resentful",
  "Reserved",
  "Resilient",
  "Resolute",
  "Resourceful",
  "Respectful",
  "Responsible",
  "Responsive",
  "Restless",
  "Retiring",
  "Rhetorical",
  "Rich",
  "Right",
  "Righteous",
  "Rigid",
  "Risk-Taking",
  "Romantic",
  "Rough",
  "Rowdy",
  "Rude",
  "Rugged",
  "Ruthless",
  "Sacrificing",
  "Sad",
  "Sadistic",
  "Safe",
  "Sagely",
  "Saintly",
  "Salient",
  "Sanctimonious",
  "Sanguine",
  "Sarcastic",
  "Sassy",
  "Satisfied",
  "Saucy",
  "Savage",
  "Scared",
  "Scarred",
  "Scary",
  "Scattered",
  "Scheming",
  "Scornful",
  "Scrawny",
  "Scruffy",
  "Secretive",
  "Secure",
  "Sedate",
  "Seductive",
  "Selective",
  "Self-Centered",
  "Self-Confident",
  "Self-Conscious",
  "Self-Controlling",
  "Self-Directed",
  "Self-Disciplined",
  "Self-Giving",
  "Self-Reliant",
  "Self-Serving",
  "Selfish",
  "Selfless",
  "Senile",
  "Sensitive",
  "Sensual",
  "Sentimental",
  "Serene",
  "Serious",
  "Sexual",
  "Sexy",
  "Shallow",
  "Shameless",
  "Sharp",
  "Sharp-Tongued",
  "Sharp-Witted",
  "Sheepish",
  "Shiftless",
  "Shifty",
  "Short",
  "Shrewd",
  "Shy",
  "Silent",
  "Silky",
  "Silly",
  "Simian",
  "Simple",
  "Sincere",
  "Sisterly",
  "Skillful",
  "Sleazy",
  "Sloppy",
  "Slovenly",
  "Slow Paced",
  "Slutty",
  "Sly",
  "Small-Minded",
  "Smart",
  "Smiling",
  "Smooth",
  "Sneaky",
  "Snob",
  "Sociable",
  "Soft-Hearted",
  "Soft-Spoken",
  "Solitary",
  "Sore",
  "Sorry",
  "Sour",
  "Spendthrift",
  "Spiteful",
  "Splendid",
  "Spoiled",
  "Spontaneous",
  "Spunky",
  "Squeamish",
  "Stately",
  "Static",
  "Steadfast",
  "Sterile",
  "Stern",
  "Stimulating",
  "Stingy",
  "Stoical",
  "Stolid",
  "Straight Laced",
  "Strange",
  "Strict",
  "Strident",
  "Strong",
  "Strong Willed",
  "Stubborn",
  "Studious",
  "Stupid",
  "Suave",
  "Submissive",
  "Successful",
  "Succinct",
  "Sulky",
  "Sullen",
  "Sultry",
  "Supercilious",
  "Superstitious",
  "Supportive",
  "Surly",
  "Suspicious",
  "Sweet",
  "Sympathetic",
  "Systematic",
  "Taciturn",
  "Tacky",
  "Tactful",
  "Tactless",
  "Talented",
  "Talkative",
  "Tall",
  "Tardy",
  "Tasteful",
  "Temperamental",
  "Temperate",
  "Tenacious",
  "Tense",
  "Tentative",
  "Terrible",
  "Terrified",
  "Testy",
  "Thankful",
  "Thankless",
  "Thick Skinned",
  "Thorough",
  "Thoughtful",
  "Thoughtless",
  "Threatening",
  "Thrifty",
  "Thrilled",
  "Tight",
  "Timid",
  "Tired",
  "Tireless",
  "Tiresome",
  "Tolerant",
  "Touchy",
  "Tough",
  "Trivial",
  "Troubled",
  "Truculent",
  "Trusting",
  "Trustworthy",
  "Truthful",
  "Typical",
  "Ugly",
  "Unappreciative",
  "Unassuming",
  "Unbending",
  "Unbiased",
  "Uncaring",
  "Uncommitted",
  "Unconcerned",
  "Uncontrolled",
  "Unconventional",
  "Uncooperative",
  "Uncoordinated",
  "Uncouth",
  "Undependable",
  "Understanding",
  "Undesirable",
  "Undisciplined",
  "Unenthusiastic",
  "Unfeeling",
  "Unfocused",
  "Unforgiving",
  "Unfriendly",
  "Ungrateful",
  "Unhappy",
  "Unhelpful",
  "Uninhibited",
  "Unkind",
  "Unmotivated",
  "Unpredictable",
  "Unreasonable",
  "Unreceptive",
  "Unreliable",
  "Unresponsive",
  "Unrestrained",
  "Unruly",
  "Unscrupulous",
  "Unselfish",
  "Unsure",
  "Unsympathetic",
  "Unsystematic",
  "Unusual",
  "Unwilling",
  "Upbeat",
  "Upset",
  "Uptight",
  "Useful",
  "Vacant",
  "Vague",
  "Vain",
  "Valiant",
  "Vengeful",
  "Venomous",
  "Verbose",
  "Versatile",
  "Vigorous",
  "Vindictive",
  "Violent",
  "Virtuous",
  "Visual",
  "Vivacious",
  "Volatile",
  "Voracious",
  "Vulgar",
  "Vulnerable",
  "Warlike",
  "Warm Hearted",
  "Wary",
  "Wasteful",
  "Weak",
  "Weary",
  "Weird",
  "Well Grounded",
  "Whimsical",
  "Wholesome",
  "Wicked",
  "Wild",
  "Willing",
  "Wise",
  "Wishy Washy",
  "Withdrawn",
  "Witty",
  "Worldly",
  "Worried",
  "Worthless",
  "Wretched",
  "Xenophobic",
  "Young",
  "Youthful",
  "Zany",
  "Zealot",
];

const occupationContainer = {
  fantasy: [
    "Actor",
    "Alchemist",
    "Animal handler",
    "Apothecary",
    "Architect",
    "Archer",
    "Archivist",
    "Aristocrat",
    "Armorer",
    "Artisan",
    "Artist",
    "Astrologer",
    "Baker",
    "Banker",
    "Barbarian",
    "Barber",
    "Bard",
    "Barkeep",
    "Barmaid",
    "Beekeeper",
    "Beer seller",
    "Beggar",
    "Blacksmith",
    "Boatman",
    "Bookbinder",
    "Bookseller",
    "Brewer",
    "Bricklayer",
    "Brick maker",
    "Brigand",
    "Brothel keeper",
    "Buckle maker",
    "Builder",
    "Butcher",
    "Caravan Leader",
    "Carpenter",
    "Cartographer",
    "Chandler",
    "Charioteer",
    "Chatelaine",
    "Chef",
    "Chieftain",
    "Chirurgeon",
    "Clergyman",
    "Clerk",
    "Clock maker",
    "Clothworker",
    "Cobbler",
    "Commander",
    "Concubine",
    "Cook",
    "Cooper",
    "Copyist",
    "Costermonger",
    "Counselor",
    "Courtesan",
    "Courtier",
    "Cowherd",
    "Crossbowman",
    "Cutler",
    "Daimyo",
    "Dairymaid",
    "Dancer",
    "Dictator",
    "Diplomat",
    "Distiller",
    "Diver",
    "Diviner",
    "Doctor",
    "Domestic servant",
    "Emperor/Empress",
    "Eunuch",
    "Explorer",
    "Farmer",
    "Fighter",
    "Fisherman",
    "Fishmonger",
    "Footman",
    "Furrier",
    "Galley slave",
    "Gardener",
    "Geisha",
    "General",
    "Gladiator",
    "Glovemaker",
    "Goldsmith",
    "Grocer",
    "Groom",
    "Guardsman",
    "Guildmaster",
    "Harness maker",
    "Hatmaker",
    "Hay merchant",
    "Healer",
    "Hearthwitch",
    "Herald",
    "Herbalist",
    "Herder",
    "Hermit",
    "Highwayman",
    "Historian",
    "Housemaid",
    "Hunter",
    "Illuminator",
    "Infantryman",
    "Innkeeper",
    "Interpreter",
    "Inventor",
    "Jailer",
    "Jester",
    "Jeweler",
    "Jongleur",
    "Judge",
    "King",
    "Kitchen drudge",
    "Knight",
    "Laborer",
    "Lady",
    "Lady in Waiting",
    "Lawyer",
    "Leatherworker",
    "Librarian",
    "Linguist",
    "Locksmith",
    "Longbowman",
    "Longshoreman",
    "Lord",
    "Maidservant",
    "Majordomo",
    "Man at Arms",
    "Mason",
    "Masseur",
    "Mayor",
    "Mercer",
    "Merchant",
    "Messenger",
    "Midwife",
    "Miller",
    "Miner",
    "Minister",
    "Minstrel",
    "Monk",
    "Mortician",
    "Mourner",
    "Musician",
    "Necromancer",
    "Noble",
    "Nun",
    "Nurse",
    "Old-clothes seller",
    "Page",
    "Painter",
    "Pariah",
    "Pastry cook",
    "Peasant",
    "Perfumer",
    "Philosopher",
    "Physician",
    "Pigkeeper",
    "Pilgrim",
    "Pirate",
    "Plasterer",
    "Potter",
    "Priest/ess",
    "Prince/ss",
    "Privateer",
    "Professor",
    "Prostitute",
    "Pursemaker",
    "Queen",
    "Ranger",
    "Ratcatcher",
    "Reeve",
    "Ronin",
    "Roofer",
    "Ropemaker",
    "Royal Adviser",
    "Rugmaker",
    "Ruler",
    "Saddler",
    "Sailor",
    "Samurai",
    "Scabbard maker",
    "Sculptor",
    "Scavenger",
    "Scholar",
    "Scrivener",
    "Seamstress",
    "Servant",
    "Shaman",
    "Shepherd",
    "Ship's captain",
    "Shoemaker",
    "Silversmith",
    "Slave",
    "Slaver",
    "Smith",
    "Soldier",
    "Sorcerer/Sorceress",
    "Spice Merchant",
    "Squire",
    "Stablehand",
    "Stevedore",
    "Stonemason",
    "Storyteller",
    "Steward",
    "Street kid",
    "Street seller",
    "Street sweeper",
    "Student",
    "Surgeon",
    "Surveyor",
    "Swordsman",
    "Sycophant",
    "Tailor",
    "Tanner",
    "Tavernkeeper",
    "Tax collector",
    "Teacher",
    "Teamster",
    "Thatcher",
    "Thief",
    "Tinker",
    "Torturer",
    "Town crier",
    "Toymaker",
    "Trapper",
    "Vendor",
    "Vermin catcher",
    "Veterinarian",
    "Village chief",
    "Vintner",
    "Viking",
    "Warlock",
    "Warrior",
    "Water carrier",
    "Weaver",
    "Wetnurse",
    "Wine seller",
    "Witch",
    "Wizard",
    "Woodcarver",
    "Woodcutter",
    "Wood seller",
    "Wrestler",
    "Writer",
  ],
};

const raceContainer = {
  fantasy: [
    "Human",
    "Wood Elf",
    "High Elf",
    "Dwarf",
    "Halfling",
    "Gnome",
    "Half Elf",
  ],
};

const detail = [
  "Sleepy eyes",
  "Shifty eyes",
  "Watery eyes",
  "Bright eyes",
  "Cold eyes",
  "Smiling eyes",
  "Close-set eyes",
  "Wild eyes",
  "Distant eyes",
  "A lazy eye",
  "Piercing eyes",
  "Watchful eyes",
  "Dark eyes",
  "Hooded eyes",
  "Eyes of two different colors",
  "Slightly crossed eyes",
  "Wide eyes",
  "Beautiful eyes",
  "Beady eyes",
  "Penetrating eyes",
  "Over-sized ears",
  "Long ear lobes",
  "Small ears",
  "Uneven ears",
  "Hairy ears",
  "Pointy ears",
  "Short ear lobes",
  "Ears that stick out",
  "Jug-handle ears",
  "Elaborately pierced ears",
  "Cauliflower ears",
  "Ears with improbable tufts of hair",
  "Full lips",
  "Buck-teeth",
  "Thin lips",
  "Rotting teeth",
  "Crooked teeth",
  "A broken or missing tooth",
  "Pursed lips",
  "Dry, cracked lips",
  "One or more false teeth",
  "A mouth that hangs open",
  "A crooked nose",
  "A bulbous nose",
  "A narrow nose",
  "A button nose",
  "A long nose",
  "A broad nose",
  "An angular nose",
  "A round nose",
  "A broken nose",
  "A hawk-like nose",
  "A wide nose",
  "A delicate nose",
  "A pronounced chin",
  "A cleft chin",
  "A dimple on the chin",
  "A rounded chin",
  "A sharp jawline",
  "A square jaw",
  "A round jaw",
  "An underbite",
  "Thick hair",
  "Wispy hair",
  "Straight hair",
  "Wavy hair",
  "Curly hair",
  "Wiry hair",
  "Oily hair",
  "Lush hair",
  "Poofy hair",
  "Long braids",
  "Braids tight against the head",
  "Very long hair",
  "Greasy hair",
  "Unruly hair",
  "An unusual hairstyle",
  "An outdated hairstyle",
  "A high-maintenance hairstyle",
  "Short-cropped hair",
  "A shaved head",
  "No hair at all",
  "High cheekbones",
  "Tight, drawn cheeks",
  "Chubby cheeks",
  "An unpleasant pustule",
  "A large mole",
  "A beauty mark",
  "Freckles",
  "Terrible scarring",
  "Powerful hands",
  "Delicate hands",
  "Rough hands",
  "Soft hands",
  "A light touch",
  "A heavy touch",
  "A jagged scar",
  "A dark purple scar",
  "An angry red scar",
  "A long, thin scar",
  "A dagger tattoo",
  "An arrow tattoo",
  "An anchor tattoo",
  "A skull tattoo",
  "A pair of crossed bones tattoo",
  "A snake tattoo",
  "A scorpion tattoo",
  "A spider web tattoo",
  "A heart tattoo",
  "A ring of thorns tattoo",
  "A mermaid tattoo",
  "A dragon tattoo",
  "An earring",
  "Two earrings",
  "A small chain about the neck",
  "A large chain about the neck",
  "A tight choker about the neck",
  "A brooch",
  "A ring",
  "Several rings",
  "A bracelet",
  "A nose ring",
  "A medallion",
  "An ornate belt",
];

export default function Npc(event) {
  let occupation;
  let race;

  if (event.target.id === "fantasy") {
    occupation = occupationContainer.fantasy;
    race = raceContainer.fantasy;
  }

  const personalityResult =
    personality[Math.floor(Math.random() * personality.length)].toLowerCase();
  const personalityPre =
    personalityResult.charAt(0) === "a" ||
    personalityResult.charAt(0) === "e" ||
    personalityResult.charAt(0) === "i" ||
    personalityResult.charAt(0) === "o" ||
    personalityResult.charAt(0) === "u" ||
    personalityResult.substring(0, 3) === "hon"
      ? "An"
      : "A";

  const occupationResult =
    occupation[Math.floor(Math.random() * occupation.length)].toLowerCase();

  const raceResult = race[Math.floor(Math.random() * race.length)];

  const detailResult =
    detail[Math.floor(Math.random() * detail.length)].toLowerCase();

  const result = ` > ${
    personalityPre +
    " " +
    personalityResult +
    " " +
    raceResult +
    " " +
    occupationResult +
    " with " +
    detailResult
  }`;

  DiceSound();

  return result;
}
