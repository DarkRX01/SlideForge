# The Ultimate Prompt for SlideForge

Use this prompt in SlideForge’s AI slide generator (e.g. with Ollama/Llama3) to produce a full-featured 15-slide deck that exercises AI slide gen, image synthesis, animations, multilingual support, and exports. Run everything **offline** – no cloud.

---

## Copy-paste prompt

```
Generate a professional, high-impact 15-slide presentation on "The Future of AI in Creative Industries" in English with optional Spanish translations for key points. Start with a title slide featuring a futuristic AI-generated image of a robot artist painting a canvas – use Stable Diffusion to create it with prompt: "cyberpunk robot artist blending digital and traditional art on a glowing canvas, vibrant colors, high detail".

Slide 2-3: Introduction to AI's role in art, music, and film; include bullet points on history, current trends, and stats (e.g., AI-generated art market projected to hit $1B by 2030). Add fade-in animations for bullets and a particle effect zoom on embedded images – pull one from local Stable Diffusion: "AI composing symphony in neon-lit studio".

Slide 4-7: Deep dive sections – AI in visual arts (e.g., tools like Midjourney but emphasize local alternatives like Stable Diffusion); AI in music (e.g., generating beats with models); AI in filmmaking (scripting, VFX). For each, include pros/cons tables, multilingual RTL support if needed, and AI-translated summaries via LibreTranslate. Insert custom images: "AI director filming holographic scene" for film slide. Use GSAP for slide-in transitions and Three.js for a 3D rotate on diagrams.

Slide 8-10: Case studies – Real-world examples like AI art at auctions, AI-composed albums, deepfake ethics in movies. Embed audio clips if possible via text-to-speech (eSpeak-ng) for quotes, and add speech-to-text transcription notes from a sample audio input. Animate with zoom effects and layers via Fabric.js.

Slide 11-13: Challenges and ethics – Bias in AI, job displacement, IP issues. Include a mind-map diagram (drag-and-drop editable), with undo/redo support. Generate a warning image: "dystopian AI taking over creative jobs, dark tones".

Slide 14: Future predictions – Bullet timeline to 2050, with optimistic and pessimistic scenarios. Add video export prep for MP4 with full animations.

Final slide: Call to action and Q&A, with contact info. Export options: Full deck as PPTX with animations preserved, PDF for print, HTML for web, and MP4 video render via FFmpeg. Ensure all processing is offline, no cloud. Optimize for 16:9 aspect, high-res images, and smooth performance on a 16GB RAM machine.
```

---

## What this prompt exercises

| Feature | How it’s used |
|--------|----------------|
| **AI slide generation** | 15-slide outline and content via Ollama/Llama3 |
| **Stable Diffusion** | Title image, “AI composing symphony”, “AI director filming”, “dystopian AI” image |
| **Animations** | Fade-in bullets, particle zoom, GSAP slide-ins, Three.js 3D rotate |
| **Multilingual** | English + optional Spanish, LibreTranslate, RTL if needed |
| **Voice** | eSpeak-ng TTS for quotes, Whisper-style STT for transcription notes |
| **Canvas / layers** | Mind-map diagram, drag-and-drop, undo/redo (Fabric.js) |
| **Exports** | PPTX (animations), PDF, HTML, MP4 (FFmpeg) |
| **Constraints** | 16:9, high-res, offline-only, 16GB RAM–friendly |

Tweak the topic, slide count, or image prompts to match your setup. For best results, have Ollama, Stable Diffusion (optional), and LibreTranslate configured locally before running.
