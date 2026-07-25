# Image assets

These are the real brand assets, wired into `index.html` (header logo + favicon,
hero backdrop, and the "Our Story" gallery on the landing page). They live at
the repo root (not in a subfolder) to match how they were originally uploaded.

| Filename            | Used for                          | Photo                                                |
|----------------------|------------------------------------|--------------------------------------------------------|
| `gori-logo-300.png`  | Header logo + favicon              | "Gori Didi from India" wordmark logo                  |
| `6.jpg`              | Hero backdrop + gallery, slot 1    | Meeting a sadhu at the temple ruins of Hampi          |
| `3.jpg`              | Gallery, slot 2                    | Trying on bangles at a Rajasthan market stall          |
| `4.jpg`              | Gallery, slot 3                    | Toy/hardware shop with painted wooden rocking horses   |
| `5.jpg`              | Gallery, slot 4                    | Camel and friends near the Jaisalmer fort              |

If any file here is ever removed, the page falls back to a gradient + icon
placeholder automatically (see `.story-thumb` / `.logo-fallback` in
`css/style.css`) - nothing breaks.
