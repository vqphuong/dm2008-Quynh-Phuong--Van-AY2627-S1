# Week 3 — Arrays, Functions and Transformations

---

### Activities

| Activity | What I Made                   |
| -------- | ----------------------------- |
| `3a`     | I created a row of ellipses that changed sizes and colours randomly when key pressed, with a background that changed colour based on the cursor position. |
| `3b`     | I created a pattern of cherry blossoms, which they rotate on their own. |

---

### This Week

This week, I have learnt about arrays (one of the my favorite features to be honest), function, anchors, rotation, push/pop/splice, scale. This week lesson was honestly not that difficult to pick up, but it was really helpful in a lot of my later coding projects.

---

### Output

![screenrecording](readme-assets/activity3a-screen-recording)
![screenshot](readme-assets/activity3a-screenshot1)
![screenshot](readme-assets/activity3a-screenshot2)
![screenrecording](readme-assets/activity3b-screen-recording)
![screenshot](readme-assets/activity3b-screenshot1)
![screenshot](readme-assets/activity3b-screenshot2)

---

### 3a — Arrays Samplers    
![screenshot](readme-assets/activity3a-screenshot1) 
This code renders a row of evenly spaced circles whose colors and sizes are chosen from custom arrays. Clicking the mouse randomly gives new values from these arrays to update the shape properties, while moving the cursor alters the background color. Press "a" to add 1 circle, and press any other key to delete 1 circle.

---

### 3b — One Function Wonders   
![screenshot](readme-assets/activity3b-screenshot1)  
For this activity, I designed a custom flower function, used push() and pop() alongside translate() and rotate() to isolate coordinate systems for individual flowers. This allows each flower to rotate smoothly around its own center point. I used an angle variable (angle += 0.001) inside the drawing loop so the flowers feature a gentle spinning animation over time. The aesthetic is inspired by the Japanese cherry blossoms, which I think is very delicate and gentle.

---

### 🧩 Something I Found Interesting
When I was trying to do the rotation of the flower, I didn't figure out how to make it rotate around its own center. Instead, they go in a big circular path. Actually, I thought it was really interesting, and assembles more of the Japanese aesthetic. But thinking of the mod as a coding mod, I decided to try to make it rotate on its own to improve my own coding skills:).
![screenshot](readme-assets/activity3b-funError)