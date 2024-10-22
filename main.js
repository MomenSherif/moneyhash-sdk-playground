import MoneyHash from '@moneyhash/js-sdk/headless';

const moneyHash = new MoneyHash({
  type: 'payment',
});

const elements = moneyHash.elements({
  styles: {
    placeholderColor: 'rgb(123 129 142)', // placeholder color
  },
});

const cardHolderName = elements.create({
  elementType: 'cardHolderName',
  elementOptions: {
    selector: '#card-holder-name',
    placeholder: 'Name',
  },
});

const cardNumber = elements.create({
  elementType: 'cardNumber',
  elementOptions: {
    selector: '#card-number',
  },
});

const cardCvv = elements.create({
  elementType: 'cardCvv',
  elementOptions: {
    selector: '#card-cvv',
  },
});

const cardExpiryMonth = elements.create({
  elementType: 'cardExpiryMonth',
  elementOptions: {
    selector: '#card-expiry-month',
  },
});

const cardExpiryYear = elements.create({
  elementType: 'cardExpiryYear',
  elementOptions: {
    selector: '#card-expiry-year',
  },
});

cardHolderName.mount();
cardNumber.mount();
cardCvv.mount();
cardExpiryMonth.mount();
cardExpiryYear.mount();

document.getElementById('submit').addEventListener('click', async () => {
  try {
    const intentId = document.querySelector('#intent-id').value;
    if (!intentId) return alert('Please provide intent id');

    const { stateDetails } = await moneyHash.proceedWith({
      intentId: intentId,
      type: 'method',
      id: 'CARD',
    });

    const res = await moneyHash.submitForm({
      intentId: intentId,
      accessToken: stateDetails.formFields.card.accessToken,
      billingData: {
        email: 'hamada@hamada.com',
      },
    });

    console.log('Success! Intent Processed', { res });
    submit.innerHTML = 'Submit';
    message.innerHTML = 'Success! Intent Processed';
    message.setAttribute('style', 'color: green');
  } catch (error) {
    console.log('playground', error);
    submit.innerHTML = 'Submit';
    message.innerHTML = `${error}`;
    message.setAttribute('style', 'color: red');
  }
});
