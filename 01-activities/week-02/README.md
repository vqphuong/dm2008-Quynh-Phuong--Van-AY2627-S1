# Week 2 — Control Flow and Interactivity

---

### Activities

| Activity | What I Made                   |
| -------- | ----------------------------- |
| `2a`     | I created a running thing that changes its shape based on position and interaction, and a background that also changes based on the key you press. |
| `2b`     | I created an interactive 2D grid pattern that responds to mouse movement. |

---

### This Week

I learnt how to use the loop, the conditions (if/else, switch), spacing, basically some interactivity and flow. This was a really difficult topic to me at first, but it gradually made more sense after a few application attempts (says jane 1 oct 2026, so it's like 20+ times).


---

### Output

![screenrecording](readme-assets/activity2a-screen-recording)
![screenshot](readme-assets/activity2a-screenshot1)
![screenshot](readme-assets/activity2a-screenshot2)
![screenrecording](readme-assets/activity2b-screen-recording)
![screenshot](readme-assets/activity2b-screenshot1)
![screenshot](readme-assets/activity2b-screenshot2)

---

<!-- ─────────────────────────────────────────────────────
     GOING FURTHER:

     ### 2a — Mode Switch
     ![screenshot](readme-assets/activity-1a.png)
     I tried using the loop to restart once it moves off-canvas. The program uses if/else to change the shape and color based on its position: when on the left half of the canvas it renders a red ellipse; when on the right half it renders a teal rectangle. Holding down any key while the shape is moving changes its color to yellow while retaining its position-based form. Pressing keys 1, 2, 3, or 4 changes the background color. I love the cyan/teal+red+yellow palette so that is why I chose this palette!

     ### 2b — Pattern Making
     ![screenshot](readme-assets/activity-1b.png)
     Okay this was such a fun work. It was just a few same code with exercise 1a but I managed to create a much more fun pattern! I realized if you put the sum of the row and the column positions the shape is in, it will move one either down or right, so it creates kind of a grid look. When I discovered this I felt like I was the master of coding already. The colour palette chosen also makes a lot of sense even though it was kind of random? Generally I really enjoyed the process of making this and satisfied with the result!

     ### 🧩 Something I Found Interesting
     The most fun thing I found when I was doing activity 1b is the grid pattern code:
     
     if ((column + row) % 2 == 0) {
        ellipse(x + 25, y + 25, 40);
      } else {
        rect(x + 25, y + 25, 40, 40);
   }
