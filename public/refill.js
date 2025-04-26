document.getElementById('refill-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rx = document.getElementById('rx').value;
  
    try {
      const response = await fetch('http://localhost:3000/refill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, rx })
      });
  
      const result = await response.json();
      alert(result.message);

      document.getElementById('refill-form').reset();
    } catch (err) {
      console.error('Error submitting refill:', err);
      alert('Failed to send refill request.');
    }
  });