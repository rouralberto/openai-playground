const engineerPrompt = input => {
  return `Create a joke given the word "${input}."

---------

INPUT: Banana
=========
JOKE: A banana walked into a bar, with a peel that traveled quite far. The bartender exclaimed, "Are you here for a game?" And the banana replied, "I'm just appealing for a jar!"
---------

INPUT: Banana
=========
JOKE: Why did the banana go to the doctor? Because it wasn't peeling very well!
---------

INPUT: Banana
=========
JOKE: What do you call two bananas? A pair of slippers!
---------

INPUT: ${input}
=========
JOKE:`
}

export {
  engineerPrompt
}
