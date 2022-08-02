const fields = document.querySelectorAll('[required]');

function validateField(field) {
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }

    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: 'Por favor, preencha este campo',
      },
      email: {
        valueMissing: 'Email é obrigatório',
        typeMismatch: 'Por favor, preencha um email válido',
      },
    };
    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector('span.error');
    if (message) {
      spanError.classList.add('active');
      spanError.innerText = message;
    } else {
      spanError.classList.remove('active');
      spanError.innerText = '';
    }
  }

  return function () {
    const error = verifyErrors();
    if (error) {
      const message = customMessage(error);
      field.style.borderColor = 'var(--error)';
      setCustomMessage(message);
      return;
    }
    field.style.borderColor = 'var(--success)';
    setCustomMessage();
  };
}

function customValidation(e) {
  const field = e.target;
  const validation = validateField(field);

  validation();
}

for (let field of fields) {
  field.addEventListener('invalid', (e) => {
    // cancel o bubble (html validation)
    e.preventDefault();

    customValidation(e);
  });
  field.addEventListener('blur', customValidation);
}

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  console.log('enviar o formulário');
  e.preventDefault();
});
