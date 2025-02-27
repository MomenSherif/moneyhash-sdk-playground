import MoneyHash from '@moneyhash/js-sdk/headless';

const moneyHash = new MoneyHash({
  type: 'payment',
  publicApiKey: 'public.3lGdsVR5.EKE4vhkylCOlnUjRftQWbFCvL2m5urn5EWV6s4wQ',
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
  submit.innerHTML = 'Submitting...';
  message.innerHTML = '';

  try {
    const cardData = await moneyHash.cardForm.collect();
    console.log({ cardData });

    submit.innerHTML = 'Submit';
    message.innerHTML = 'Success! Card Collected';
    message.setAttribute('style', 'color: green');
  } catch (error) {
    console.log('playground', error);
    submit.innerHTML = 'Submit';
    message.innerHTML = `${JSON.stringify(error, null, 2)}`;
    message.setAttribute('style', 'color: red');
  }
});
