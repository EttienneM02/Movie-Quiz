(function () {
  "use strict";

  const questionNumber = new Map();
  const questionRows = [
    ["the-conjuring", "classic", "multiple-choice", "Who directed The Conjuring?", ["James Wan", "James Gunn", "David F. Sandberg", "Scott Derrickson"], 0, "James Wan directed The Conjuring."],
    ["the-conjuring", "classic", "true-false", "The Perron family move into a Rhode Island farmhouse.", ["True", "False"], 0, "The family move into a farmhouse in Harrisville, Rhode Island."],
    ["the-conjuring", "characters", "multiple-choice", "What are Ed and Lorraine Warren known for investigating?", ["Paranormal cases", "Art thefts", "Missing ships", "Political scandals"], 0, "Ed and Lorraine Warren were paranormal investigators."],
    ["the-conjuring", "quotes", "multiple-choice", "Quote context: Which investigator is especially known for her ability to sense spirits?", ["Lorraine Warren", "Carolyn Perron", "April Perron", "Andrea Perron"], 0, "Lorraine Warren has clairvoyant abilities."],
    ["the-conjuring", "what-happens-next", "multiple-choice", "After the family report disturbing events at home, who do they ask to investigate?", ["Ed and Lorraine Warren", "A team of reporters", "The local school principal", "A real-estate agent"], 0, "The Perrons ask the Warrens to investigate the activity in their home."],

    ["it", "classic", "multiple-choice", "What is the name of the town haunted by Pennywise?", ["Derry", "Castle Rock", "Haddonfield", "Woodsboro"], 0, "The story takes place in the fictional town of Derry, Maine."],
    ["it", "classic", "true-false", "The children who face Pennywise call themselves the Losers' Club.", ["True", "False"], 0, "The group of friends is known as the Losers' Club."],
    ["it", "characters", "multiple-choice", "Which member of the Losers' Club is Georgie's older brother?", ["Bill Denbrough", "Richie Tozier", "Ben Hanscom", "Eddie Kaspbrak"], 0, "Bill Denbrough is Georgie's older brother."],
    ["it", "quotes", "multiple-choice", "Quote context: Which character lures Georgie toward a storm drain?", ["Pennywise", "Bill Denbrough", "Ben Hanscom", "Mike Hanlon"], 0, "Pennywise appears to Georgie by the storm drain."],
    ["it", "what-happens-next", "multiple-choice", "After Georgie disappears, what does Bill become determined to do?", ["Find out what happened to Georgie", "Leave Derry for good", "Join the town's police force", "Build a new paper boat"], 0, "Bill's search for answers brings the Losers' Club into conflict with Pennywise."],

    ["a-quiet-place", "classic", "multiple-choice", "What sense do the creatures rely on to find their prey?", ["Hearing", "Smell", "Sight", "Touch"], 0, "The creatures hunt by listening for sound."],
    ["a-quiet-place", "classic", "true-false", "The Abbott family communicate using sign language.", ["True", "False"], 0, "The family use sign language to communicate quietly."],
    ["a-quiet-place", "characters", "multiple-choice", "Who is the father of the Abbott family?", ["Lee Abbott", "Emmett", "Marcus Abbott", "Beau Abbott"], 0, "Lee Abbott is the children's father."],
    ["a-quiet-place", "quotes", "multiple-choice", "Quote context: Which family member discovers that her hearing device can affect the creatures?", ["Regan Abbott", "Evelyn Abbott", "Marcus Abbott", "Lee Abbott"], 0, "Regan's hearing device produces feedback that can disrupt the creatures."],
    ["a-quiet-place", "what-happens-next", "multiple-choice", "When the family realizes the creatures are close, what is their safest response?", ["Stay silent and hide", "Use a loud alarm", "Turn on every light", "Call out to one another"], 0, "The creatures are drawn to sound, so silence is essential to survival."],

    ["interstellar", "classic", "multiple-choice", "What is Cooper's profession before joining the space mission?", ["Pilot and former engineer", "Marine biologist", "Doctor", "School teacher"], 0, "Cooper is a former NASA pilot and engineer who farms before the mission."],
    ["interstellar", "classic", "true-false", "The crew travel through a wormhole near Saturn.", ["True", "False"], 0, "The wormhole near Saturn provides access to another galaxy."],
    ["interstellar", "characters", "multiple-choice", "What is the name of Cooper's daughter?", ["Murph", "Amelia", "Brand", "Lois"], 0, "Cooper's daughter is Murphy, usually called Murph."],
    ["interstellar", "quotes", "multiple-choice", "Quote context: Which scientist leads the mission to find a new home for humanity?", ["Professor Brand", "Dr. Mann", "Dr. Doyle", "Dr. Romilly"], 0, "Professor Brand leads the NASA effort to find a habitable planet."],
    ["interstellar", "what-happens-next", "multiple-choice", "After leaving Earth, what does the crew use to reach the distant planetary systems?", ["A wormhole near Saturn", "A portal beneath the ocean", "A station orbiting Mars", "A ship hidden on the Moon"], 0, "The mission travels through a wormhole positioned near Saturn."],

    ["the-matrix", "classic", "multiple-choice", "What is Neo's everyday name before he learns the truth about the Matrix?", ["Thomas Anderson", "Morpheus", "Agent Smith", "Cypher"], 0, "Neo is known as Thomas Anderson in his ordinary life."],
    ["the-matrix", "classic", "true-false", "Morpheus offers Neo a choice that can reveal the truth about his reality.", ["True", "False"], 0, "Morpheus gives Neo a choice to learn what the Matrix really is."],
    ["the-matrix", "characters", "multiple-choice", "Who is the leader searching for the person known as the One?", ["Morpheus", "Agent Smith", "Cypher", "Tank"], 0, "Morpheus believes Neo may be the One."],
    ["the-matrix", "quotes", "multiple-choice", "Quote context: Which character offers Neo a way to learn what the Matrix is?", ["Morpheus", "Trinity", "Agent Smith", "Cypher"], 0, "Morpheus introduces Neo to the truth about the Matrix."],
    ["the-matrix", "what-happens-next", "multiple-choice", "After Neo joins Morpheus's crew, what does he begin learning?", ["How to challenge the Matrix's rules", "How to pilot the Nebuchadnezzar through space", "How to become an Agent", "How to return to his office job"], 0, "Neo trains to understand and eventually bend the simulated world's rules."],

    ["alien", "classic", "multiple-choice", "What is the name of the commercial spacecraft in Alien?", ["Nostromo", "Sulaco", "Narcissus", "Prometheus"], 0, "The crew are returning aboard the Nostromo."],
    ["alien", "classic", "true-false", "The alien life-form is brought aboard after attaching itself to Kane.", ["True", "False"], 0, "A facehugger attaches to Kane, and the creature later emerges aboard the ship."],
    ["alien", "characters", "multiple-choice", "Who is the warrant officer who becomes the story's central survivor?", ["Ellen Ripley", "Lambert", "Dallas", "Ash"], 0, "Ellen Ripley is the warrant officer who confronts the creature."],
    ["alien", "quotes", "multiple-choice", "Quote context: Which crew member is later revealed to be an android?", ["Ash", "Dallas", "Parker", "Brett"], 0, "Ash is the Nostromo's science officer and is secretly an android."],
    ["alien", "what-happens-next", "multiple-choice", "After Kane is attacked on the alien world, what does the crew do?", ["Bring him back aboard the Nostromo", "Leave him alone on the planet", "Destroy the Nostromo", "Return directly to Earth without him"], 0, "The crew bring Kane back to the ship despite quarantine concerns."],

    ["john-wick", "classic", "multiple-choice", "What is the name of John Wick's beagle puppy?", ["Daisy", "Ruby", "Bella", "Luna"], 0, "Daisy is the puppy left to John by his late wife."],
    ["john-wick", "classic", "true-false", "John Wick is a retired professional assassin when the film begins.", ["True", "False"], 0, "John has left his former life behind when the story begins."],
    ["john-wick", "characters", "multiple-choice", "Who is the crime boss whose son provokes John's return to the underworld?", ["Viggo Tarasov", "Aurelio", "Winston", "Marcus"], 0, "Viggo Tarasov is the crime boss and Iosef's father."],
    ["john-wick", "quotes", "multiple-choice", "Quote context: Which hotel provides neutral ground for members of the assassin underworld?", ["The Continental", "The Ritz", "The Plaza", "The Overlook"], 0, "The Continental is a hotel with strict rules for the underworld."],
    ["john-wick", "what-happens-next", "multiple-choice", "After Iosef's men break into John's home, what loss sparks John's pursuit?", ["His puppy is killed", "His car is destroyed in a race", "His house is sold", "His former partner disappears"], 0, "The attack on John includes the killing of Daisy, prompting his return to action."],

    ["mad-max-fury-road", "classic", "multiple-choice", "Who drives the War Rig across the wasteland?", ["Imperator Furiosa", "The Dag", "Toast", "Capable"], 0, "Imperator Furiosa is the War Rig's driver."],
    ["mad-max-fury-road", "classic", "true-false", "Max joins Furiosa as she tries to escape Immortan Joe's forces.", ["True", "False"], 0, "Max and Furiosa become reluctant allies during the escape."],
    ["mad-max-fury-road", "characters", "multiple-choice", "Who rules the Citadel and pursues Furiosa?", ["Immortan Joe", "The People Eater", "The Bullet Farmer", "Nux"], 0, "Immortan Joe is the Citadel's ruler."],
    ["mad-max-fury-road", "quotes", "multiple-choice", "Quote context: Which character is seeking a homeland remembered from her childhood?", ["Furiosa", "Toast", "The Dag", "Capable"], 0, "Furiosa's journey is tied to finding the Green Place from her past."],
    ["mad-max-fury-road", "what-happens-next", "multiple-choice", "After Furiosa discovers the Green Place is gone, where does the group decide to go?", ["Back to the Citadel", "Across the sea", "To the Bullet Farm", "Back to the war party"], 0, "They return to the Citadel, which is left vulnerable in Joe's absence."],

    ["die-hard", "classic", "multiple-choice", "Where does most of Die Hard take place?", ["Nakatomi Plaza", "The Empire State Building", "The White House", "LAX Airport"], 0, "The action unfolds in the Nakatomi Plaza skyscraper."],
    ["die-hard", "classic", "true-false", "John McClane is visiting Los Angeles when the Nakatomi building is taken over.", ["True", "False"], 0, "McClane is in Los Angeles to visit his estranged wife."],
    ["die-hard", "characters", "multiple-choice", "Who leads the group that takes over Nakatomi Plaza?", ["Hans Gruber", "Karl", "Theo", "Eddie"], 0, "Hans Gruber leads the group posing as terrorists."],
    ["die-hard", "quotes", "multiple-choice", "Quote context: Which character helps John communicate with the police from outside the building?", ["Sergeant Al Powell", "Deputy Chief Robinson", "Harry Ellis", "Joseph Takagi"], 0, "Sergeant Al Powell becomes John's main contact with the police."],
    ["die-hard", "what-happens-next", "multiple-choice", "After discovering the takeover, what does John do to warn people outside?", ["Finds a way to signal for help", "Leaves the building by the front entrance", "Joins Hans's group", "Calls his wife from the rooftop"], 0, "John uses the building's communication systems and other signals to alert the authorities."],

    ["titanic", "classic", "multiple-choice", "Where does Titanic's maiden voyage begin?", ["Southampton", "New York", "Liverpool", "Boston"], 0, "The ship begins its maiden voyage in Southampton, England."],
    ["titanic", "classic", "true-false", "Rose travels aboard the Titanic with her mother and fiancé.", ["True", "False"], 0, "Rose is travelling with her mother and her fiancé, Cal."],
    ["titanic", "characters", "multiple-choice", "Who is Rose engaged to when she meets Jack?", ["Cal Hockley", "Thomas Andrews", "Brock Lovett", "Fabrizio"], 0, "Rose is engaged to the wealthy Cal Hockley."],
    ["titanic", "quotes", "multiple-choice", "Quote context: Which character is an artist travelling in third class?", ["Jack Dawson", "Cal Hockley", "Thomas Andrews", "J. Bruce Ismay"], 0, "Jack Dawson is an artist who wins his ticket in a card game."],
    ["titanic", "what-happens-next", "multiple-choice", "After the iceberg collision, what becomes the crew's urgent priority?", ["Getting passengers into lifeboats", "Returning to Southampton", "Moving the ship to a dry dock", "Finding the ship's owner"], 0, "The crew work to evacuate passengers as the ship begins to sink."],

    ["the-notebook", "classic", "multiple-choice", "What is Noah's surname?", ["Calhoun", "Hamilton", "Whitmore", "Parker"], 0, "Noah Calhoun is the film's central male character."],
    ["the-notebook", "classic", "true-false", "The story is framed by an older man reading from a notebook.", ["True", "False"], 0, "The older Noah reads their story to Allie from a notebook."],
    ["the-notebook", "characters", "multiple-choice", "What is the name of Noah's great love?", ["Allie Hamilton", "Martha Shaw", "Lily Calhoun", "Sarah Whitmore"], 0, "Allie Hamilton and Noah are the central couple."],
    ["the-notebook", "quotes", "multiple-choice", "Quote context: Which character reads the story of Noah and Allie's romance aloud?", ["Noah", "Lon", "Frank", "Fin"], 0, "Older Noah reads the notebook to Allie."],
    ["the-notebook", "what-happens-next", "multiple-choice", "After Noah returns from the war, what does he do with the old house Allie once admired?", ["Restores it", "Turns it into a school", "Moves it to Charleston", "Sells it immediately"], 0, "Noah restores the house, fulfilling a promise connected to Allie."],

    ["la-la-land", "classic", "multiple-choice", "What is Mia pursuing in Los Angeles?", ["An acting career", "A career as a chef", "A career in law", "A career as a pilot"], 0, "Mia is an aspiring actor who works at a coffee shop."],
    ["la-la-land", "classic", "true-false", "Sebastian dreams of opening a jazz club.", ["True", "False"], 0, "Sebastian hopes to preserve his love of jazz by opening his own club."],
    ["la-la-land", "characters", "multiple-choice", "Who plays Sebastian, the jazz pianist?", ["Ryan Gosling", "John Legend", "J. K. Simmons", "Tom Everett Scott"], 0, "Ryan Gosling plays Sebastian."],
    ["la-la-land", "quotes", "multiple-choice", "Quote context: Which character is determined to keep a traditional jazz club alive?", ["Sebastian", "Mia", "Keith", "Greg"], 0, "Sebastian's goal is to open a club devoted to jazz."],
    ["la-la-land", "what-happens-next", "multiple-choice", "After Mia's one-woman play receives little attention, what does she decide to do?", ["Return home to Nevada", "Move to New York", "Join Sebastian's band", "Give up acting permanently"], 0, "Mia returns home discouraged, before Sebastian later urges her to audition."],

    ["se7en", "classic", "multiple-choice", "What theme connects the serial killer's crimes in Se7en?", ["The seven deadly sins", "The seven wonders", "The days of the week", "The stages of grief"], 0, "The murders are designed around the seven deadly sins."],
    ["se7en", "classic", "true-false", "Detective Somerset is close to retirement.", ["True", "False"], 0, "Somerset is a veteran detective nearing retirement."],
    ["se7en", "characters", "multiple-choice", "Who is the younger detective paired with Somerset?", ["David Mills", "John Doe", "Martin Talbot", "Richard Schorr"], 0, "Detective David Mills is Somerset's new partner."],
    ["se7en", "quotes", "multiple-choice", "Quote context: Which character is the detective obsessed with staging murders around the sins?", ["John Doe", "David Mills", "William Somerset", "Captain Ramey"], 0, "John Doe is the killer behind the carefully staged crimes."],
    ["se7en", "what-happens-next", "multiple-choice", "After the first crime scene, what do Somerset and Mills realize about the case?", ["The crimes follow a deliberate pattern", "The suspect has left the country", "The victims all work at the same office", "The case is an accidental series of deaths"], 0, "The detectives connect the murders to the seven deadly sins."],

    ["gone-girl", "classic", "multiple-choice", "What is the name of Nick Dunne's missing wife?", ["Amy", "Andie", "Margo", "Desi"], 0, "Amy Dunne disappears on her wedding anniversary."],
    ["gone-girl", "classic", "true-false", "The story's investigation is set in Missouri.", ["True", "False"], 0, "Nick and Amy live in North Carthage, Missouri."],
    ["gone-girl", "characters", "multiple-choice", "Who is Nick's twin sister?", ["Margo", "Amy", "Greta", "Marybeth"], 0, "Margo, known as Go, is Nick's twin sister."],
    ["gone-girl", "quotes", "multiple-choice", "Quote context: Which character writes a diary that shapes the public's view of the marriage?", ["Amy", "Margo", "Andie", "Ellen Abbott"], 0, "Amy's diary becomes a key part of the story's account of her marriage."],
    ["gone-girl", "what-happens-next", "multiple-choice", "After Amy disappears, what does Nick become as the investigation draws public attention?", ["A leading suspect", "The lead detective", "A witness in another state", "A private investigator"], 0, "Evidence and media coverage turn suspicion toward Nick."],

    ["shutter-island", "classic", "multiple-choice", "What is the name of the island hospital in Shutter Island?", ["Ashecliffe Hospital", "Arkham Hospital", "Blackgate Hospital", "Northmoor Hospital"], 0, "The missing-patient investigation takes place at Ashecliffe Hospital."],
    ["shutter-island", "classic", "true-false", "Teddy Daniels travels to the island to investigate a missing patient.", ["True", "False"], 0, "Teddy and his partner are sent to investigate Rachel Solando's disappearance."],
    ["shutter-island", "characters", "multiple-choice", "Who is Teddy Daniels's partner on the investigation?", ["Chuck Aule", "Dr. Cawley", "George Noyce", "Andrew Laeddis"], 0, "Chuck Aule accompanies Teddy to the island."],
    ["shutter-island", "quotes", "multiple-choice", "Quote context: Which doctor directs the hospital where the investigation takes place?", ["Dr. Cawley", "Dr. Sheehan", "Dr. Naehring", "Dr. Lester"], 0, "Dr. John Cawley is the chief physician at Ashecliffe."],
    ["shutter-island", "what-happens-next", "multiple-choice", "After a storm cuts off the island, what happens to Teddy and Chuck's investigation?", ["They continue searching the hospital and its grounds", "They take a ferry back to the mainland", "They arrest the hospital director", "They abandon the missing-patient case"], 0, "The storm strands them, and they continue investigating Ashecliffe."],

    ["the-conjuring", "classic", "multiple-choice", "In which U.S. state is the Perron farmhouse?", ["Rhode Island", "Maine", "Vermont", "Connecticut"], 0, "The Perron family live in Rhode Island."],
    ["the-conjuring", "characters", "multiple-choice", "Which Warren investigator is a clairvoyant?", ["Lorraine", "Ed", "Both daughters", "Carolyn"], 0, "Lorraine Warren is the clairvoyant member of the investigative team."],
    ["the-conjuring", "what-happens-next", "multiple-choice", "After the Warrens investigate the farmhouse, what do they seek permission to do?", ["Perform an exorcism", "Move the family to London", "Demolish the house", "Close the local church"], 0, "The Warrens seek church approval for an exorcism."],

    ["it", "classic", "multiple-choice", "What form does Pennywise most often take?", ["A clown", "A wolf", "A scarecrow", "A house cat"], 0, "Pennywise commonly appears as a clown."],
    ["it", "characters", "multiple-choice", "Which Loser is known for telling jokes and talking quickly?", ["Richie Tozier", "Ben Hanscom", "Stanley Uris", "Mike Hanlon"], 0, "Richie Tozier is the group's fast-talking jokester."],
    ["it", "what-happens-next", "multiple-choice", "When the friends discover they are each seeing the same threat, what do they decide to do?", ["Face it together", "Leave town separately", "Ask Pennywise for help", "Forget what happened"], 0, "The Losers join forces after realizing the threat is shared."],

    ["a-quiet-place", "classic", "multiple-choice", "What is the name of the family at the center of the story?", ["The Abbotts", "The Millers", "The Bakers", "The Carters"], 0, "The family's surname is Abbott."],
    ["a-quiet-place", "characters", "multiple-choice", "Who is the eldest Abbott child?", ["Regan", "Marcus", "Beau", "Evelyn"], 0, "Regan is Lee and Evelyn Abbott's eldest child."],
    ["a-quiet-place", "what-happens-next", "multiple-choice", "What does the family use to mark out safe paths through their home?", ["Sand", "Broken glass", "Paint", "Paper signs"], 0, "They lay down sand to soften their footsteps."],

    ["interstellar", "classic", "multiple-choice", "What is the name of Cooper's son?", ["Tom", "Murph", "Doyle", "Mann"], 0, "Tom is Cooper's son and Murph's brother."],
    ["interstellar", "characters", "multiple-choice", "Who is the scientist accompanying Cooper on the mission?", ["Amelia Brand", "Murphy Cooper", "Lois Cooper", "Professor Mann"], 0, "Dr. Amelia Brand joins Cooper on the mission."],
    ["interstellar", "what-happens-next", "multiple-choice", "After the crew land on Miller's planet, what makes time pass differently there?", ["The planet's proximity to Gargantua", "Its distance from the Sun", "The planet's fast rotation", "A damaged ship clock"], 0, "Miller's planet orbits close to the massive black hole Gargantua."],

    ["the-matrix", "classic", "multiple-choice", "What color pill does Neo take to learn the truth?", ["Red", "Blue", "Green", "Yellow"], 0, "Neo chooses the red pill."],
    ["the-matrix", "characters", "multiple-choice", "Who is the skilled hacker and fighter who helps Morpheus rescue Neo?", ["Trinity", "Switch", "Oracle", "Mouse"], 0, "Trinity helps Morpheus find and free Neo."],
    ["the-matrix", "what-happens-next", "multiple-choice", "After Neo takes the red pill, what does he discover?", ["The world he knew is a simulation", "He has been elected president", "Morpheus is an Agent", "The city has been abandoned"], 0, "The red pill reveals the simulated nature of Neo's reality."],

    ["alien", "classic", "multiple-choice", "What is the name of the ship's onboard computer?", ["Mother", "Father", "Nostromo", "Ash"], 0, "The Nostromo's computer is referred to as Mother."],
    ["alien", "characters", "multiple-choice", "Who is the Nostromo's captain?", ["Dallas", "Parker", "Brett", "Lambert"], 0, "Dallas is the captain of the Nostromo."],
    ["alien", "what-happens-next", "multiple-choice", "After the crew discover the signal, where do they go to investigate it?", ["A nearby planetoid", "Earth's Moon", "A space station", "A colony on Mars"], 0, "The crew investigate the signal on the nearby planetoid."],

    ["john-wick", "classic", "multiple-choice", "What kind of car does John Wick own?", ["A vintage Ford Mustang", "A red Ferrari", "A motorcycle", "A yellow taxi"], 0, "John owns a vintage Ford Mustang."],
    ["john-wick", "characters", "multiple-choice", "Who is the manager of the New York Continental?", ["Winston", "Viggo", "Aurelio", "Marcus"], 0, "Winston manages the New York Continental hotel."],
    ["john-wick", "what-happens-next", "multiple-choice", "After returning to his old life, where does John go to obtain weapons?", ["The Continental's armory", "A police station", "A city museum", "The Tarasov family home"], 0, "John uses the services and facilities of the Continental."],

    ["mad-max-fury-road", "classic", "multiple-choice", "What is the name of Max's former police unit?", ["The Main Force Patrol", "The Desert Guard", "The Citadel Watch", "The Road Rangers"], 0, "Max was a member of the Main Force Patrol."],
    ["mad-max-fury-road", "characters", "multiple-choice", "What is Nux's role among Immortan Joe's followers?", ["A War Boy", "A Citadel doctor", "A mechanic for Furiosa", "A Vuvalini elder"], 0, "Nux is one of Immortan Joe's War Boys."],
    ["mad-max-fury-road", "what-happens-next", "multiple-choice", "When the War Rig reaches the swamp, what does Furiosa learn about the Green Place?", ["It has become uninhabitable", "It is ruled by Immortan Joe", "It is across the ocean", "It has never existed"], 0, "The Green Place has become a toxic swamp."],

    ["die-hard", "classic", "multiple-choice", "What is John McClane's wife's name?", ["Holly", "Lucy", "Margo", "Rachel"], 0, "John's wife is Holly Gennaro McClane."],
    ["die-hard", "characters", "multiple-choice", "What is the name of the police officer who speaks with John over the radio?", ["Al Powell", "Richard Thornburg", "Dwayne Robinson", "Harry Ellis"], 0, "Sergeant Al Powell maintains radio contact with John."],
    ["die-hard", "what-happens-next", "multiple-choice", "What does John send down the elevator shaft to get the attention of the police?", ["A body with a message", "A briefcase of money", "A fire extinguisher", "A radio"], 0, "John sends a body down with a message for the police outside."],

    ["titanic", "classic", "multiple-choice", "What is the name of the ship's designer?", ["Thomas Andrews", "J. Bruce Ismay", "Captain Smith", "Brock Lovett"], 0, "Thomas Andrews is the ship's designer."],
    ["titanic", "characters", "multiple-choice", "Who is the captain of the Titanic?", ["Edward John Smith", "Thomas Andrews", "Cal Hockley", "Brock Lovett"], 0, "Captain Edward John Smith commands the Titanic."],
    ["titanic", "what-happens-next", "multiple-choice", "After Jack helps Rose at the ship's stern, what does she invite him to do?", ["Join her for dinner", "Take the next lifeboat", "Meet her family in Paris", "Leave the ship"], 0, "Rose invites Jack to dinner after he saves her."],

    ["the-notebook", "classic", "multiple-choice", "Which U.S. state is the story primarily set in?", ["South Carolina", "California", "Oregon", "New York"], 0, "Noah and Allie's story is set in South Carolina."],
    ["the-notebook", "characters", "multiple-choice", "What is the name of Allie's fiancé?", ["Lon Hammond", "Frank Calhoun", "Duke Whitmore", "John Hamilton"], 0, "Lon Hammond is Allie's fiancé."],
    ["the-notebook", "what-happens-next", "multiple-choice", "After seeing Noah's restored house in the newspaper, what does Allie decide to do?", ["Visit him", "Move overseas", "Sell her paintings", "Cancel her wedding immediately"], 0, "Allie visits Noah after seeing the house featured in the paper."],

    ["la-la-land", "classic", "multiple-choice", "In which city does La La Land take place?", ["Los Angeles", "Chicago", "New York", "San Francisco"], 0, "The story follows its characters in Los Angeles."],
    ["la-la-land", "characters", "multiple-choice", "What is the name of Mia's aunt who inspired her love of acting?", ["Auntie", "Martha", "Laura", "Sarah"], 0, "Mia's aunt inspired her to pursue acting."],
    ["la-la-land", "what-happens-next", "multiple-choice", "After Mia leaves Los Angeles, what does Sebastian do when he learns she has an audition?", ["Finds her and encourages her to attend", "Leaves the country", "Closes his jazz club", "Auditions in her place"], 0, "Sebastian encourages Mia to return for the audition."],

    ["se7en", "classic", "multiple-choice", "What is Detective Somerset's first name?", ["William", "David", "John", "Michael"], 0, "Somerset's first name is William."],
    ["se7en", "characters", "multiple-choice", "What is the name of Detective Mills's wife?", ["Tracy", "Amy", "Susan", "Helen"], 0, "Tracy Mills is David Mills's wife."],
    ["se7en", "what-happens-next", "multiple-choice", "After the detectives identify the pattern of the crimes, what do they use to search for the suspect?", ["Library research and case files", "A list of known bank robbers", "A ship's passenger manifest", "A city-wide traffic map"], 0, "Somerset researches books connected to the seven deadly sins."],

    ["gone-girl", "classic", "multiple-choice", "What is the name of Nick's twin sister?", ["Margo", "Amy", "Andie", "Greta"], 0, "Nick's twin sister is Margo, nicknamed Go."],
    ["gone-girl", "characters", "multiple-choice", "Who is the detective leading the investigation into Amy's disappearance?", ["Rhonda Boney", "Margo Dunne", "Ellen Abbott", "Greta"], 0, "Detective Rhonda Boney leads the investigation."],
    ["gone-girl", "what-happens-next", "multiple-choice", "What does Amy plan to do after staging her disappearance?", ["Start a new life under an assumed identity", "Return to her childhood home", "Join the police investigation", "Move in with Nick's sister"], 0, "Amy stages her disappearance and attempts to begin again under another identity."],

    ["shutter-island", "classic", "multiple-choice", "Who directed Shutter Island?", ["Martin Scorsese", "David Fincher", "Christopher Nolan", "Steven Spielberg"], 0, "Martin Scorsese directed Shutter Island."],
    ["shutter-island", "characters", "multiple-choice", "What is the name of the missing patient Teddy is asked to find?", ["Rachel Solando", "Dolores Chanal", "Mrs. Kearns", "Nurse Glessner"], 0, "Rachel Solando is the patient whose disappearance begins the investigation."],
    ["shutter-island", "what-happens-next", "multiple-choice", "After Teddy explores the hospital, what does he begin to suspect about the island?", ["The staff are concealing information", "The island is a holiday resort", "The patients have all escaped", "The investigation is over"], 0, "Teddy grows suspicious of the hospital staff and their explanations."]
  ];

  window.MovieQuizQuestions = questionRows.map((row) => {
    const [movieId, mode, type, question, choices, correctIndex, explanation] = row;
    const nextNumber = (questionNumber.get(movieId) || 0) + 1;
    questionNumber.set(movieId, nextNumber);
    const answers = choices.map((text, index) => ({
      id: `answer-${index + 1}`,
      text,
      correct: index === correctIndex
    }));

    return {
      id: `${movieId}-q${String(nextNumber).padStart(2, "0")}`,
      movieId,
      mode,
      type,
      difficulty: ["easy", "medium", "medium", "hard", "expert", "easy", "medium", "hard"][nextNumber - 1] || "medium",
      question,
      answers,
      correctAnswer: answers[correctIndex].id,
      explanation
    };
  });
})();
