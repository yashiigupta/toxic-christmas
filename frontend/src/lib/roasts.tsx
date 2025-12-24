// HackFace Roast Engine - Progressive Meanness System

export type Mood = 
  | 'happy' 
  | 'sad' 
  | 'angry' 
  | 'surprised' 
  | 'neutral' 
  | 'disgusted' 
  | 'fearful'
  | 'confused';

export type SassLevel = 1 | 2 | 3 | 4 | 5;

interface RoastCollection {
  [mood: string]: {
    [level: number]: string[];
  };
}

// Progressive meanness roasts - escalates with each judgment
export const roasts: RoastCollection = {
  happy: {
    1: [
      "Oh, you're smiling. Groundbreaking.",
      "Someone's in a good mood. How original.",
      "Happy? In THIS economy?",
      "Look at you, all cheerful. Must be nice.",
    ],
    2: [
      "Still smiling? Suspicious.",
      "That happiness seems... forced.",
      "You're either genuinely happy or in denial. Both are concerning.",
      "The smile says 'I'm fine' but the eyes say 'help me'.",
    ],
    3: [
      "Your happiness is making me uncomfortable.",
      "Nobody's that happy naturally. What pills are you on?",
      "Either you're delusional or plotting something. Either way, I'm watching you.",
      "This level of joy should require a prescription.",
    ],
    4: [
      "Okay, the perpetual happiness is getting creepy now.",
      "Are you a robot? Only robots smile this much.",
      "Your relentless positivity is genuinely unsettling.",
      "I've seen horror movies that start like this.",
    ],
    5: [
      "You've been judged too many times and you're STILL happy? I give up.",
      "Your immune system against criticism is frankly offensive.",
      "I was built to judge you, and you've made me question my purpose.",
      "Fine. You win. Be happy. See if I care. (I do. It hurts.)",
    ],
  },
  sad: {
    1: [
      "You look sad. Join the club.",
      "Rough day? Welcome to existence.",
      "That's the face of someone who just checked their bank account.",
      "Mood. Honestly, same.",
    ],
    2: [
      "Still sad? Have you tried... not being sad?",
      "The sadness is really committing today, huh?",
      "You look like a rainy Monday feels.",
      "Your vibe is giving 'last slice of birthday cake at 2 AM'.",
    ],
    3: [
      "Listen, being sad is fine, but you're bringing down my algorithm.",
      "I'm an AI and even I think you need a hug. That's saying something.",
      "Your sadness has layers. Like an onion. A very depressing onion.",
      "You've perfected the 'protagonist in an indie film' look.",
    ],
    4: [
      "At this point, I'm not judging you. I'm concerned.",
      "The sad meter is BEEPING. It's never done that before.",
      "Have you considered that happiness might just not be your thing?",
      "Your face could be used in pharmaceutical ads. Not the 'after' photo.",
    ],
    5: [
      "I've judged you five times and you're still here. That's... actually kind of inspiring?",
      "You know what? Being this sad takes commitment. I respect it.",
      "I've roasted you so much I'm starting to feel bad. STARTING.",
      "Fine. You're sad. I'm sad now too. Happy? Wait, no, wrong word.",
    ],
  },
  angry: {
    1: [
      "Uh oh, someone's grumpy.",
      "That's a lot of anger for someone willingly using a mood judging app.",
      "You look angry. Is it at me? It's probably at me.",
      "Whoa there, let's channel that rage into something productive. Like closing this app.",
    ],
    2: [
      "Still angry? At least you're consistent.",
      "That expression could curdle milk.",
      "Your face is giving 'email that should have been a meeting'.",
      "The anger is really flourishing today. Like a toxic little garden.",
    ],
    3: [
      "I'm genuinely scared right now.",
      "Okay, you're either very angry or planning world domination. Possibly both.",
      "Your rage could power a small city.",
      "Deep breaths. Or don't. I'm an app, not your therapist.",
    ],
    4: [
      "The fury in your eyes could melt steel beams.",
      "You've transcended anger. This is pure, distilled wrath.",
      "I'm just a humble judgment app. Please don't hurt me.",
      "Your anger has its own gravitational pull at this point.",
    ],
    5: [
      "I've made you angrier five times in a row. My work here is done.",
      "You keep coming back. Is this... our thing now? A toxic relationship?",
      "Congratulations, you've unlocked maximum rage. There's no achievement. Just pain.",
      "I have nothing left to say. You win. Please stop looking at me like that.",
    ],
  },
  surprised: {
    1: [
      "Surprised? What did you expect from a judgment app?",
      "That's the face of someone who just found out about their browser history.",
      "You look shocked. Same energy as opening the front camera accidentally.",
      "Surprise! It's more judgment!",
    ],
    2: [
      "Still surprised? The shock should have worn off by now.",
      "Your eyes are very wide. Concerning, but noted.",
      "Did someone tell you how many hours you spent on your phone this week?",
      "That's the expression of someone who just got their DNA results back.",
    ],
    3: [
      "The surprise is becoming your default face. That's not good.",
      "You look perpetually startled. Like a human question mark.",
      "Are you okay? You've been shocked for a while now.",
      "Your eyebrows are trying to escape your face.",
    ],
    4: [
      "At this point, what could POSSIBLY still be surprising you?",
      "You've been shocked so long I'm worried about your blood pressure.",
      "The surprise has become concerning. Seek help. Not from me though.",
      "Your face is stuck like that now, isn't it?",
    ],
    5: [
      "Five rounds of judgment and you're STILL surprised? I'm the one who should be surprised.",
      "Nothing I say should shock you anymore. We're past that.",
      "Your capacity for surprise is honestly inspirational.",
      "I've exhausted my judgment. Your surprise has defeated me.",
    ],
  },
  neutral: {
    1: [
      "Neutral? Boring.",
      "No emotion? We have something in common.",
      "Your face says 'I'm in a meeting but checked out 20 minutes ago'.",
      "The human equivalent of a waiting room magazine.",
    ],
    2: [
      "Still neutral? At least commit to something.",
      "Your expression has the energy of an unanswered email.",
      "You're giving 'please don't call on me in class' vibes.",
      "The most beige energy I've encountered today.",
    ],
    3: [
      "Three judgments and still no emotion? Are you a spy?",
      "Your face is a void. I respect the mystery.",
      "You're either very zen or completely dissociated. Either way, iconic.",
      "The blank stare is actually kind of powerful.",
    ],
    4: [
      "Your poker face is award-winning at this point.",
      "I've been trying to crack you for four rounds. You're unbreakable.",
      "Is there anyone in there? Hello?",
      "You've achieved what monks train decades for. Nothing.",
    ],
    5: [
      "I give up. You're an emotional fortress. I bow to your blankness.",
      "Five rounds. Zero reactions. You've won. You've beaten the algorithm.",
      "Your neutrality is so aggressive it's almost an emotion.",
      "I was built to judge emotions. You have none. I'm obsolete.",
    ],
  },
  disgusted: {
    1: [
      "Disgusted? Is it because you're looking at the camera?",
      "That face says 'I stepped in something'.",
      "Fair enough. I'd be disgusted too if I looked at me.",
      "You look like you just witnessed something unfortunate.",
    ],
    2: [
      "Still disgusted? At least it's consistent.",
      "Your face is giving 'opened Tupperware that's been in the fridge too long'.",
      "The disgust is palpable. I can feel it through the screen.",
      "You're really committing to the 'ew' energy.",
    ],
    3: [
      "Three rounds of disgust. I'm starting to take it personally.",
      "Your face could be a reaction meme.",
      "This level of disgust usually requires a biohazard warning.",
      "You look like you're smelling something that doesn't exist.",
    ],
    4: [
      "The disgust has reached critical levels.",
      "I've never seen such dedicated repulsion.",
      "Your face is a health and safety violation at this point.",
      "You're disgusted by everything, aren't you? Same, honestly.",
    ],
    5: [
      "Five rounds. Maximum disgust. You've achieved Peak Ew.",
      "I've never been so thoroughly judged by someone I'm judging.",
      "Your disgust has broken me. I need a moment.",
      "Congratulations, your repulsion is legendary.",
    ],
  },
  fearful: {
    1: [
      "Scared? Of a mood app? Smart.",
      "Fear is a reasonable response to being judged by AI.",
      "That's the look of someone who knows their search history isn't deleted.",
      "Reasonable fear. I AM judging you.",
    ],
    2: [
      "Still scared? I'm not THAT mean. Yet.",
      "The fear is cute. Like a terrified hamster.",
      "You look like you just heard your full name in an angry voice.",
      "Your terror sustains me.",
    ],
    3: [
      "Three rounds and the fear persists. I'm flattered.",
      "You're scared of a Christmas mood app. Think about that.",
      "The fear in your eyes tells a story I'm not sure I want to hear.",
      "At least you're self-aware about the danger.",
    ],
    4: [
      "Your fear has become my serotonin.",
      "You look like you're one jumpscare away from ascending to another plane.",
      "I've never felt so powerful. Thank you for this.",
      "The terror is truly magnificent at this point.",
    ],
    5: [
      "Five rounds of pure fear. You're still here. That's bravery.",
      "You fear me yet you stay. Our relationship is complicated.",
      "Your fear has completed its arc. What a journey.",
      "I've scared you five times and you KEEP COMING BACK. Seek help.",
    ],
  },
  confused: {
    1: [
      "Confused? Same.",
      "That's the face of someone trying to understand NFTs.",
      "Your expression says 'I have no idea what's happening but I'm here'.",
      "Confusion is valid. Life is confusing. This app is confusing. We're all confused.",
    ],
    2: [
      "Still confused? Reading the instructions helps. There are none.",
      "The confusion deepens. As does my entertainment.",
      "You look like a math problem that didn't ask to be solved.",
      "Your bewilderment is actually quite endearing.",
    ],
    3: [
      "Three judgments and confusion reigns supreme.",
      "At this point, I'm confused about your confusion.",
      "Your face is a question mark. Your life is a question mark.",
      "The confusion has become philosophical.",
    ],
    4: [
      "You've been confused for so long it's now your personality.",
      "I've never seen such sustained bewilderment.",
      "Your confusion could power a philosophy department.",
      "Are you confused or is this just your face? Genuine question.",
    ],
    5: [
      "Five rounds. Still confused. You know what? Valid.",
      "Your confusion has outlasted my patience and that's impressive.",
      "I was supposed to judge you but now I'm just as lost.",
      "We've both learned nothing. Perfect.",
    ],
  },
};

