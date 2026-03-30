# Aeolian Memories: Texture of Deep Time
<img width="2999" height="1544" alt="AM" src="https://github.com/user-attachments/assets/5736343f-e2a7-4fef-91f9-06c92a3fdd31" />



## Short Description
**Aeolian Memories** is a generative artwork that simulates the incremental processes of wind erosion and sedimentary layering. It aims to materialize the abstract concept of "Deep Time" into a tangible digital texture, transforming a canvas into a long-term temporal record.

## Concept / Intent
The project is a computational exploration of geological scales that exceed human lifespans. 
* **Deep Time:** Inspired by John McPhee’s *Annals of the Former World*, the work treats the digital canvas as a metamorphic substrate where time is recorded physically rather than measured abstractly.
* **Yardang Geomorphology:** The visual logic mimics the ridges and furrows of Yardang landforms, created by the relentless interaction between prevailing winds and varying mineral hardness.
* **Artistic Context:** Drawing on Robert Smithson’s *A Sedimentation of the Mind*, the project frames "entropy" and "accumulation" as artistic tools. By using a near-zero background refresh rate, every particle trace is preserved, creating a "sedimentary" effect where history is compressed into visual density.

## Technology Used
* **p5.js:** The primary framework used for high-density particle simulation and canvas manipulation.
* **Agent-Based Modeling:** A system of 8,000 autonomous "Grains" that respond to a simulated flow field.
* **Perlin Noise:** Utilized to generate the underlying "wind" vectors and organic, non-linear movement patterns.
* **p5.sound:** Implements a dynamic audio environment using a **Pink Noise** generator and a **LowPass Filter**. The audio resonance and frequency are mapped to the real-time velocity of the particles to simulate wind howling.

## How to Run / Install
1. **Environment:** Open the project in the [p5.js Web Editor](https://editor.p5js.org/) or any local server environment.
2. **Audio Initialization:** Click anywhere on the canvas after the sketch loads to enable the audio context.
3. **Controls:**
    - Press **"F"** to toggle Fullscreen mode (optimized for gallery projection).
    - Note: Resizing the window will automatically trigger a `resetSketch()` to recalibrate the density for the new resolution.





## Requirements
* **Tech Stack:** JavaScript (p5.js library).
* **Libraries:** `p5.js` (v1.x) and `p5.sound.js`.
* **Browser:** Modern browsers with Canvas API support (Chrome, Firefox, or Safari).
* **Display:** Optimized for high-contrast projection on physical surfaces (e.g., white gallery walls).

## Screenshots / Media
<img width="1288" height="523" alt="Group 19" src="https://github.com/user-attachments/assets/a2b8b47d-3420-4b91-b4fe-231a9bc95732" />
<img width="1288" height="630" alt="Group 20" src="https://github.com/user-attachments/assets/2142bc0c-ebb8-438d-9103-af119aa56504" />
<img width="1288" height="873" alt="b6528b8ecb5721d981aeb48d70f986d 2" src="https://github.com/user-attachments/assets/5e675c51-e8ef-4aa4-8ef0-af7e5fa2bed8" />



<img width="3024" height="2416" alt="pinup03" src="https://github.com/user-attachments/assets/0e72e8e0-0708-4378-bb5f-21829689cf0f" />




## Credits / Acknowledgements
* **Author:** Huayang Lei
* **Technical References:**
    - *Slime Molds* by Patt Vira (logic for autonomous agent sensing). https://p5js.org/sketches/2213463/
    - *The Nature of Code* by Daniel Shiffman (autonomous agents and vector math). https://natureofcode.com/particles/
* **Conceptual References:**
    - John McPhee, *Annals of the Former World*.
    - Vincent Ialenti, *Deep Time Reckoning*.
    - Robert Smithson, *A Sedimentation of the Mind: Earth Projects*.


## Contact / Links
* **Demo Video:** https://vimeo.com/1153542734?share=copy&fl=sv&fe=ci
* **GitHub Repository:** https://github.com/vvalhy/aeolian_memories_vva.git
