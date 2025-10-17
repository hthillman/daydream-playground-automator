// Only add listener if the single submit button exists
const submitSingleBtn = document.getElementById('submitSingle');
if (submitSingleBtn) {
  submitSingleBtn.addEventListener('click', () => {
    const prompt = document.getElementById('singlePrompt').value;
    if (!prompt) {
      showStatus('Please enter a prompt');
      return;
    }
    
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        func: submitPrompt,
        args: [prompt]
      });
    });
    
    showStatus('Prompt submitted!');
  });
}

document.getElementById('submitSequence').addEventListener('click', () => {
  const promptText = document.getElementById('promptSequence').value;
  const delay = parseInt(document.getElementById('delay').value) * 1000;
  
  if (!promptText) {
    showStatus('Please enter prompts');
    return;
  }
  
  const prompts = promptText.split('\n').filter(p => p.trim());
  
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: runPromptSequence,
      args: [prompts, delay]
    });
  });
  
  showStatus(`Running sequence of ${prompts.length} prompts...`);
});

function showStatus(message) {
  const status = document.getElementById('status');
  status.textContent = message;
  setTimeout(() => status.textContent = '', 3000);
}

function submitPrompt(promptText) {
  // Find the textarea with data-slot="textarea" and aria-label="Prompt composer"
  const promptInput = document.querySelector('textarea[data-slot="textarea"][aria-label="Prompt composer"]');
  
  if (!promptInput) {
    console.error('Prompt input not found');
    return;
  }
  
  // Set the value
  promptInput.value = promptText;
  
  // Trigger all relevant events
  promptInput.dispatchEvent(new Event('input', { bubbles: true }));
  promptInput.dispatchEvent(new Event('change', { bubbles: true }));
  promptInput.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
  promptInput.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
  
  // Find the submit button with aria-label="Submit prompt"
  const submitBtn = document.querySelector('button[data-slot="button"][aria-label="Submit prompt"]');
  
  if (submitBtn) {
    submitBtn.click();
  } else {
    console.error('Submit button not found');
  }
}

async function runPromptSequence(prompts, delayMs) {
  console.log('Starting prompt sequence with', prompts.length, 'prompts');
  
  for (let i = 0; i < prompts.length; i++) {
    console.log(`Submitting ${i + 1}/${prompts.length}: ${prompts[i]}`);
    
    // Find the textarea with specific attributes
    const promptInput = document.querySelector('textarea[data-slot="textarea"][aria-label="Prompt composer"]');
    console.log('Prompt input found:', !!promptInput);
    
    if (promptInput) {
      promptInput.value = prompts[i];
      console.log('Set value to:', prompts[i]);
      
      // Trigger all relevant events
      promptInput.dispatchEvent(new Event('input', { bubbles: true }));
      promptInput.dispatchEvent(new Event('change', { bubbles: true }));
      promptInput.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
      promptInput.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
      
      // Find and click the submit button
      const submitBtn = document.querySelector('button[data-slot="button"][aria-label="Submit prompt"]');
      console.log('Submit button found:', !!submitBtn);
      
      if (submitBtn) {
        submitBtn.click();
        console.log('Clicked submit button');
      } else {
        console.error('Submit button not found!');
      }
    } else {
      console.error('Prompt input not found!');
    }
    
    if (i < prompts.length - 1) {
      console.log(`Waiting ${delayMs}ms before next prompt...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  console.log('Sequence complete!');
}