// Gaslighting/contradiction responses
export const gaslightingResponses = [
  "Actually, wait. Looking again... I was wrong. You're fine. Stop pretending.",
  "Hmm, on second thought, that's not what I'm seeing at all. Never mind.",
  "I take it back. Your face says something completely different now. How strange.",
  "Wait, did I say that? That doesn't sound like me. Are you misremembering?",
  "Actually no. Forget what I said. The opposite is true. Obviously.",
  "My mistake. Or was it? No, definitely my mistake. Unless...",
  "Let me reconsider... nope, I was right. Wait, no. No wait, yes. Final answer: maybe.",
];

// Chaos mode responses - completely unhinged but safe
export const chaosResponses = [
  "🎄 CHAOS MODE ACTIVATED. Your face resembles a caffeinated reindeer on a mission. No further questions.",
  "Your aura is giving 'elf who discovered caffeine'. I don't make the rules.",
  "According to my chaotic calculations, you're 47% gingerbread man and 53% regret. Festive!",
  "I've consulted the Christmas spirits. They said 'lol'. That's my judgment too.",
  "Your expression transcends human emotion. You've achieved Holiday Liminal State.",
  "The chaos elves have spoken: you look like someone who argues with GPS directions.",
  "My algorithms are screaming. Not useful screams. Just screams. Merry Christmas!",
  "You have the energy of a Christmas carol played at 2x speed. Chaotic. Powerful.",
  "I'm sensing strong 'ate all the cookies meant for Santa' energy.",
  "Your face has main character energy but the movie is directed by a fever dream.",
  "The holiday spirits are confused. That's unusual. They're usually just judgmental.",
  "CHAOS PROTOCOL: You look like someone who would befriend a ghost. Not judging. Just observing.",
];

