document.getElementById('mortgage-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const amount = parseFloat(document.getElementById('amount').value);
    const term = parseFloat(document.getElementById('term').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const type = document.querySelector('input[name="type"]:checked').value;

    
    let monthlyRepayment, totalRepayment;

    if (type === 'repayment') {
        const monthlyRate = rate / 100 / 12;
        const numberOfPayments = term * 12;
        monthlyRepayment = amount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
        totalRepayment = monthlyRepayment * numberOfPayments;
    } else if (type === 'interest-only') {
        monthlyRepayment = (amount * (rate / 100)) / 12;
        totalRepayment = (monthlyRepayment * 12) * term + amount;
    }

   
    const resultsDiv = document.querySelector('.results');
    resultsDiv.innerHTML = `
        <h3>Your results</h3>
        <p>Your monthly repayments: £${monthlyRepayment.toFixed(2)}</p>
        <p>Total you'll repay over the term: £${totalRepayment.toFixed(2)}</p>
    `;

   
    document.querySelector('.illustration').style.display = 'none';
});

document.querySelector('.clear-all').addEventListener('click', function(event) {
    event.preventDefault(); 
    document.getElementById('amount').value = '';
    document.getElementById('term').value = '';
    document.getElementById('rate').value = '';
    const checkedRadio = document.querySelector('input[name="type"]:checked');
    if (checkedRadio) {
      checkedRadio.checked = false;
    }

   
    const resultsDiv = document.querySelector('.results');
    resultsDiv.innerHTML = `
        <h3>Results shown here</h3>
        <p>
          Complete the form and click "calculate repayments" to see what your monthly repayments would be.
        </p>
    `;

    
    document.querySelector('.illustration').style.display = 'block';
});
