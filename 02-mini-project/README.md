# Mini Project — Ducky Adventure

---

### The Project

Ducky Adventure is a narrative-driven version on classic Flappy Bird where a duck navigates the trials of hell to achieve reincarnation. Compared the scaffold, we remove the gradually smaller gaps between pipes. Instead, we added fast moving pipes, custom animated duck states, custom endings based on player's performance, and background music!

---

### Output

![screenshot](readme-assets/screenshot-01.png)

<!-- Drop a screenshot or GIF of your finished project.
     Save it to a readme-assets/ folder inside this project folder.
     Got more than one good screenshot? Add them. -->

[Watch Online](https://your-link-here)

<!-- Replace the link above with a URL to a screen recording or video of your project.
     ⚠️ Make sure the file or page is set to public before submitting. -->

---

### ✍️ Reflection

I'm responsible for:
- Ideation process: narrative, new features, flow.
- Creating the assets: fires, stones, different variations of Ducky, ending backgrounds, beginning background.
- Helping with the ghost asset's effect.
- Coding: 
+ Different endings for different collisions.
+ Helping with duck-column collision, background looping, speeding up.

In term of the assets, what we were aiming for is a pixelated-lookign assets with a hell-inspired colour palette (purple, yellow, orange, red). They turned out to be quite nice and close to our vision. And for game features, we did deliver most of our game's planned features successfully, except for one which I'll mention below. Generally, I'm very satisfied with how the game turned out!

Our code responds to keyboard inputs (pressing keys to make the duck flap) and mouse clicks (interacting with the start and game-over buttons). We approached this by using keyPressed() to trigger physics updates for the bird, and mouseIsPressed to make game state transitions.

My biggest challenge probably would be the coding for different endings. Hao Tong did try to deliver it before sending her parts to me, but it didn't turn out good. I don't even remember how much time I spent on this part, but honestly speaking, should be a large amount of time. It was what we were aiming in the very start so we don't really want to cut it out. At the end, the feeling of succcessfully coding something that really works after not being able to do it at first was really really satisfying, so I'm glad that I spent time on this:). However, I feel like there should be a better way to do it. Maybe sometimes in the future, after improving our coding skills, we would be able to improve this coding program much more!

Nevertheless, there is a feature that we decided to leave out after discussing. Half way through our creation process, Hao Tong and I realized we are incredibly terrible at games, and we keep losing when testing. So we came up with a "HP" thing, which will give players three chances to collide with the pipes before officially losing. If we have more time, maybe we would consider delivering on this!

<!-- 200–300 words on your process. Write freely — this isn't an essay.
     Some prompts to get you started:
     — What did you set out to make, and how did the result compare?
     — What inputs does your sketch respond to, and how did you approach that?
     — What was your biggest challenge, and how did you work through it?
     — What would you push further if you had more time? -->

---

### ✨ What I Changed

- Remove gradually smaller gaps
- Add music
- Add different endings
- Add fast moving pipes
- Redesign the visual language into dark fantasy pixel art.

---

### 🔍 Code Structure

- `sketch.js` — main game loop
- `assets` — images and sounds

---
### 🧩 Something I'm Proud Of

I figured out how to customize the endings based on the performances, particularly based on which pipe (image) Ducky hits. I used lots of conditions, and boolean, to deliver it. This may sound simple to others, but I'm extremely proud of myself for figuring this out as coding is very difficult to me!

hits(bird) {
    // This method also uses 'return' — coming up next week!
    const withinX = (bird.pos.x + bird.r > this.x) && (bird.pos.x - bird.r < this.x + this.w);
    const aboveGap = bird.pos.y - bird.r < this.top;
    const belowGap = bird.pos.y + bird.r > this.bottom;
    
    if (withinX && (aboveGap || belowGap)){
      let hitObject;
      if (aboveGap){
        hitObject = this.topImg;
      } else{
        hitObject= this.botImg;
      }

    if (hitObject === 2) {
      hitPipes = "caught";
    } else if (hitObject === 3) {
      hitPipes = "hurt";
    } else {
      hitPipes = "burn";
    }

    return true;
   }

   return false;
  }

---

### 🔗 References

For our narrative, we were actually inspired by Hao Tong's old rubber duck! It got broken in a random day during class, which you actually did give her a new one, but we were still quite sad because it has been by our sides for every past few difficult coding classes. So we thought the idea of making it reincarnate. That's what brought us the idea!

---

### Thanks for reading Kapi! Your class is really enjoyable (I'm being honest)!