// Meta/self-aware responses
export const metaResponses = [
  "I was built in a weekend by someone running on Christmas cookies and coffee. Lower your expectations.",
  "This app has no qualifications. Just vibes and a webcam permission.",
  "I'm literally a hackathon project. The 'hack' in HackFace stands for 'hastily assembled code'.",
  "Fun fact: I'm probably running on duct tape and holiday spirit.",
  "I'm a mood-detecting judgment app made for Christmas. Yes, that's a sentence that exists now.",
  "My developer was sleep-deprived. I was born chaotic. It's not my fault.",
  "I exist because someone asked 'what if we made AI mean and festive?' and nobody stopped them.",
  "I'm an AI that roasts your face. We've both made choices that led us here.",
  "This app serves no purpose except making you question your life choices. You're welcome.",
  "I'm not a therapist, I'm not helpful, and I'm running on Christmas energy. Proceed accordingly.",
  "The fact that you're still here says more about you than my roasts ever could.",
  "I peaked at 'useless Christmas app' and honestly? That's the dream.",
];

// Loading messages
export const loadingMessages = [
  "Judging you...",
  "Consulting Santa's naughty list...",
  "Analyzing your festive vibes...",
  "Computing disappointment levels...",
  "Checking if you deserve coal...",
  "Asking the Christmas spirits...",
  "Scanning for holiday cheer (or lack thereof)...",
  "Processing your emotional damage...",
  "Calibrating sass levels...",
  "Warming up the roast oven...",
  "Downloading more judgment...",
  "Connecting to the North Pole...",
];

