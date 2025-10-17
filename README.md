# Daydream Prompt Automator

A Chrome browser extension to automate prompt submissions to Daydream Playground.

## Features

- Run sequences of prompts with customizable delays
   - Up next: adding IPAdapters, prompt blending, etc
- Works directly with Daydream Playground

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the folder containing these files

## Usage

1. Navigate to https://playground.daydream.live
2. Click the extension icon in your toolbar
4. **Prompt Sequence**: Enter multiple prompts (one per line) in the second text area
5. Set the delay between prompts (in seconds)
6. Click "Run Sequence" to execute them automatically

## Files

- `manifest.json` - Extension configuration
- `popup.html` - Extension popup interface
- `popup.js` - Extension logic and automation scripts
- `README.md` - This file

## Example Prompts

```
blooming flowers
fireworks
cotton candy
bouncing balls
forest leaves
chrome blob waves
```

## License

MIT