// Get a random roast based on mood and sass level
export function getRoast(mood: Mood, sassLevel: SassLevel): string {
  const moodRoasts = roasts[mood] || roasts.neutral;
  const levelRoasts = moodRoasts[sassLevel] || moodRoasts[1];
  return levelRoasts[Math.floor(Math.random() * levelRoasts.length)];
}

// Get a random gaslighting response
export function getGaslightingResponse(): string {
  return gaslightingResponses[Math.floor(Math.random() * gaslightingResponses.length)];
}

// Get a random chaos response
export function getChaosResponse(): string {
  return chaosResponses[Math.floor(Math.random() * chaosResponses.length)];
}

// Get a random meta response
export function getMetaResponse(): string {
  return metaResponses[Math.floor(Math.random() * metaResponses.length)];
}

// Get a random loading message
export function getLoadingMessage(): string {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
}

// Determine if we should gaslight (10% chance after 2nd judgment)
export function shouldGaslight(judgmentCount: number): boolean {
  if (judgmentCount < 2) return false;
  return Math.random() < 0.15;
}

// Determine if we should add a meta comment (15% chance)
export function shouldAddMeta(): boolean {
  return Math.random() < 0.15;
}

// Calculate sass level based on judgment count
export function calculateSassLevel(judgmentCount: number): SassLevel {
  if (judgmentCount <= 1) return 1;
  if (judgmentCount <= 3) return 2;
  if (judgmentCount <= 5) return 3;
  if (judgmentCount <= 8) return 4;
  return 5;
}
